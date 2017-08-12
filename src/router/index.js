import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import Nav from '../components/Nav.vue'
import userList from '../components/user/userList.vue'
import forumList from '../components/Forum/ForumList.vue'
import addComment from '../components/nationComment/addComment.vue'
import nationCommentList from '../components/nationComment/nationCommentList.vue'
import impressList from '../components/impress/impressList.vue'
import reportList from '../components/report/reportList.vue'
import addnews from '../components/news/addnews.vue'
import newsList from '../components/news/newsList.vue'
import integralList from '../components/user/integralList.vue'
import CarouselList from '../components/carousel/CarouseList.vue'
import DemocracyUserList from '../components/nationComment/DemocracyUserList.vue'
/*cli 必须用*/
Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/',
      component:login
    },

    {
      path: '/Nav',
      name: 'Nav',
      component: Nav,
      children: [
        {
          path:'/userList',
          name: 'userList',
          component:userList,
        },
        {
          path:'/forumList',
          name: 'forumList',
          component:forumList,
        },
        {
          path:'/addComment',
          name: 'addComment',
          component:addComment,
        },
        {
          path:'/nationCommentList',
          name: 'nationCommentList',
          component:nationCommentList,
        },
        {
          path:'/impressList',
          name: 'impressList',
          component:impressList,
        },
        {
          path:'/reportList',
          name: 'reportList',
          component:reportList,
        },
        {
          path:'/addnews',
          name: 'addnews',
          component:addnews,
        },
        {
          path:'/newsList',
          name: 'newsList',
          component:newsList,
        },
        {
          path:'/CarouselList',
          name:'CarouselList',
          component:CarouselList
        },
        {
          name:'DemocracyUserList',
          path:'/DemocracyUserList/:commentId',
          component:DemocracyUserList
        },



      ]


    }
    ]
})
