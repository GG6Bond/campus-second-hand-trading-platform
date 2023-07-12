<!-- 登录 -->
<template>
	<view class="sign-in">
		<view class="tip">
			邮箱：
		</view>
		<input v-model="email" type="text" placeholder="请输入邮箱" />

		<button class="btn" @click="changeEmail">修改</button>

	</view>
</template>

<script>
	import {
		getUser,
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				user_id: '',
				email: ''
			};
		},
		methods: {
			changeEmail() {

				// const email = document.getElementById("email").value;
				const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

				// if (regex.test(email)) {
				// 	alert("邮箱格式正确！");
				// } else {
				// 	alert("邮箱格式不正确，请重新输入！");
				// }
				// console.log(this.email);
				// if (this.email.trim() == '' || this.email.length > 15) {
				// todo 加入判断邮箱正则表达式
				if (!regex.test(this.email)) {
					uni.showToast({
						icon: "error",
						title: '邮箱不合法'
					})
					// console.log('邮箱不合法！');
				} else {
					uni.showModal({
						title: '提示',
						content: '确定要把邮箱改为\n' + this.email + ' 吗?',
						success: async (res) => {
							if (res.confirm) {
								console.log('用户点击确定');
								console.log('手机号：' + this.user_id);
								console.log('邮箱：' + this.email);
								// console.log('用户点击确定');
								// todo 修改邮箱
								const res = await myRequest({
									url: '/api/changeEmail/',
									method: 'POST',
									data: {
										id: this.user_id,
										email: this.email
									}
								})
								console.log(res.data.status);
								if(res.data.status === 0)
								{
									uni.showToast({
										icon:'success',
										title:'修改成功'
									})
									setTimeout(()=>{
										uni.navigateBack(1)
									},2000)
									
									// uni.navigateTo({
									// 	url:'../editUserInformation/editUserInformation'
									// })
								}
								else{
									uni.showToast({
										icon:'error',
										title:'修改失败'
									})
								}
								// console.log(res.data);



							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			}
		},
		onShow() {
			this.user_id = getUser().user_id;
			console.log('修改邮箱，用户手机号为：' + this.user_id);
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
