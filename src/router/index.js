import { createRouter,createWebHashHistory} from "vue-router";
const IndexView =()=> import ('../pages/IndexView.vue')
const CinemaView =()=> import ('../pages/CinemaView.vue')
const MovieView =()=> import ('../pages/MovieView.vue')
const CollectionView =()=> import ('../pages/CollectionView.vue')
const DetailView =()=> import ('../pages/DetailView.vue')
const ClassifyView =()=> import ('../pages/ClassifyView.vue')
const SearchView =()=> import ('../pages/SearchView.vue')

const  routes=[
        {
            name:'index',
            path:'/',
            meta:{
                title:'首页'
            },
            component:IndexView
        },{
            name:'movie',
            path:'/movie',
            meta:{
                title:'电影'
            },
            component:MovieView,
            children:[{
                name:'detail',
                path:'detail',
                meta:{
                    title:'详情'
                },
                component:DetailView
            },{
                name:'class',
                path:'class/:type',
                component:ClassifyView,
                // beforeEnter: (to, from, next) => {
                //     if(to.path==='/movie/class')
                //     next('/movie/class/hot')
                //     else
                //     next()
                // },
            }
        ]
        },{
            name:'cinema',
            path:'/cinema',
            meta:{
                title:'影院'
            },
            component:CinemaView
        },{
            name:'collection',
            path:'/collection',
            meta:{
                title:'收藏'
            },
            component:CollectionView
        },{
            name:'search',
            path:'/search',
            meta:{
                title:'搜索电影'
            },
            component:SearchView,
            beforeEnter: (to, from, next) => {
                //禁止空搜索
                if(to.query['kw']!="")
                next()
            }
        }
    ]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  })

router.afterEach((to,from)=>{
	if(to.meta.title){ 
		document.title = to.meta.title //修改网页的title
	}else{
		document.title = '电影大师'
	}
})
router.beforeEach((to,from)=>{
	window.scrollTo(0,0)
})
  export default router