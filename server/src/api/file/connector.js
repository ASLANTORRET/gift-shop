import mongoose from '../mongoose'

const fileSchema = mongoose.Schema({
  _id: String,
  name: String,
  versions: Object,
})

export const Files = mongoose.model('files', fileSchema)