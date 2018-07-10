import mongoose from '../../mongoose'
import request from 'request'
import { getAuthenticatedUser } from '../../logic'
import empireApiLogic from '../logic'
import _ from 'lodash'
import he from 'he'
import fs from 'fs'
const XML = require('xml-js')

const astrumProductSchema = mongoose.Schema({
  id:Number,
  astrum_id: Number,
  category_name:String,
  code: String,
  material_rus: String,
  material_eng: String,
  material_kaz: String,
  name_rus: String,
  name_eng:String,
  name_kaz:String,
  size_rus: String,
  size_eng:String,
  size_kaz:String,
  description_rus: String,
  description_kaz: String,
  description_eng: String,
  price: Number,
  collection_id: Number,
  pictures: [String],
  collection_name:String
})
astrumProductSchema.index({code: "text", name_rus: "text", name_kaz: "text", name_eng: "text", description_rus:"text"});

export const AstrumProducts = mongoose.model('astrum.products', astrumProductSchema)

// const mutateProduct = async (product, context) => {
//   const organization = await context.organization
//   if (organization) {
//     const { astrum } = organization.products
//     if (product) {
//       const astrumProduct = _.find(astrum, { 'astrum_id': product.astrum_id })

//       if(astrumProduct){
//         product.name = astrumProduct.name
//         product.description = astrumProduct.description
//         product.price = astrumProduct.price
//       }
//     }
   
//   }
//   return product
// }

const download = (uri, filename, callback)=>{
  request.head(uri, function(error, response, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const Logic = {
  async product(root, { query }, context) {
    return AstrumProducts.findOne(query)
  },
  async products(root, { query, skip, limit, sort }, context) {
    if(!sort){
      const sort = {score:{$meta: "textScore" }}
    }
    return AstrumProducts.find(query, { score: { $meta: "textScore" } }).skip(skip).sort(sort).limit(limit)
  },
  async tips(root, { query, limit }, context){
    return AstrumProducts.find( query, {name_rus: 1, name_kaz: 1, name_eng: 1} ).limit(limit);
  },
  async count(root, { query }, context ) {
    return AstrumProducts.find(query).count()
  },
  // async importProducts(root, args, context) {
  //   const admin = await getAuthenticatedUser(context, 'admin')
  //   if (admin) {
  //     console.log('loading astrum products')
  //     empireApiLogic.oauth((oauth) => {
  //       request.get('http://api.empire.kz/api/catalog',
  //         { auth: { bearer:oauth.access_token } },
  //         (error, response, body) => {
  //           const products = JSON.parse(body)
  //           AstrumProducts.remove({}, (err) => {
  //             if (err)
  //               console.log(err)
  //           })
  
  //           console.log('astrum products import')
  //           products.forEach(product => {
  //             console.log(product)
  //             AstrumProducts.create(product);
  //           });
  //           console.log(products.length + ' astrum products imported')
  //         }
  //       )
  //     })
  //     return true
  //   }
  //   return false
  // }
  async importProducts(root, args, context) {
    const admin = "await getAuthenticatedUser(context, 'admin')"
    if (admin) {
      console.log('loading astrum products')
        request.get('http://92.46.43.37/shuttle.dll/AstrumService?action=goods&secret=7ea787226c7fc91842f535ce6bff7152',
          (error, response, body) => {
            const result = XML.xml2js(body, {compact:true})
            let products = result.shuttle.product
            AstrumProducts.remove({}, (err) => {
              if (err)
                console.log(err)
            })
            //products = products.slice(0,10)
            console.log("products: ", products)

            console.log('astrum products import')
            products.forEach(product => {
              
              const images = product.image_list.gallery_list.gallery_image
              const images_list = _.isArray(images) ? _.map(images,'_attributes.id') : [images._attributes.id];
              //download(("http://92.46.43.37/api/shuttle.dll/Picture?type="+value.type+"&key="+value.id, value.id + ".jpg", ()=>{console.log("done")}))                  

              console.log("gal list:", product.image_list.gallery_list)
              console.log("gal image:", images)
              const category = _.isArray(product.category_list.category) ? _.head(product.category_list.category) : product.category_list.category
              
              console.log("image list:", images_list)

              AstrumProducts.create({
                id:product.id._text,
                astrum_id: category._attributes.id,
                category_name: product.category_list.category._cdata,
                code: product.article._cdata,
                material_rus:product.analit_list.MAT && product.analit_list.MAT._cdata ? product.analit_list.MAT._cdata : "",
                material_eng:product.analit_list.MATERIALENG && product.analit_list.MATERIALENG._cdata ? product.analit_list.MATERIALENG._cdata : "",
                material_kaz:product.analit_list.MATERIALKAZ && product.analit_list.MATERIALKAZ._cdata ? product.analit_list.MATERIALKAZ._cdata : "",
                name_rus: product.analit_list.WEBNAMERU._cdata,
                name_eng: product.analit_list.ENG1._cdata,
                name_kaz: product.analit_list.NAMEKAZ._cdata,
                size_rus: product.analit_list.SIZE && product.analit_list.SIZE._cdata ? product.analit_list.SIZE._cdata : "",
                size_eng: product.analit_list.SIZEENG && product.analit_list.SIZEENG._cdata ? product.analit_list.SIZEENG._cdata : "",
                size_kaz: product.analit_list.SIZEKAZ && product.analit_list.SIZEKAZ._cdata ? product.analit_list.SIZEKAZ._cdata : "",
                description_rus: product.analit_list.WEBDESCRIPTIONRU._cdata,
                description_kaz: product.analit_list.KAZ._cdata,
                description_eng: product.analit_list.ENG2._cdata,
                price: product.price_list.price._text,
                collection_id: product.goods_group._attributes.id,
                pictures: images_list,
                collection_name:product.goods_group._cdata                
              });
            });
            console.log(products.length + ' astrum products imported')
          }
        )
      return true
    }
    return false
  }  
}

export default Logic
