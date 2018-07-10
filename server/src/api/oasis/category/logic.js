import mongoose from '../../mongoose'
import request from 'request'
import { getAuthenticatedUser } from '../../logic'

const oasisCategorySchema = mongoose.Schema({
  id: Number,
  parent_id: Number,
  root: Number,
  lft: Number,
  rgt: Number,
  level: Number,
  name: String,
  slug: String,
  path: String,
})

export const OasisCategories = mongoose.model('oasis.categories', oasisCategorySchema)

const Logic = {
  category(root, { query }, context) {
    if (query.path) {
      const { path } = query
      query.$and = [{ path }, { path: { $nin: ['katalogi', 'production'] } } ]
    } else {
      query.path = { $nin: ['katalogi', 'production'] }
    }
    return OasisCategories.findOne(query)
  },
  categories(root, { query, sort }, context) {
    query.path = { $nin: ['katalogi', 'production'] } 
    return OasisCategories.find(query).sort(sort)
  },
  async importCategories(root, args, context) {
    const admin = await getAuthenticatedUser(context, 'admin')
    if (admin) {
      request.get('http://api.oasiscatalog.com/v3/categories/download?format=json',
        {auth: {user:process.env.OASIS_API_KEY}},
        (error, response, body) => {
          const categories = JSON.parse(body)
          OasisCategories.remove({}, (err) => {
            if (err)
              console.log(err)
          })

          console.log('oasis categories import')
          categories.forEach(category => {
            OasisCategories.create(category);
          })
          console.log(categories.length + ' oasis categories imported')
        }
      )
      return true
    }
    return false
  }
}

export default Logic