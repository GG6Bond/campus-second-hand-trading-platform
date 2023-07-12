<!-- 历史记录页面 -->
<template>
	<view class="historyList">
		<view v-if="historyList.length === 0" class="title">没有历史记录</view>
		<shoppingListItem :data="historyList" :delInfo="delInfo" :showStatus="true" @refresh="refresh">
		</shoppingListItem>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		name: "historyList",

		data() {
			return {
				historyList: [],
				user: {},
				delInfo: {
					url: "",
					userid: "",
					productid: ""
				}
			}
		},
		methods: {
			async getHistory() {
				const res = await myRequest({
					url: "/api/getHistory/" + this.user.user_id
				})
				// console.log(res.data.message);
				this.historyList = res.data.message;
			},
			refresh(refresh) {
				if (refresh) {
					this.getHistory();
				}
			}
		},
		onLoad() {
			this.user = this.$getUser();
			this.getHistory();
			this.delInfo.url = "/api/delHistory"
			this.delInfo.userid = this.user.user_id;
		},
		mounted() {}
	}
</script>

<style scoped lang="scss">
	.historyList {
		.title {
			padding: 30rpx;
			text-align: center;
		}
	}
</style>
