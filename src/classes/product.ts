/**
 * ╔════════════════════════════════════════════════════════════════════╗
 * ║                           Classe Product                           ║
 * ╠════════════════════════════════════════════════════════════════════╣
 * ║ A classe Product tem atributos suficientes para o melhor           ║
 * ║ gerenciamento individual dos produtos.                             ║
 * ╠═════════════════════════════════╦══════════════════════════════════╣
 * ║ 1- _id: string                  ║ Identificador                    ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║ 2- name: string                 ║ Nome do produto                  ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║ 3- brand: string                ║ Marca do produto                 ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║ 4- amount: number               ║ Preço do produto                 ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║ 5- quantity: number             ║ Quantidade do produto            ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║ 6- unit: string                 ║ uni, kg, g, L, ml, etc...        ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║ 7- promotional_amount: number   ║ Preço promocional do produto     ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║                                 ║ Quantidade promocional do        ║
 * ║ 8- promotional_quantity: number ║ produto (a partir de x unidades, ║
 * ║                                 ║ o preço promocional é aplicado)  ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║                                 ║ Seção em que o produto           ║
 * ║ 9- section: string              ║ será listado                     ║
 * ║                                 ║                                  ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║                                 ║ Verdadeiro ou falso para saber   ║
 * ║ 10- collected: boolean          ║ se o produto já foi coletado,    ║
 * ║                                 ║ ou seja, se já está no carrinho  ║
 * ╠═════════════════════════════════╬══════════════════════════════════╣
 * ║                                 ║ ID da lista em que o             ║
 * ║ 11- list_id: string             ║ produto está                     ║
 * ║                                 ║                                  ║
 * ╚═════════════════════════════════╩══════════════════════════════════╝
 */

import { v4 as uuidv4 } from 'uuid'

import { getRealm } from './realm'
import { ProductSchema } from '@/interfaces/schemas'
import { TProduct } from '@/interfaces/types'

export class Product {
  private _id: string
  private name: string
  private brand: string
  private amount: number
  private quantity: number
  private unit: string
  private promotional_amount: number
  private promotional_quantity: number
  private section: string
  private collected: boolean
  private list_id: string

  constructor(newProduct: Partial<TProduct>) {
    this._id = newProduct._id ?? uuidv4()
    this.name = newProduct.name ?? ''
    this.brand = newProduct.brand ?? ''
    this.amount = newProduct.amount ?? 0
    this.quantity = newProduct.quantity ?? 0
    this.unit = newProduct.unit ?? ''
    this.promotional_amount = newProduct.promotional_amount ?? 0
    this.promotional_quantity = newProduct.promotional_quantity ?? 0
    this.section = newProduct.section ?? ''
    this.collected = newProduct.collected ?? false
    this.list_id = newProduct.list_id ?? ''
  }

  // Getters e Setters
  public getId(): string {
    return this._id
  }

  public setId(id: string): void {
    this._id = id
  }

  public getName(): string {
    return this.name
  }

  public setName(name: string): void {
    this.name = name
  }

  public getBrand(): string {
    return this.brand
  }

  public setBrand(brand: string): void {
    this.brand = brand
  }

  public getAmount(): number {
    return this.amount
  }

  public setAmount(amount: number): void {
    this.amount = amount
  }

  public getQuantity(): number {
    return this.quantity
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity
  }

  public getUnit(): string {
    return this.unit
  }

  public setUnit(unit: string): void {
    this.unit = unit
  }

  public getPromotionalAmount(): number {
    return this.promotional_amount
  }

  public setPromotionalAmount(promotional_amount: number): void {
    this.promotional_amount = promotional_amount
  }

  public getPromotionalQuantity(): number {
    return this.promotional_quantity
  }

  public setPromotionalQuantity(promotional_quantity: number): void {
    this.promotional_quantity = promotional_quantity
  }

  public getSection(): string {
    return this.section
  }

  public setSection(section: string): void {
    this.section = section
  }

  public isCollected(): boolean {
    return this.collected
  }

  public setCollected(collected: boolean): void {
    this.collected = collected
  }

  public getListId(): string {
    return this.list_id
  }

  public setListId(list_id: string): void {
    this.list_id = list_id
  }

  public calcAmount() {
    const promotion = this.getQuantity() >= this.getPromotionalQuantity() && this.getPromotionalAmount() > 0
    return Number(((promotion ? this.getPromotionalAmount() : this.getAmount()) * this.getQuantity()).toFixed(2))
  }

  /**
   * @name getObjectFromClass
   * @param (sem parâmetros)
   * @description
   * retorna um objeto javasript com os atributos da classe.
   * @returns TProduct
   */
  public getObjectFromClass(): TProduct {
    return {
      _id: this._id,
      name: this.name,
      brand: this.brand,
      amount: this.amount,
      quantity: this.quantity,
      unit: this.unit,
      promotional_amount: this.promotional_amount,
      promotional_quantity: this.promotional_quantity,
      section: this.section,
      collected: this.collected,
      list_id: this.list_id,
    }
  }

  // CRUD =====================================================================

  /**
   * @name save
   * @param (sem parâmetros)
   * @description
   * Salva o produto no banco de dados utilizando os valores de seus atributos.
   * @returns void
   */
  public async save() {
    const realm = await getRealm(ProductSchema)
    realm.write(() => {
      realm.create('Product', this.getObjectFromClass())
    })
    realm.close()
  }

  // Listar todos os produtos
  public static async getAll() {
    const realm = await getRealm(ProductSchema)
    const lists = realm.objects<TProduct>('Product')
    return lists.map((p: TProduct) => (new Product({ ...p })))
  }

  /**
   * @name getById
   * @param {string} id identificador do produto
   * @description
   * Busca no banco de dados o produto através do ID. É utilizado ao criar uma
   * instância da classe em branco passando apenas o ID, para utilizá-lo na
   * busca. Se um ID for fornecido pelo parâmetro da função, significa que os
   * dados do produto buscado no banco de dados irão sobrescrever os dados do
   * produto atual.
   * @returns void
   */
  public async getById(id?: string) {
    if (!this._id && !id) {
      console.error('Não é possível buscar o produto, nenhum ID fornecido.')
      return
    }
    const realm = await getRealm(ProductSchema)
    const productFound = realm.objectForPrimaryKey('Product', id ?? this._id)
    if (productFound) {
      Object.assign(this, productFound)
    }
  }

  /**
   * @name update
   * @param (sem parâmetros)
   * @description
   * Atualiza os dados do produto no banco de dados.
   * @returns void
   */
  public async update() {
    const realm = await getRealm(ProductSchema)
    realm.write(() => {
      const product = realm.objectForPrimaryKey('Product', this._id)
      if (product) {
        Object.assign(product, this) // Atualiza no banco de dados
      }
    })
    realm.close()
  }

  /**
   * @name delete
   * @param (sem parâmetros)
   * @description
   * Deleta o produto do banco de dados utilizando o ID dele.
   * @returns void
   */
  public async delete() {
    const realm = await getRealm(ProductSchema)
    realm.write(() => {
      const product = realm.objectForPrimaryKey('Product', this._id)
      if (product) {
        realm.delete(product)
      }
    })
    realm.close()
  }
}