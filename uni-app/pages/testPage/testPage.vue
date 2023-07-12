<template>
	<view class="container">
		<input placeholder="请输入公告标题" v-model="title" />
		<textarea placeholder="请输入公告内容" v-model="content"></textarea>
		<button @click="submit">发布</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: ''
			}
		},
		methods: {
			submit() {
				// 在这里处理发布公告的逻辑
				console.log('公告标题：', this.title)
				console.log('公告内容：', this.content)
				// 清空输入框
				this.title = ''
				this.content = ''
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content:center;
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
