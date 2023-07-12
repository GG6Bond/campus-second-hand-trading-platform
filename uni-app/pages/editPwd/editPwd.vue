<!-- 登录 -->
<template>
	<view class="sign-in">
		
		<view class="tip">
			原密码：
		</view>
		<input v-model="pwd" type="password" placeholder="请输入原密码" />		
		
		<view class="tip">
			新密码：
		</view>
		<input v-model="pwd_1" type="password" placeholder="请输入新密码" />
		
		<view class="tip">
			确认密码：
		</view>
		<input v-model="pwd_2" type="password" placeholder="请再次输入新密码" />
		
		<button class="btn" @click="changePwd">修改</button>

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
				pwd:'',
				pwd_1:'',
				pwd_2:''
			};
		},
		methods: {
			changePwd()
			{
				console.log('输入的原密码：'+ this.pwd);
				if(this.pwd_1.trim() != this.pwd_2.trim() || this.pwd_1.length > 15)
				{
					uni.showToast({
						icon:"error",
						title:'两次密码不一致'
					})
					// console.log('邮箱不合法！');
				}
				else{
					console.log('新密码为：' + this.pwd_1);
					uni.showModal({
						title: '提示',
						content: '确定修改吗?',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定' );								
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
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

		.ps{
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
