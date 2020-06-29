<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav"></detail-nav-bar>
		<scroll class="content">
			
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
		</scroll>
		<detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailBottomBar from '../home/childComps/DetailBottomBar.vue'
	
	import Scroll from '../../components/common/scroll/Scroll.vue'
	
	import {getDetail,Goods,Shop} from '../../network/detail.js'
	
	export default {
		name:"Detail",
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll,
			DetailBottomBar
		},
		data() {
			return {
				iid: null,
				topImages:[],
				goods:{},
				shop:{}
			}
		},
		created() {
			this.iid = this.$route.params.iid
			
			getDetail(this.iid).then(res => {
				console.log(res);
				const a = res.data.result;
				this.topImages = res.data.result.itemInfo.topImages
				
				this.goods = new Goods(a.itemInfo,
											a.columns,
											a.shopInfo.services)
				
				this.shop = new Shop(a.shopInfo)
			})
		},
		methods:{
			addToCart(){
				//1.获取购物车需要信息
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.iid = this.iid;
				//2.添加
				this.$store.dispatch('addCart',product)
				
			}
		}
	}
</script>

<style scoped>
 	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	} 
	
	.detail-nav{
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	
	.content {
		height: calc(100% - 44px);
	}
</style>
