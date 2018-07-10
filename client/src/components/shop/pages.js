import React from 'react'
import Slides from './slides'
import {Link} from 'react-router-dom'
import $ from 'jquery'


class Section extends React.Component {
    constructor(props){
        super(props)
        
    }
    setHeight(){
        const height = $(".col-sm-6.section-left").css("height")
        $(".banner-solid.white").css({height})
    }

    componentDidMount(){
        window.addEventListener("resize", this.setHeight)
    }

    render(){
        return (<section className="container section-container" key={this.props.collection.key} style={{marginTop: 20, marginBottom: 15}}>
            <div className="row">
            <div className={"col-sm-6 section-left " + (this.props.collection.key % 2 != 0 && "col-sm-push-6" )}>
                <Link to={`/astrum/product/${this.props.collection.id}`}>
                    <div className="banner-vip" style={{height: 'auto'}}>
                        <img 
                            className="img-responsive" 
                            src={this.props.collection.image}
                            onLoad={()=>this.setHeight()} />
                    </div>
                </Link>
            </div>
            <div className={"col-sm-4 section-right " + (this.props.collection.key % 2 != 0 && "col-sm-pull-6")}>
                <div className="banner-solid white">
                <div className="banner-solid-wrapper">
                    <h3>{this.props.collection.name}</h3>
                    <h2>{this.props.collection.description_rus}</h2>
                    <Link className="btn btn-primary" to={`/astrum/product/${this.props.collection.id}`}>ОТКРЫТЬ КОЛЛЕКЦИЮ</Link>
                </div>
                </div>
            </div>
            </div>
        </section>) 
    }}

export const VIP = () => {
    const collections = [
                {
                    id:"20729",
                    name:"НАРУЧНЫЕ МУЗЫКАЛЬНЫЕ ЧАСЫ «ҚАЗАҚСТАН»", 
                    image:"http://92.46.43.37/shuttle.dll/Picture?type=1&key=1370", 
                    description_rus:"Коллекция предметов интерьера «Imperial» - истинное олицетворение изысканной роскоши. Коллекция отражает ценность исторического звучания в современном стиле. Лейтмотивом коллекции являются изображения животных в сакском зверином стиле. В основу новых предметов коллекции легли изображения гордого беркута и благородного барса. В древние времена, в культуре кочевников беркут был отражением таких понятий как верность и свобода, чувство достоинства и мужество, мощь и чистота помыслов. В казахской культуре образ беркута символизирует свободу, власть и великодушие. Неслучайно практически на всех государственных символах независимого Казахстана изображение беркута носит ключевой характер. К примеру, изображенный на государственном флаге, парящий под солнцем беркут олицетворяет суверенитет и независимость нашего государства, его силу и стремление к высоким целям и устойчивому будущему. Другим не менее символичным животным для Казахстана является Барс. "
                },
				{
                    id:"33091",
                    name:"Настольный набор «Беркут»", 
                    image:"http://92.46.43.37/shuttle.dll/Picture?type=1&key=2856", 
                    description_rus:"Эксклюзивные наручные часы «Казахстан» уникальны своим самым маленьким в мире музыкальным механизмом, воспроизводящим фрагмент государственного гимна Казахстана. Форма корпуса часов выполненного из латуни с золотым покрытием, напоминает деку музыкального инструмента для максимально четкой передачи звуков. Окошко на циферблате часов позволяет наблюдать за работой самого музыкального механизма, а окошко на задней крышке за работой механизма часового. Рельефный герб страны на циферблате и национальный орнамент по бокам корпуса придают часам «Казахстан» особый статус. Корпус часов: латунь с золотым покрытием 10 микрон, сапфировое стекло. Часовой механизм: Boegli Model 600 с 18 рубинами. Ремешок: страусовая кожа синего цвета. Подарочный кейс из лакированного дерева. Страна производства: Швейцария. Лимитированный тираж."
                },
                {
                    id:"30178",
                    name:"ВАЗА «ТҰЛПАР» ИЗ КОЛЛЕКЦИИ «ЖЕРҰЙЫҚ»", 
                    image:"http://92.46.43.37/shuttle.dll/Picture?type=1&key=1922", 
                    description_rus:"В культуре кочевников сказочное и философское понятие «Жерұйық» означает чудесное место изобилия, счастья и благоденствия. Лейтмотивом данной коллекции стали мифические крылатые животные, символизирующие силу природы, ее чудесные метаморфозы и глубокие образы. Ядром каждого произведения стал прозрачный хрусталь, издревле считающийся знаком чистоты и благородства. Его обрамляют инкрустации из витых металлических элементов декорированных кристаллами Swarovski. Делая акцент на эстетику элементов национального казахского орнамента, коллекция олицетворяет собой новое прочтение классического парадного стиля. Коллекция представлена в серебряном и золотом цветах под любой интерьер и стилевые предпочтения."
                }
            ]
 return(
        <div id="main" className="row-fluid">  
		<div><img src="shop/img/slide/vip.jpg" /></div>       
            {collections.map((collection, key)=>
                <Section collection={{
                    id:collection.id,
                    key,
                    name:collection.name, 
                    image:collection.image, 
                    description_rus:collection.description_rus
                }}/>     
            )}      
        </div>
    )   
}
export const Boutiques = () => {
 return(
     <div id="main" className="row-fluid"> 
	 <div><img src="shop/img/slide/eb.jpg" /></div>
	 <iframe src="http://empire-nauryz.kz/addr.cfm" width="100%" height="850px"></iframe>
	 
	 
	 </div>
 )   
}

class ItemSlider extends React.Component{
    constructor(props){
        super(props)
    }

    initCarousel(){
        //owl has thumbs 
        $('.owl-carousel.owl-theme').owlCarousel({
            items : 4,
            itemsDesktop : [1199, 4],
            itemsDesktopSmall : [980, 3],
            itemsTablet: [768, 2],
            itemsMobile : [479,1],
            slideSpeed: 350,
            pagination: true,
            nav: true,
            navText: [
                '',
                ''
            ],
            rewindNav: false
        });     
        
      }

    componentDidMount(){
        this.initCarousel()
    }
    componentDidUpdate(){
        this.initCarousel()
    }

    render(){
        return (
            <div className="owl-carousel owl-theme" style={{opacity: 1, display: 'block'}}>
             <div className="news-item">
                 <a href="#">
                 <img className="img-responsive" src="http://www.empire.kz/assets/images/news/18_8.jpg" alt />
                 </a>
                 <h3><a href="#">В АЛМАТЫ 10 МАРТА ПРЕЗЕНТОВАЛИ КОМЕДИЮ "НАУРЫЗ.KZ".</a></h3>
                 <p className="date">10.03.2017</p>
             </div>
             
             <div className="news-item">
                 <a href="#">
                 <img className="img-responsive" src="http://www.empire.kz/assets/images/news/17_4.jpg" alt />
                 </a>
                 <h3><a href="#">БОЛЬШОЙ СТАРТ ДЛЯ МАЛЕНЬКИХ ЗВЕЗД!</a></h3>
                 <p className="date">12.11.2016</p>
             </div>
             
             <div className="news-item">
                 <a href="#">
                 <img className="img-responsive" src="http://www.empire.kz/assets/images/news/16_9.jpg" alt />
                 </a>
                 <h3><a href="#">КРАСОТА С СИЛЬНЫМ ХАРАКТЕРОМ!</a></h3>
                 <p className="date">12.11.2016</p>
             </div>
             
             <div className="news-item">
                 <a href="#">
                 <img className="img-responsive" src="http://www.empire.kz/assets/images/news/15_3.jpg" alt />
                 </a>
                 <h3><a href="#">МЕЖДУНАРОДНЫЙ КИНОФЕСТИВАЛЬ «ЕВРАЗИЯ» И ПРЕМИЯ «ТУЛПАР»</a></h3>
                 <p className="date">29.06.2016</p>
             </div>
             
             <div className="news-item">
                 <a href="#">
                 <img className="img-responsive" src="http://www.empire.kz/assets/images/news/13_1.jpg" alt />
                 </a>
                 <h3><a href="#">ФИЛЬМ АЛИИ НАЗАРБАЕВОЙ «ДОРОГА К МАТЕРИ» ПРЕДСТАВИЛИ НА ММКФ</a></h3>
                 <p className="date">04.04.2017</p>
             </div>
             
             <div className="news-item">
                 <a href="#">
                 <img className="img-responsive" src="http://www.empire.kz/assets/images/news/14_3.jpg" alt />
                 </a>
                 <h3><a href="#">ЕВРАЗИЙСКИЙ ЖЕНСКИЙ БИЗНЕС-ФОРУМ 2016</a></h3>
                 <p className="date">02.07.2016</p>
             </div>
         </div>
              
        )
    }
}
export const About = () => {
    document.title = 'Мир Empire'
 return(
     <section>
        <Slides slides={[
            {
                "imageUrl" : "ew.jpg",
                "linkUrl" : "#",
                "caption" : "",
                "title" : "",
                "categoryId" : 1,
            },
            {
                "imageUrl" : "eb.jpg",
                "linkUrl" : "#",
                "caption" : "",
                "title" : "",
                "categoryId" : 1,
            }
            
        ]}/>
        <div className="row-fluid">
            <div className="col-md-12 no-padding text-center">
                <div className="wol-tabs">
                    <Link to={"#"}>ИСТОРИЯ</Link>
                    <Link to={"#"}>БУТИКИ</Link>
                    <Link to={"#"}>КОРПОРАТИВНЫМ КЛИЕНТАМ</Link>
                    <Link to={"#"}>ПАРТНЕРСТВО</Link>
                    <Link to={"#"}>КОНТАКТЫ</Link>
                </div>
            </div>
        </div>
        <section className="container-fluid section-container" style={{marginTop: 50, marginBottom: 15}}>
        <div className="container">
            <div className="row section-heading">
                <div className="col-md-12 text-center">
                <h2>Новости</h2>
                <hr />
                </div>
            </div>
            <div className="row news-container">
                    <ItemSlider/>
                    <div className="col-md-12 wol-latest-news text-center">
                        <Link to={"#"}>Подробнее</Link>
                    </div>
            </div>
        </div>
        </section>
     </section>
 )   
}