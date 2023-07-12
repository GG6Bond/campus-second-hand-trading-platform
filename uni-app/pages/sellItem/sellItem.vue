<!-- 我的已售出页面 -->
<template>
	<view class="sellItem">
		<view v-if="sellItem.length === 0" class="title">还没有卖出商品</view>
		<shoppingListItem :data="sellItem" :showStatus="true"></shoppingListItem>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				sellItem: [],
				user: {}
			};
		},

		methods: {
			async getSell() {
				const res = await myRequest({
					url: "/api/getSell/" + this.user.user_id
				})
				// console.log(res.data.message);
				this.sellItem = res.data.message;
			}
		},
		onLoad() {
			this.user = this.$getUser();
			this.getSell();
		},
	}
</script>

<style lang="scss" scoped>
	.sellItem {
		.title {
			padding: 30rpx;
			text-align: center;
		}
	}
</style>
