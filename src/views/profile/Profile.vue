<template>
	<div class="profile">
		<!-- 导航 -->
		<nav-bar class="mynav">
			<div slot="center">我的</div>
		</nav-bar>
		</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
	
	export default {
		name:"Profile",
		components:{
			NavBar
		}
	}
</script>

<style>
	.mynav{
		background-color: skyblue;
		color: #fff;
	}
</style>
