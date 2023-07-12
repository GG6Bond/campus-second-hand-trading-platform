<!-- 登录 -->
<template>
	<view class="sign-in">
		<view class="tip">
			昵称：
		</view>
		<input v-model="nickName" type="text" placeholder="请输入昵称" />

		<view class="ps">
			昵称长度需要为0-15个字符
		</view>

		<button class="btn" @click="changeNickName">修改</button>

	</view>
</template>

<script>
	import {
		cleanUser,
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				nickName: ''
			};
		},
		methods: {
			changeNickName() {
				console.log(this.nickName);
				if (this.nickName.trim() == '' || this.nickName.length > 15) {
					// console.log('昵称不合法！');
					uni.showToast({
						icon: "error",
						title: '昵称不合法'
					})
				}


			}
		}
	}
</script>

<style lang="scss" scoped>
	.sign-in {

		margin: 60rpx;
		line-height: 80rpx;
		font-size: 50rpx;

		.tip {
			font-size: 40rpx;
			color: #222222;
			font-weight: bold;
		}

		input {
			border: 1px solid #3F536E;
			border-radius: 20rpx;
			height: 90rpx;
			padding: 10rpx;
		}

		.ps {
			font-size: 26rpx;
			color: #ff0000;
		}

		.btn {
			margin-top: 20rpx;
			// color: #007AFF;
			background-color: #b0b0b0;
		}


	}
</style>
