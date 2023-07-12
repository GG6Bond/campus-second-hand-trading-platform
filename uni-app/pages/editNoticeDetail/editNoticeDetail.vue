<template>
	<view>
		这是公告详情页，这里可以编辑公告，删除公告
		<view class="container">
			<view class="tip">
				标题
			</view>
			<input v-model="n_title"/>
			<view class="tip">
				内容
			</view>
			<textarea v-model="n_content"></textarea>
			<button @click="upadateNotice">修改</button>
			<button @click="deleteNotice">删除</button>
		</view>
	</view>
</template>

<script>
	import {
		myRequest
	} from "../../util/api.js"

	export default {
		data() {
			return {
				noticeDetail:{},
				n_id:8,
				n_title:'',
				n_content:''
			};
		},
		onLoad(e) {
			console.log(e);
			this.getNoticeDetail(e.id);
		},
		methods: {
			async getNoticeDetail(e) {
				const res = await myRequest({
					url:"/api/getNoticeDetail/"+e,
					method:"POST"
				})
				console.log(res.data.message);
				// this.noticeDetail = res.data.message[0];
				this.n_id = res.data.message[0].notice_id;
				this.n_title = res.data.message[0].notice_title;
				this.n_content = res.data.message[0].notice_content;
			},
			async upadateNotice()
			{
				let info = `title: ${this.n_title}; content:${this.n_content}`;
				const res = await myRequest({
					url:"/api/updateNotice/",
					method:"POST",
					data:{
						id:this.n_id,
						title:this.n_title,
						content:this.n_content
					}
				})
				if(res.data.status === 0)
				{
					uni.showToast({
						icon:"success",
						title:"更新成功"
					})
					// setInterval(()=>{
					// 	// uni.switchTab({
					// 	// 	url:"/pages/index/index"
					// 	// })
					// 	uni.navigateBack();
					// },2000)
				}
				console.log('更新后的公告'+info);
				console.log("更新公告");
			},
			async deleteNotice()
			{
				console.log("删除公告");
				const res = await myRequest({
					url:"/api/deleteNotice/"+this.n_id,
					method:"POST"
				})
				if(res.data.status === 0)
				{
					uni.showToast({
						icon:"success",
						title:"删除成功"
					})
					// setInterval(()=>{
					// 	// uni.switchTab({
					// 	// 	url:"/pages/index/index"
					// 	// })
					// 	uni.navigateBack()
					// },2000)
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
		// justify-content: center;
		// align-items: center;

		.tip {
			padding-top: 20rpx;
			justify-content: flex-start;
		}

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
</style>
