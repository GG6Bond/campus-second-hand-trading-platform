<!-- 登录 -->
<template>
	<view class="sign-in">
		<view class="tip">
			手机号：
		</view>
		<input v-model="username" type="number" placeholder="请输入手机号" />
		<view class="tip">
			密码：
		</view>
		<input v-model="password" type="password" placeholder="请输入密码" @keypress.native.enter="check" />
		<button class="btn" @click="check">登录</button>
		
		<view class="forgetPwd" @click="gotoForgetPwd">
			忘记密码
		</view>
		<view class="buttom_up">
			<view class="bottom-box">还没有账号？点击注册→ <span type="default" @click="gotoPage" class="register">注册</span>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cleanUser,
		myRequest
	} from "@/util/api.js"
	
	import {verifyPhone} from '@/util/verify.js'

	export default {
		data() {
			return {
				username: "",
				password: ""
			};
		},
		methods: {
			check() {
				
				if (!(verifyPhone(this.username))) {
					uni.showToast({
						title: "请输入手机号",
						icon: "error"
					})
				} else if (!this.password) {
					uni.showToast({
						title: "请输入密码",
						icon: "error"
					})
				} else {
					this.logIn();
				}
			},
			async logIn() {
				const res = await myRequest({
					url: "/api/logIn/",
					method: "POST",
					data: {
						username: this.username,
						password: this.password
					}
				})
				if (res.data == "error") {
					uni.showToast({
						title: "用户不存在",
						icon: "error",
					})
					return;
				} else if (res.data == "pwdErr") {
					uni.showToast({
						title: "密码错误",
						icon: "error"
					})
				} else if (res.data.message.length == 1) {
					this.setUser(res.data.message[0]);
					uni.showToast({
						title: "登录成功！",
						icon: "none",
					})
					uni.switchTab({
						url: "../../index/index"
					})

				}
			},

			setUser(user) {
				uni.setStorageSync('user', user);
				uni.setStorageSync('isLogin', true);
			},
			gotoPage() {
				uni.redirectTo({
					url: "../signUp/signUp"
				})
			},
			gotoForgetPwd(){
				console.log('点击了忘记密码');
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
			color: #55aa7f;
			font-weight: bold;
		}

		input {
			border: 1px solid #3F536E;
			border-radius: 20rpx;
			height: 90rpx;
			padding: 10rpx;
		}


		.btn {
			margin-top: 80rpx;
			// color: #007AFF;
			background-color: #59b485;
		}
		
		.forgetPwd{
			font-size: 30rpx;
			color: #55aaff;
			text-align: right;
			
		}

		.buttom_up{
			display: flex;
			justify-content: center;
			align-items: center;
			.bottom-box {
				height: 300rpx;
				line-height: 300rpx;
				font-size: 40rpx;
				position: fixed;
				bottom: 0;
				color: #55557f;
			
				.register {
					color: #007AFF;
				}
			}
		}
	}
</style>
