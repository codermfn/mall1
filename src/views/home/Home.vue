<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">随心购</div></nav-bar>
		<tab-control :titles="['流行','新款','精选']"
		@tabClick="tabClick" 
		ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
						:pull-up-load="true" @pullingUp="loadMore">
			<home-swiper :banners="banners" 
			@swiperImageLoad="swiperImageLoad"/>
			<recommend-view :recommends="recommends"/>
			<feature-view></feature-view>
			<tab-control :titles="['流行','新款','精选']"
			@tabClick="tabClick" ref="tabControl2"/>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper.vue';
	import RecommendView from './childComps/RecommendView.vue';
	import FeatureView from './childComps/FeatureView.vue'
	
	import NavBar from '../../components/common/navbar/NavBar.vue';
	import TabControl from '../../components/content/tabControl/TabControl.vue'
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	import Scroll from '../../components/common/scroll/Scroll.vue'
	import BackTop from '../../components/content/backtop/BackTop.vue'
	
	import {getHomeMultidata,getHomeGods} from "../../network/home.js";
	import {debounce} from '../../common/utils.js'
	
	
	
	export default {
		name:"Home",
		components:{
			NavBar,
			TabControl,
			GoodsList,
			
			HomeSwiper,
			RecommendView,
			FeatureView,
			Scroll,
			BackTop
		},
		data(){
			return {
				 banners:[],
				 recommends:[],
				 goods: {
					 'pop': {page: 0, list: []},
					 'new': {page: 0, list: []},
					 'sell': {page: 0, list: []},
				 },
				 //默认类型‘pop’
				 currentType:'pop',
				 isShowBackTop:false,
				 tabOffsetTop: 0,
				 isTabFixed: false
			}
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		created() {
			//1.请求多个数据
			this.getHomeMultidata()
		
		//2.请求商品数据
			this.getHomeGods('pop')
			this.getHomeGods('new')
			this.getHomeGods('sell')
			
		},
		mounted(){
			//图片加载完成
			const refresh = debounce(this.$refs.scroll.refresh, 200)
				this.$bus.$on('itemImageLoad', () => {
					refresh()
				})
		},
		methods:{
			

			//事件监听的方法
			tabClick(index){
				switch(index) {
					case 0:
					this.currentType = 'pop'
					break
					case 1:
					this.currentType = 'new'
					break
					case 2:
					this.currentType = 'sell'
					break
				}
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
			backClick(){
				this.$refs.scroll.scrollTo(0,0)
			},
			contentScroll(position) {
				this.isShowBackTop = (-position.y) > 1000
				
				
				//是否吸顶
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore() {
				this.getHomeGods(this.currentType)
			},
			swiperImageLoad(){
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
			},
			//网络请求相关的
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					 // console.log(res);
					 // this.result = res;
					  this.banners = res.data.data.banner.list;
					  this.recommends = res.data.data.recommend.list;
				})
			},
			getHomeGods(type){
				const page = this.goods[type].page + 1
				getHomeGods(type,page).then(res => {
					this.goods[type].list.push(...res.data.data.list)
					this.goods[type].page += 1
					
					//已完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				})
			}
		}
	}
</script>

<style scoped>
	#home {
		height: 100vh;
	}
	
 	.home-nav {
		background-color: var(--color-tint);
		color: #FFFFFF;
		
	}

	
	 .content {
		overflow: hidden;
		
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0; 
	} 
	
  /* 	.content {
		height: calc(100% - 93px);  
		overflow: hidden;
		margin-top: 44px;
	} */ 
		.tab-control {
			position: relative;
			z-index: 9;
		}
</style>
