<!-- 分类页面 -->
<template>
	<view class="itemClassify">
		<shoppingListItem :data="itemClassify"></shoppingListItem>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				itemClassify: [],
				user: {},
				isLogin: false,
				classify: ""
			};
		},

		methods: {
			async getClassifyList() {
				let _self = this;
				const res = await myRequest({
					url: "/api/getClassifyList/",
					method: "POST",
					data: {
						classify: _self.classify,
						id: _self.user.user_id
					}
				})
				this.itemClassify = res.data.message;
				console.log(this.itemClassify)
			}
		},
		onLoad(obj) {
			this.classify = obj.classify;
			this.isLogin = this.$checkLogin("", false);
			this.user = this.$getUser();
			this.getClassifyList();
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.classify
			});
		}
	}
</script>

<style lang="scss" scoped>
	.itemClassify {}
</style>
