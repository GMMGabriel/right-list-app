import { Product } from './product'

import { useListStore } from '@/store/list-store'

export class ProductListManager {
  /**
   * @name loadList
   * @param (sem parâmetros)
   * @description
   * Ao abrir o app, essa função será chamada para carregar a lista.
   * @returns void
   */
  async loadList() {
    const listStore = useListStore()
    if (listStore.list) {
      await listStore.loadList(listStore.list.getId())
      const tempProductList = await listStore.list.getAllProductsInTheList()
      listStore.loadProductList(tempProductList ?? [])
      return
    }
    await listStore.loadList()
  }

  /**
   * @name addProductToList
   * @param {Product} product produto que será adicionado
   * @description
   * Salva o produto no banco de dados e o adiciona na lista.
   * @returns void
   */
  async addProductToList(product: Product) {
    const listStore = useListStore()
    product.setListId(listStore.list?.getId() ?? '')
    await product.save()
    listStore.addProduct(product)
  }

  /**
   * @name updateProductFromList
   * @param {Product} product produto que será atualizado
   * @description
   * Atualiza o produto no banco de dados e a lista com os valores atualizados.
   * @returns void
   */
  async updateProductFromList(product: Product) {
    const listStore = useListStore()
    listStore.updateProduct(product)
  }

  /**
   * @name removeProductFromList
   * @param {Product} product produto que será deletado
   * @description
   * Deleta o produto do banco de dados e da lista.
   * @returns void
   */
  async removeProductFromList(product: Product) {
    await product.delete()
    const listStore = useListStore()
    listStore.removeProduct(product)
  }

  /**
   * @name clearList
   * @param (sem parâmetros)
   * @description
   * Limpa a lista, ou seja, deleta todos os produtos e os removem da lista.
   * @returns void
   */
  async clearList() {
    const listStore = useListStore()
    listStore.clearList()
  }
}