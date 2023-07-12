<!-- 用户发布的所有商品的信息 -->
<template>
	<view class="userHomePage">
		<view class="title">{{shoppingListItem.length == 0 ? "这里啥也没有" : ""}}</view>
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
				shoppingListItem: []
			}
		},

		methods: {
			async getUserProduct() {
				let user = this.$getUser();
				let id = user.user_id;
				const res = await myRequest({
					url: "/api/getUserProduct/" + id
				})
				// console.log(res.data.message)
				this.shoppingListItem = res.data.message;
			}
		},
		mounted() {
			this.getUserProduct();
		}
	}
</script>

<style scoped lang="scss">
	.userHomePage {
		.title {
			text-align: center;
			font-size: 40rpx;
		}
	}
</style>
