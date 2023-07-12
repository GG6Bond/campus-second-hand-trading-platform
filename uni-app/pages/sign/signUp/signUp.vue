<!-- 注册 -->
<template>
	<view class="sign-up">
		<view class="tip">
			手机号：
		</view>
		<input v-model="id" type="number" placeholder="请输入手机号" />


		<view class="tip">
			邮箱：
		</view>
		<input v-model="username" type="text" placeholder="请输入邮箱" />


		<view class="tip">
			密码：
		</view>
		<input v-model="password" type="password" placeholder="请输入密码" />

		<view class="tip">
			确认密码：
		</view>
		<input v-model="chkpass" type="password" placeholder="确认密码" />

		<view class="yzm">
			<view class="yzm_top">
				验证码：
			</view>
			<view class="yzm_button">
				<input v-model="code" type="number" placeholder="请输入短信验证码" />
				<button @click="sendCode()" :disabled="disableButton">{{buttonText}}</button>
			</view>
		</view>


		<button @click="check" class="btn">注册</button>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	import {
		verifyPhone,
		verifyEmail
	} from '@/util/verify.js'

	export default {
		data() {
			return {

				disableButton: false,
				buttonText: '获取验证码',
				remainingTime: 60,
				id: "",
				username: "",
				password: "",
				chkpass: "",
				code: ""
			}
		},
		methods: {
			check() {
				if (!(verifyPhone(this.id))) {
					uni.showToast({
						title: "手机号格式有误",
						icon: "error"
					})
				} else if (!this.password) {
					uni.showToast({
						title: "请输入密码",
						icon: "error"
					})
				} else if (this.password !== this.chkpass) {
					uni.showToast({
						title: "密码不一致！",
						icon: "error"
					})
				} else if (!(verifyEmail(this.username))) {
					uni.showToast({
						title: "请输入用户名",
						icon: "error"
					})
				} else {
					this.createUser();
				}
			},
			djs() {

				this.disableButton = true;
				const timer = setInterval(() => {
					if (this.remainingTime > 0) {
						this.remainingTime--;
						this.buttonText = `${this.remainingTime}后重新获取`;
					} else {
						clearInterval(timer);
						this.disableButton = false;
						this.buttonText = '获取验证码';
						this.remainingTime = 60;
					}
				}, 1000)
			},
			async sendCode() {
				this.check();
				if (this.id.trim() == '' || this.password.trim() == '' || this.username.trim() == '' || this.chkpass
					.trim() == '') {
					uni.showToast({
						icon: 'error',
						title: '请输入完整信息！'
					})

				} else {
					console.log("点击了发送验证码");

					this.djs();

					const res = await myRequest({
						url: "/api/sendVerificationCode/",
						method: "POST",
						data: {
							phone: this.id
						}
					})
					console.log(res.data);
				}
			},
			async createUser() {
				const res = await myRequest({
					url: "/api/createUser/",
					method: "POST",
					data: {
						id: this.id,
						password: this.password,
						username: this.username,
						code: this.code
					}
				})
				if (res.data === 'codeErr') {
					return uni.showToast({
						title: "用户名已存在或是验证码错误！",
						icon: "error"
					})
				}
				if (res.data.status !== 0) {
					return uni.showToast({
						title: "用户已存在！",
						icon: "error"
					})
				} else {
					this.id = "";
					this.username = "";
					this.password = "";
					this.chkpass = "";
					uni.showToast({
						title: "注册成功！即将跳转至登录页",
						icon: "none"
					})
					setTimeout(() => {
						uni.redirectTo({
							url: "../signIn/signIn"
						})
					}, 2000)
				}
			}
		}
	}
</script>


<style lang="scss">
	.sign-up {
		margin: 40rpx;
		line-height: 80rpx;
		font-size: 50rpx;

		.tip {
			font-size: 40rpx;
			color: #55aa7f;
			font-weight: bold;
		}

		.yzm {
			display: flex;
			flex-direction: column;

			.yzm_top {
				font-size: 40rpx;
				color: #55aa7f;
				font-weight: bold;
			}

			.yzm_button {
				display: flex;
				justify-content: center;
				align-items: center;

				input {
					width: 40%;
				}

				button {
					// width: 200rpx;
					height: 90rpx;
					color: #00aaff;
				}
			}



		}

		input {
			border: 1px solid #3F536E;
			border-radius: 20rpx;
			height: 90rpx;
			padding: 10rpx;
			margin-bottom: 20rpx;
		}

		.btn {
			margin-top: 50rpx;
		}
	}
</style>
