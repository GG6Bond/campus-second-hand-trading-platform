<!-- 我关注的商品页面 -->
<template>
	<view class="myFollow">
		<view v-if="myFollow.length === 0" class="title">没有关注商品</view>
		<!-- data -->
		<shoppingListItem :data="myFollow" :delInfo="delInfo" :showStatus="true" @refresh="refresh">
		</shoppingListItem>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {

		data() {
			return {
				myFollow: [],
				user: {},
				delInfo: {
					url: "",
					userid: "",
					productid: ""
				}
			}
		},
		methods: {
			async getFollow() {
				const res = await myRequest({
					url: "/api/getFollow/" + this.user.user_id
				})
				// console.log(res.data.message);
				this.myFollow = res.data.message;
			},
			refresh(refresh) {
				if (refresh) {
					this.getFollow();
				}
			}
		},
		onLoad() {
			this.user = this.$getUser();
			this.getFollow();
			this.delInfo.url = "/api/delFollow"
			this.delInfo.userid = this.user.user_id;
		},
		mounted() {}
	}
</script>

<style scoped lang="scss">
	.myFollow {
		.title {
			padding: 30rpx;
			text-align: center;
		}
	}
</style>
