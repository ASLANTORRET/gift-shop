//change to logic or delete
import mongoose from '../mongoose'

const categorySchema = mongoose.Schema({
  _id: String,
  parentId: String,
  astrum_id: String,
  name: String,
  slug: String,
  productCount: Number,
  featured: Boolean
})

export const Categories = mongoose.model('categories', categorySchema)