<!-- 管理员查看全部商品 -->
<template>
	<view class="body">
		
		<view class="search">
			<search-bar :data="shoppingListItem" @searchResult="getResult"></search-bar>
		</view>
		
		<shoppingListItem :data="shoppingListItem" :showStatus="true"></shoppingListItem>
		
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"
	export default {
		data() {
			return {
				shoppingListItem: [],
				user: {}
			};
		},

		methods: {
			getResult(data) {
				this.shoppingListItem = data;
			},
			async getProductList() {
				const res = await myRequest({
					url: "/api/getAllProductList"
				})
				this.shoppingListItem = res.data.message;
				// console.log(this.shoppingListItem)
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getProductList();
				uni.stopPullDownRefresh();
			}, 1000)
		},
		onLoad() {
			this.user = this.$getUser();
			this.getProductList();
		},
		onShow() {
			this.getProductList();
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
