<template>
	<div class="cart">
		<!-- 导航 -->
		<nav-bar class="navbar">
			<div slot="center">购物车({{length}})</div>
		</nav-bar>
		<!-- 商品列表 -->
		<cart-list></cart-list>
		
		
		<!-- 底部汇总 -->
		<cart-bottom-bar/>
		
		
	</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from './childComps/CartBottomBar.vue'
	
	import { mapGetters } from 'vuex'
	
	export default {
		name:"Cart",
		components:{
			NavBar,
			CartList,
			CartBottomBar
		},
		computed:{
			// ...mapGetters(['cartLength','cartList'])
			...mapGetters({
				length:'cartLength',
				list:'cartList'
			})
		}
	}
</script>

<style scoped>
	.cart{
		height: 100vh;
	}
	
	
	.navbar{
		background-color: deeppink;
		color: #fff;
	}
</style>
