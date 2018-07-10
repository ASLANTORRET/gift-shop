import mongoose from '../../mongoose'
import request from 'request'
import _ from 'lodash'
import { getAuthenticatedUser } from '../../logic'
import SettingsLogic from '../../setting/logic'

const oasisProductSchema = mongoose.Schema({
  id: String,
  article: String,
  name: String,
  full_name: String,
  price: Number,
  discount_price: Number,
  old_price: Number,
  images: Array,
  categories: [Number],
  group_id: String,
  description: String,
  stock: Array,
  brief: String
})
oasisProductSchema.index({article: "text", name: "text", full_name:"text", brief:"text"});

export const OasisProducts = mongoose.model('oasis.products', oasisProductSchema)

const mutateProduct = async (product, context) => {
  const organization = await context.organization
  if (organization) {
    const { oasis } = organization.products
    const rub = await SettingsLogic.setting(root, {name: "RUB"}, context)
    const coefficient = await SettingsLogic.setting(root,{name:"OASIS_COEFFICIENT"}, context)
    // console.log(product)
    if (product) {
      const oasisProduct = _.find(oasis, { 'oasis_id': product.id })
      // console.log("indexOfProductFound",indexOfProductFound)

      if(oasisProduct){
        product.name = oasisProduct.name
        product.description = oasisProduct.description
        product.price = oasisProduct.price
      } else {
        let newPrice = product.discount_price || product.price
        product.oldPrice = Math.ceil(product.price * rub * coefficient)
        product.price = Math.ceil(newPrice * rub * coefficient)
      }
    }
   
  }
  return product
}

const Logic = {
  async product(root, { query }, context) {
    const product = await OasisProducts.findOne(query)
    return mutateProduct(product, context)
  },
  async products(root, { query, skip, limit }, context) {
    const products = await OasisProducts.find(query).skip(skip).limit(limit)
    return products.map(product => mutateProduct(product, context))
  },
  async count(root, {query}, context ) {
    return OasisProducts.find(query).count()
  },
  async importProducts(root, args, context) {
    const admin = await getAuthenticatedUser(context, 'admin')
    if (admin) {
      console.log('loading oasis products')
      request.get('http://api.oasiscatalog.com/v3/products/download?format=json',
        {auth: {user:process.env.OASIS_API_KEY}},
        (error, response, body) => {
          const groups = JSON.parse(body)
          OasisProducts.remove({}, (err) => {
            if (err)
              console.log(err)
          })

          console.log('oasis products import')
          for (let group_id in groups) {
            let group = groups[group_id];
            group.forEach(product => {
              product.group_id = group_id;
              OasisProducts.create(product);
            });
          }
          console.log('oasis products imported')
        }
      )
      return true
    }
    return false
  }
}

export default Logic
