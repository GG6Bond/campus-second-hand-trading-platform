<!-- 我买到的 -->
<template>
	<view class="buyItem">
		<view v-if="buyItem.length === 0" class="title">还没有购买商品</view>
		<shoppingListItem :data="buyItem" :showStatus="true"></shoppingListItem>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				buyItem: [],
				user: {}
			};
		},

		methods: {
			async getBuy() {
				const res = await myRequest({
					url: "/api/getBuy/" + this.user.user_id
				})
				// console.log(res.data.message);
				this.buyItem = res.data.message;
			}
		},
		onLoad() {
			this.user = this.$getUser();
			this.getBuy();
		},
	}
</script>

<style lang="scss" scoped>
	.buyItem {
		.title {
			padding: 30rpx;
			text-align: center;
		}
	}
</style>
