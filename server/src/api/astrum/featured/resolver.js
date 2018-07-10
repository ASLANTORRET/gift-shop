import FeaturedCategoriesLogic from './logic'
import AstrumProductsLogic from '../product/logic'
import SlideLogic from '../../slide/logic'
const Resolver = {
    FeaturedCategory:{
        async products(root, args, context){
            const query = {id:{$in:root.products}}
            return AstrumProductsLogic.products(root, {query}, context);    
        },
        async slides(root, args, context){
            const query = {categoryId:root.id}
            return SlideLogic.slides(root, query, context);
        },
        async name(root, args, context){
            const {language} = args
            switch(language){
                case 'EN':
                return root.name_eng
                case 'KZ':
                return root.name_kaz
                default:
                return root.name_rus
            }            
        }
    }
}

export default Resolver