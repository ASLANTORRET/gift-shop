//change to logic or delete
import mongoose from '../mongoose'

const productSchema = mongoose.Schema({
  _id: String,
  astrum_id: Number,
  name: String,
  slug: String,
  size: String,
  price: Number,
  pictures: [String],
  fileIds: [String],
  categoryIds: [String],
  sku: String,
  description: String,
  stock: Number,

})

export const Products = mongoose.model('products', productSchema)