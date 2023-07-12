<template>
	<view class="manageUser">
		<userList :data="userList" @refresh="getUserList"></userList>
		<!-- 		<user-list :data="userList" @refresh="getUserList"></user-list>
		<user-list :data="userList" @refresh="getUserList"></user-list> -->

	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"
	export default {
		data() {
			return {
				userList: []
			};
		},

		methods: {
			async getUserList() {
				const res = await myRequest({
					url: "/api/getUserinfo"
				})
				this.userList = res.data.message;
			}
		},
		onLoad() {



			this.getUserList();
		},
		onShow() {
			this.getUserList();
		}
	}
</script>

<style lang="scss" scoped>
	.manageUser {}
</style>
