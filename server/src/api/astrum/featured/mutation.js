import FeaturedCategoriesLogic from './logic'

const Mutation = {
    async createFeaturedCategory(root, {input}, context){
        return FeaturedCategoriesLogic.createCategory(root, input, context)
    },
    async updateFeaturedCategory(root, {input}, context){
        return FeaturedCategoriesLogic.updateCategory(root, input, context)
    },
    async deleteFeaturedCategory(root, {input}, context){
        return FeaturedCategoriesLogic.deleteCategory(root, input, context)
    },
}

export default Mutation