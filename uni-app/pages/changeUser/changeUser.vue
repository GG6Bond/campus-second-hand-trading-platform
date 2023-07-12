<!-- 修改个人信息 -->

<template>
	<view class="changeUser">
		<view class="text">{{showText[message]}}</view>
		<input v-model="text" v-if="message != 1" />
		<input v-model="text" type="number" v-else />
		<button type="default" @click="checkSubmit">修改</button>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				user: {},
				text: "",
				message: -1,
				username: "",
				showText: ["手机号：","用户名：",  "密码："]
			};
		},
		methods: {
			checkSubmit() {
				if (this.text == "") {
					uni.showToast({
						title: "请输入修改内容",
						icon: "error"
					})
				} else {
					this.submit()
				}
			},
			async submit() {
				const res = await myRequest({
					url: "/api/changeUser/",
					method: "POST",
					data: {
						id: this.user.user_id,
						text: this.text,
						message: this.message
					}
				})
				if (res.data.status == 0) {
					if (this.message == 1) {
						this.username = this.text;
					}
					uni.showToast({
						title: "修改成功,请重新登录",
						icon: "none",
					})
					this.getUserInfo();
				} else {
					uni.showToast({
						title: "修改失败",
						icon: "error",
					})
				}
			},
			async getUserInfo() {
				const res = await myRequest({
					url: "/api/getuserinfo/" + this.username
				})
				if (res.data.status == 0) {
					this.user = res.data.message;
					this.setUser();
					setTimeout(() => {
						uni.switchTab({
							url: "../index/index"
						})
					}, 1500)
				}
			},
			setUser() {
				uni.removeStorageSync('user');
				uni.removeStorageSync('isLogin')
			},
		},
		onLoad(obj) {
			this.message = obj.index;
			this.user = this.$getUser();
			this.username = this.user.user_id;
		}
	}
</script>

<style lang="scss" scoped>
	.changeUser {
		margin: 30rpx;
		input {
			border: 1px solid #3F536E;
			border-radius: 20rpx;
			height: 90rpx;
			padding: 10rpx;
			margin: 10rpx;
		}
	}
</style>
