<template>
	<view class="container">
		<input placeholder="请输入公告标题" v-model="title" />
		<textarea placeholder="请输入公告内容" v-model="content"></textarea>
		<button @click="submit">发布</button>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				title: '',
				content: ''
			}
		},
		methods: {
			async submit() {
				// 在这里处理发布公告的逻辑
				if (this.title == "" || this.content == "") {
					uni.showToast({
						icon: 'error',
						title: "请输入完整信息"
					})
				} else {
					console.log('公告标题：', this.title)
					console.log('公告内容：', this.content)

					const res = await myRequest({
						url: "/api/postNotice/",
						method: "POST",
						data: {
							title: this.title,
							content: this.content
						}
					})
					console.log(res.data.status);
					if (res.data.status === 0) {
						// console.log("111"+res.data.status);
						this.title = ''
						this.content = ''
						uni.showToast({
							icon: "success",
							title: "发布成功",
							duration: 2000
						})
						// setInterval(() => {
						// 	uni.switchTab({
						// 		url: "/pages/index/index"
						// 	})
						// }, 2000)
					} else {
						uni.showToast({
							icon: 'error',
							title: "发布失败，请重试",
							duration: 2000
						})
					}

				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		input {
			border: 1rpx solid #ccc;
			border-radius: 5rpx;
			width: 90%;
			height: 60rpx;
			font-size: 56rpx;

		}

		textarea {

			margin-top: 30rpx;
			border: 1rpx solid #ccc;
			border-radius: 5rpx;
			width: 90%;
			height: 600rpx;
			font-size: 40rpx;
		}

		button {

			margin-top: 30rpx;
			background-color: $uni-color-primary;
			color: #fff;
			font-size: 32rpx;
			width: 90%;
		}
	}

	// input, textarea {
	//   margin: 0 auto 20rpx;
	//   padding: 10rpx;
	//   border: 1rpx solid #ccc;
	//   border-radius: 5rpx;
	//   font-size: 28rpx;
	//   width: 80%;
	//   height: 100rpx;
	//   box-sizing: border-box;
	// }
	// textarea {
	//   height: 200rpx;
	// }
</style>
