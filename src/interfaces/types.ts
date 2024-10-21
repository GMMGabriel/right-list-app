import { Product } from '@/classes/product'

export type TList = {
  _id: string
  total_amount: number
  total_products: number
  draft_mode: boolean
  finished_at: string | null
  location: string | null
  last_modification: string | null
}

export type TProduct = {
  _id: string
  name: string
  brand: string
  amount: number
  quantity: number
  unit: string
  promotional_amount: number
  promotional_quantity: number
  section: string
  collected: boolean
  list_id: string
}

export type TProductList = {
  title: string
  data: Product[]
}[]