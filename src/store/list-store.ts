import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { immer } from 'zustand/middleware/immer'

import { List } from '@/classes/list'
import { Product } from '@/classes/product'
import { TProductList } from '@/interfaces/types'

type ListStoreProps = {
  list: List | null
  productList: TProductList
  setList: (list: List) => void
  loadList: (listId?: string) => Promise<void>
  loadProductList: (productList: TProductList) => void
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  removeProduct: (product: Product) => void
  clearList: () => void
}

export const useListStore = create(
  persist<ListStoreProps>((set) => ({
    list: null,
    productList: [],

    setList: (list) => set(() => ({ list })),

    loadList: async (listId) => set((state) => {
      if (listId) {
        const list = new List({ _id: listId ?? '' })
        list.getById()
        return { list }
      }
      const list = new List({})
      list.setLastModification()
      list.save()
      return { list, productList: [] }
    }),
    loadProductList: (productList) => set((state) => {
      return { productList }
    }),
    addProduct: (product) => set((state) => {
      if (state.list === null) return { list: state.list } // faz nada

      // Verifique se a seção já existe, senão adiciona uma nova seção
      const sectionIndex = state.productList.findIndex(section => section.title === product.getSection())
      if (sectionIndex === -1) {
        // Cria uma nova seção se não existir
        state.productList.push({
          title: product.getSection(),
          data: [product],
        })
      } else {
        // Adiciona o produto à seção existente
        state.productList[sectionIndex].data.push(product)
      }

      // Atualiza os dados da lista de acordo com o produto
      state.list.whenToAddProduct(product)
      state.list.update()

      return {
        list: state.list,
        productList: state.productList
      }
    }),
    updateProduct: (product) => set((state) => {
      if (state.list === null) return { productList: state.productList } // faz nada

      // Encontra a seção
      const sectionIndex = state.productList.findIndex(p => p.title === product.getSection())
      if (sectionIndex === -1) return { productList: state.productList } // faz nada

      // Encontra o produto
      const currentProduct = state.productList[sectionIndex].data.find(p => p.getId() === product.getId())
      if (!currentProduct) return { productList: state.productList } // faz nada

      // Subtrai os valores antes de atualizar o produto
      state.list.whenToRemoveProduct(currentProduct)
      // Atualiza o produto
      Object.assign(currentProduct, product)
      currentProduct.update()
      // Agora, soma os valores com os dados atualizados
      state.list.whenToAddProduct(currentProduct)
      state.list.update()

      return {
        list: state.list,
        productList: state.productList
      }
    }),
    removeProduct: (product) => set((state) => {
      if (state.list === null) return { productList: state.productList } // faz nada

      // Encontra a seção
      const sectionIndex = state.productList.findIndex(p => p.title === product.getSection())
      if (sectionIndex === -1) return { productList: state.productList } // faz nada

      // Encontra o produto
      const currentProduct = state.productList[sectionIndex].data.find(p => p.getId() === product.getId())
      if (!currentProduct) return { productList: state.productList } // faz nada

      // Deleta o produto do banco de dados
      currentProduct.delete()
      // Remove o produto da lista
      state.productList[sectionIndex].data = state.productList[sectionIndex].data.filter(p => p.getId() !== currentProduct.getId())
      state.list.whenToRemoveProduct(currentProduct)
      state.list.update()

      return {
        list: state.list,
        productList: state.productList
      }
    }),
    clearList: () => set((state) => {
      if (state.list === null) return { list: state.list } // faz nada

      // Percorre a lista para deletar os produtos do banco de dados
      state.productList.map(pl => pl.data.map(p => p.delete()))
      // Limpa a lista
      state.productList = []
      state.list.clear()

      return {
        list: state.list,
        productList: state.productList
      }
    })
  }),
    {
      name: 'right-list-app-storage',
      storage: createJSONStorage(() => AsyncStorage)
    },
  )
)