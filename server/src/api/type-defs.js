import User from './user'
import Category from './category'
import Product from './product'

import AstrumCategory from './astrum/category'
import AstrumProduct from './astrum/product'
import FeaturedCategory from './astrum/featured'
import Cart from './cart'
import Order from './order'
import Slide from './slide'
import SiteText from './sitetext'
import Code from './code'
import Statistics from './statistics'

import Setting from './setting'

export const typeDefs = [
  `
  scalar Date
  type Query {
    currentUser: User

    categories( parentId: String ): [Category]
    category( slug: String! ): Category
    product( slug: String! ): Product

    astrumCategories: [AstrumCategory]
    astrumCategory( astrum_id: Int! ): AstrumCategory
    
    featuredCategories: [FeaturedCategory]
    featuredCategory( id: Int! ): FeaturedCategory
    matchCode(code:Int!, phone:String!) : Boolean
    astrumProduct( id: Int! ): AstrumProduct
    astrumProducts( search: String!, limit:Int, offset:Int): [AstrumProduct]
    collectionProducts( collection: String!): [AstrumProduct]
    searchTips( search: String!, language: String!): [AstrumProduct]
    productCount(search: String!, language: String!): Int
    sitetexts(classnames:[String]!): [SiteText]
    sitetext(_id: String): SiteText
    cart (
      astrum: [Int]
    ): Cart

    slides: [Slide]
    slide( _id: String! ): Slide

    statistics: [Statistics]

    NBRate: NBRate
    setting(name: String!): Setting
    settings(names: [String]): [Setting]

  }
  type Mutation {
    login(input: LoginInput!) : User
    signup(input: SignupInput!) : User

    createUser(input: UserInput) : UserPayload
    updateUser(input: UserInput) : UserPayload

    createOrder(input: CreateOrderInput) : CreateOrderPayload
    
    createFeaturedCategory(input: FeaturedInput) : FeaturedPayload
    updateFeaturedCategory(input: FeaturedInput) : FeaturedPayload
    deleteFeaturedCategory(input: FeaturedInput) : FeaturedPayload

    sendCode(phone: String!) : Boolean
    createSlide(input: SlideInput!) : SlidePayload
    updateSlide(input: SlideInput!) : SlidePayload
    deleteSlide(input: SlideInput!) : SlidePayload

    createStatistics( input: StatisticsInput ): StatisticsPayload

    importAstrumProducts: Boolean
    importAstrumCategories: Boolean
    
    setSetting(input: SettingInput) : Setting
    setSettings(input: [SettingInput]) : [Setting]

  }
  `,
  User.Type,
  Category.Type,
  Product.Type,
  SiteText.Type,
  AstrumCategory.Type,
  FeaturedCategory.Type,
  AstrumProduct.Type,
  Cart.Type,
  Order.Type,
  Slide.Type,
  Statistics.Type,
  Setting.Type,
  
]
