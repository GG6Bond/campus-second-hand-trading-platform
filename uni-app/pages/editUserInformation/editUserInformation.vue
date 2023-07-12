<template>
	<view class="content">

		<view class="phone" @click="">
			<view class="name">
				手机:
			</view>

			<view class="phone_num">
				{{user.user_phone}}
			</view>

		</view>


		<view class="bottom-line"></view>


		<view class="nickName" @click="gotoPage_editNickName">
			<view class="name">
				昵称
			</view>
			<view class="enter">
				&gt;&gt;
			</view>
		</view>

		<view class="bottom-line"></view>

		<!-- <view class="bottom-line"></view> -->


		<view class="email" @click="gotoPage_editEmail">
			<view class="name">
				邮箱
			</view>
			<view class="enter">
				&gt;&gt;
			</view>
		</view>


		<view class="bottom-line"></view>

		<view class="pwd" @click="gotoPage_editPwd">
			<view class="name">
				密码
			</view>
			<view class="enter">
				&gt;&gt;
			</view>
		</view>
	</view>
</template>


<script>
	import {
		getUser,
		myRequest
	} from '../../util/api.js'
	export default {
		data() {
			return {
				user: {
					user_phone: '',
					user_email: '',
					user_pwd: ''
				}
			};
		},
		methods: {
			gotoPage_editNickName() {
				uni.navigateTo({
					url:"../editNickName/editNickName"
				})
			},
			gotoPage_editEmail() {
				uni.navigateTo({
					url:"../editEmail/editEmail"
				})
			},
			gotoPage_editPwd(){
				uni.navigateTo({
					url:"../editPwd/editPwd"
				})
			}

		},
		onShow() {
			// this.user = getUser();
			// console.log(this.user);

			this.user.user_phone = getUser().user_id;
			console.log('用户的手机号是：' + this.user.user_phone);
			// this.user.user_phone = 
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 30rpx;
		color: #34689c;

		// .bottom-line-bg {
		// 	background: #d2e6fb;
		// 	width: 100%;
		// 	height: 2px;
		// 	// position: absolute;
		// 	// bottom: -1px;
		// 	// left: 50%;
		// 	// transform: translate(-50%, 0);
		// }

		.bottom-line {
			background: #d0d0d0;
			width: 90%;
			height: 1px;
			position: absolute;
		}

		.name {
			font-size: 50rpx;

		}

		.enter {
			font-size: 50rpx;
		}


		.phone {
			display: flex;
			// justify-content: space-between;
			height: 100rpx;
			font-size: 50rpx;

			.phone_num {
				// padding-left: 200rpx;
				width: 500rpx;
				text-align: right;
				color: #003855;
			}
		}


		.nickName {
			display: flex;
			justify-content: space-between;
			padding-top: 30rpx;
			height: 100rpx;
		}

		.email {
			display: flex;
			justify-content: space-between;
			padding-top: 30rpx;
			height: 100rpx;
		}

		.pwd {
			display: flex;
			justify-content: space-between;
			padding-top: 30rpx;
			height: 100rpx;
		}
	}
</style>
