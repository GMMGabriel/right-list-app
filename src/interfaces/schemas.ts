export const ListSchema = {
  name: 'List',
  properties: {
    _id: 'string',
    total_amount: 'float',
    total_products: 'int',
    mode: 'int',
    finished_at: 'date',
    location: 'string',
    last_modification: 'date',
  },
  primaryKey: '_id',
}

export const ProductSchema = {
  name: 'Product',
  properties: {
    _id: 'string',
    name: 'string',
    brand: 'string',
    amount: 'float',
    quantity: 'int',
    unit: 'string',
    promotional_amount: 'float',
    promotional_quantity: 'int',
    collected: 'bool',
    list_id: 'string',
  },
  primaryKey: '_id',
}