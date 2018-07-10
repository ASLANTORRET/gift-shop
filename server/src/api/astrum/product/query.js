import AstrumProductLogic from './logic'

const Query = {
  astrumProduct(root, { id }, context) {
    return AstrumProductLogic.product(root, { query: { id } }, context)
  },
  astrumProducts(root, { search, limit, offset, sort}, context) {
    //const {limit, offset} = search
    return AstrumProductLogic.products(root, { query: { $text: { $search:search}}, skip:offset, limit, sort}, context)
  },
  searchTips(root, { search, language }, context){
    let query;
    switch(language){
      case 'EN':
        query =  {name_eng: {$regex: new RegExp(search.split(" ").join("|"), "i")}}
        break
      case 'KZ':
        query =  {name_kaz: {$regex: new RegExp(search.split(" ").join("|"), "i")}}
        break
      default:
        query =  {name_rus: {$regex: new RegExp(search.split(" ").join("|"), "i")}}
  } 
    return AstrumProductLogic.tips(root, { query, limit:10 }, context)
  },
  productCount(root, { search }, context){
    return AstrumProductLogic.count(root, { query: { $text: { $search: search } }}, context)
  },
  collectionProducts(root, { collection }, context){
    console.log("products2: ", collection)
    const result = AstrumProductLogic.products(root, {query: {collection_name: collection}, context})
    console.log("result2: ", result)
    return result
  }  
  // categories(root, args, context) {
  //   const { parentId } = args
  //   if (parentId) {
  //     return Categories.find({ parentId })
  //   } else {
  //     return Categories.find({ parentId: { $exists: false }, $or:[{ isFeatured: false }, { isFeatured: { $exists: false } }] })
  //   }
  // }
}

export default Query