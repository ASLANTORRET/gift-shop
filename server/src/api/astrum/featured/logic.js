import mongoose from '../../mongoose'

const featuredSchema = mongoose.Schema({
    id:Number,
    products:[Number],
    name_rus:String,
    name_kaz:String,
    name_eng:String,
})

export const FeaturedCategories =  mongoose.model('featured', featuredSchema)

const Logic = {
    category(root, {query}, context){
        return FeaturedCategories.findOne(query)
    },
    categories(root, {query, sort}, context){        
        return FeaturedCategories.find(query).sort(sort)
    },
    createCategory(root, { id, name_rus, name_kaz, name_eng, products}, context){
        return FeaturedCategories.create({ id, name_rus, name_kaz, name_eng, products})    
    },
    async updateCategory(root, { id, name_rus, name_kaz, name_eng, products}, context){
        const category = await FeaturedCategories.findOne({id})
        if(category){
            category.name_rus = name_rus
            category.name_kaz = name_kaz
            category.name_eng = name_eng
            category.products = products
            category.save()
            return category
        }
    }
}

export default Logic