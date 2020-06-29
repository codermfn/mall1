<template>
	<div class="category">
		<!-- 导航 -->
		<nav-bar class="catanav">
			<div slot="center">分类</div>
		</nav-bar>
		</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
	
	
	export default {
		name:"Category",
		components:{
			NavBar
		}
	}
</script>

<style>
	.catanav{
		background-color: deeppink;
		color: #fff;
	}
</style>
