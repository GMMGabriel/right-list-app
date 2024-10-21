/**
 * ╔════════════════════════════════════════════════════════════════════════╗
 * ║                              Classe List                               ║
 * ╠════════════════════════════════════════════════════════════════════════╣
 * ║ A classe List tem todos os atributos e métodos de uma lista para       ║
 * ║ armazenar, organizar e gerenciar os produtos.                          ║
 * ╠═════════════════════════════════════╦══════════════════════════════════╣
 * ║ 1- _id: string                      ║ Identificador                    ║
 * ╠═════════════════════════════════════╬══════════════════════════════════╣
 * ║                                     ║ Soma de todos os preços de       ║
 * ║                                     ║ produtos adicionados a lista     ║
 * ║ 2- total_amount: number             ║ (levando em conta a quantidade   ║
 * ║                                     ║ de cada produto)                 ║
 * ║                                     ║                                  ║
 * ╠═════════════════════════════════════╬══════════════════════════════════╣
 * ║                                     ║ Quantidade total de produtos     ║
 * ║ 3- total_products: number           ║ distintos adicionados a lista    ║
 * ║                                     ║                                  ║
 * ╠═════════════════════════════════════╬══════════════════════════════════╣
 * ║                                     ║ Define se a lista está no modo   ║
 * ║ 4- draft_mode: boolean              ║ de rascunho ou não               ║
 * ║                                     ║                                  ║
 * ╠═════════════════════════════════════╬══════════════════════════════════╣
 * ║                                     ║ Marca da data e hora de quando a ║
 * ║ 5- finished_at: string | null       ║ compra foi feita                 ║
 * ║                                     ║                                  ║
 * ╠═════════════════════════════════════╬══════════════════════════════════╣
 * ║                                     ║ Nome do lugar onde a compra foi  ║
 * ║ 6- location: string | null          ║ feita                            ║
 * ║                                     ║                                  ║
 * ╠═════════════════════════════════════╬══════════════════════════════════╣
 * ║                                     ║ Data e hora da última            ║
 * ║                                     ║ modificação feita na lista,      ║
 * ║ 7- last_modification: string | null ║ serve para listar as listas de   ║
 * ║                                     ║ rascunho na ordem certa          ║
 * ║                                     ║                                  ║
 * ╚═════════════════════════════════════╩══════════════════════════════════╝
 */

import dayjs from '@/lib/dayjs'
import { v4 as uuidv4 } from 'uuid'

import { getRealm } from '@/classes/realm'
import { Product } from './product'
import { ListSchema, ProductSchema } from '@/interfaces/schemas'
import { TList, TProductList } from '@/interfaces/types'

export class List {
  private _id: string
  private total_amount: number
  private total_products: number
  private draft_mode: boolean
  private finished_at: string
  private location: string
  private last_modification: string

  constructor(newList: Partial<TList>) {
    this._id = newList._id ?? uuidv4()
    this.total_amount = newList.total_amount ?? 0
    this.total_products = newList.total_products ?? 0
    this.draft_mode = newList.draft_mode ?? false
    this.finished_at = newList.finished_at ?? ''
    this.location = newList.location ?? ''
    this.last_modification = newList.last_modification ?? ''
  }

  // Getters e Setters
  public getId(): string {
    return this._id
  }

  public getTotalAmount(): number {
    return this.total_amount
  }

  public setTotalAmount(total_amount: number): void {
    this.total_amount = total_amount
  }

  public getTotalProducts(): number {
    return this.total_products
  }

  public setTotalProducts(total_products: number): void {
    this.total_products = total_products
  }

  public isDraftMode(): boolean {
    return this.draft_mode
  }

  public setDraftMode(draftMode: boolean): void {
    this.draft_mode = draftMode
  }

  public getFinishedAt(): string | null {
    return this.finished_at
  }

  public setFinishedAt(finished_at: string): void {
    this.finished_at = finished_at
  }

  public getLocation(): string | null {
    return this.location
  }

  public setLocation(location: string): void {
    this.location = location
  }

  public getLastModification(): string | null {
    return this.last_modification
  }

  public setLastModification(last_modification?: string): void {
    this.last_modification = last_modification ?? dayjs().toJSON()
  }

  /**
   * @name whenToAddProduct
   * @param {Product} product
   * @description
   * Ações a serem tomadas ao ADICIONAR um novo produto a lista.
   * Aqui é feito a atualização do preço total dos produtos e o
   * total de produtos na lista.
   * @returns void
   */
  public whenToAddProduct(product: Product): void {
    this.setTotalAmount(Number((this.getTotalAmount() + product.calcAmount()).toFixed(2)))
    this.setTotalProducts(this.getTotalProducts() + 1)
    this.setLastModification()
  }

  /**
   * @name whenToRemoveProduct
   * @param {Product} product
   * @description
   * Ações a serem tomadas ao REMOVER um produto da lista.
   * Aqui é feito a atualização do preço total dos produtos e o
   * total de produtos na lista.
   * @returns void
   */
  public whenToRemoveProduct(product: Product): void {
    this.setTotalAmount(Number((this.getTotalAmount() - product.calcAmount()).toFixed(2)))
    this.setTotalProducts(this.getTotalProducts() - 1)
    this.setLastModification()
  }

  /**
   * @name getObjectFromClass
   * @param (sem parâmetros)
   * @description
   * retorna um objeto javasript com os atributos da classe.
   * @returns TList
   */
  public getObjectFromClass(): TList {
    return {
      _id: this._id,
      total_amount: this.total_amount,
      total_products: this.total_products,
      draft_mode: this.draft_mode,
      finished_at: this.finished_at,
      location: this.location,
      last_modification: this.last_modification,
    }
  }

  // CRUD =====================================================================

  /**
   * @name save
   * @param (sem parâmetros)
   * @description
   * Salva a lista no banco de dados utilizando os valores de seus atributos.
   * @returns void
   */
  public async save() {
    const realm = await getRealm(ListSchema)
    realm.write(() => {
      realm.create('List', this.getObjectFromClass())
    })
    realm.close()
  }

  /**
   * @name getById
   * @param {string} id identificador da lista
   * @description
   * Busca no banco de dados a lista através do ID. É utilizado ao criar uma
   * instância da classe em branco passando apenas o ID, para utilizá-lo na
   * busca. Se um ID for fornecido pelo parâmetro da função, significa que os
   * dados da lista buscada no banco de dados irão sobrescrever os dados da
   * lista atual.
   * @returns void
   */
  public async getById(id?: string) {
    if (!this._id && !id) {
      console.error('Não é possível buscar a lista, nenhum ID fornecido.')
      return
    }
    const realm = await getRealm(ListSchema)
    const listFound = realm.objectForPrimaryKey('List', id ?? this._id)
    if (listFound) {
      Object.assign(this, listFound)
    }
  }

  /**
   * @name update
   * @param (sem parâmetros)
   * @description
   * Atualiza os dados da lista no banco de dados.
   * @returns void
   */
  public async update() {
    const realm = await getRealm(ListSchema)
    realm.write(() => {
      const list = realm.objectForPrimaryKey('List', this._id)
      if (list) {
        this.setLastModification()
        Object.assign(list, this)
      }
    })
    realm.close()
  }

  /**
   * @name delete
   * @param (sem parâmetros)
   * @description
   * Deleta a lista do banco de dados utilizando o ID dela.
   * @returns void
   */
  public async delete() {
    const realm = await getRealm(ListSchema)
    realm.write(() => {
      const list = realm.objectForPrimaryKey('List', this._id)
      if (list) {
        realm.delete(list)
      }
    })
    realm.close()
  }

  /**
   * @name clear
   * @param (sem parâmetros)
   * @description
   * Limpa os dados para zerar a lista.
   * @returns void
   */
  public clear() {
    this.setTotalAmount(0)
    this.setTotalProducts(0)
    this.setLastModification()
    this.update()
  }

  public async getAllProductsInTheList() {
    const realm = await getRealm(ProductSchema)
    const temp = realm.objects<Product>('Product').filtered('list_id == $0', this._id)
    const sectionList = temp.reduce((acc, product) => {
      // Verifica se já existe uma seção com o mesmo nome
      const sectionIndex = acc.findIndex(section => section.title === product.getSection())
  
      // Se a seção não existir, cria uma nova
      if (sectionIndex === -1) {
        acc.push({
          title: product.getSection(),
          data: [product],
        })
      } else {
        // Se a seção já existir, adiciona o produto à seção correspondente
        acc[sectionIndex].data.push(product)
      }
  
      return acc
    }, [] as TProductList)
  
    // Ordena as seções por título
    sectionList.sort((sa, sb) => sa.title.localeCompare(sb.title))
  
    // Ordena os produtos dentro de cada seção
    sectionList.forEach(section => {
      section.data.sort((pa, pb) => pa.getName().localeCompare(pb.getName()))
    })
  
    return sectionList
  }
}