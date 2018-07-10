import AstrumCategoryLogic from './logic'
import AstrumProductLogic from '../product/logic'

const Resolver = {
  AstrumCategory: {
    async children(root, args, context) {
      return AstrumCategoryLogic.categories(root, { query: { category_id: root.astrum_id}, sort:{ name:1 } }, context)
    },    
    async products(root, args, context) {
      const { offset, limit, priceRange } = args
      const query = { astrum_id : root.astrum_id }
      if(priceRange){console.log("price range: ", priceRange)
        query.price = { $gte: String(priceRange[0]), $lte: String(priceRange[1]) }
      }
      return AstrumProductLogic.products(root, { query, skip: offset, limit }, context)
    },
    async parent(root, args, context) {
      return AstrumCategoryLogic.category(root, {query: {astrum_id: root.category_id}})
    },
    async productCount(root, args, context) {
      const query = { astrum_id: root.astrum_id }
      return AstrumProductLogic.count(root, { query }, context)
    },
    async category_name(root, args, context){
      const {language} = args
      switch(language){
        case 'EN':
          return root.name_eng
        case 'KZ':
          return root.name_kaz
        default:
          return root.name
      } 
    }
  }
}

export default Resolver