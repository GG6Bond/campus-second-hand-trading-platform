<!-- 通知页面 -->
<template>
	<view class="tradingProduct">
		<view v-if="tradingProduct.length === 0" class="title">没有交易中的商品</view>
		<shoppingListItem :data="tradingProduct" :showStatus="true"></shoppingListItem>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				tradingProduct: [],
				user: {},

			};
		},

		methods: {
			async getProduct() {
				const res = await myRequest({
					url: "/api/tradingProduct/" + this.user.user_id
				})
				// console.log(res.data.message);
				this.tradingProduct = res.data.message;
			},
		},
		onLoad() {
			this.user = this.$getUser();
			this.getProduct();
		}
	}
</script>

<style lang="scss">
	.tradingProduct {
		.title {
			padding: 30rpx;
			text-align: center;
		}
	}
</style>
