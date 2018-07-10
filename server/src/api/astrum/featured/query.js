import FeaturedCategoriesLogic from './logic'

const Query = {
    featuredCategory (root, { language, id }, context){
        return FeaturedCategoriesLogic.category(root, {query:{id, language}}, context)
    },
    featuredCategories(root, args, context){
       const sort = { id : 1}
       return FeaturedCategoriesLogic.categories(root, {query:{}, sort},context) 
    }
}

export default Query
