<template>
	<view class="container">
		<view class="info-text">
			<view class="name">{{item.user_id}}</view>
			<view class="content">{{item.content}}</view>
			<view class="buttom">
				<!-- <view class="del" v-if="item.user_id == localUsr" @click="delThisComment">删除</view> -->
				<view class="time">{{item.post_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>

	const moment = require('moment');
	export default {
		name: "commentItem",
		data() {
			return {
				
			}
		},
		props: {
			item: {
				user_id: '',
				content: '',
				post_time: ''
			},
			// localUsr:''
		},
		// methods:{
		// 	delThisComment(e)
		// 	{
		// 		console.log(e);
		// 	}
		// }
	}
</script>


<style lang="scss">
	.container {
		padding: 20px;
	}

	.comment-item {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.info-text {
		margin-left: 0;
		.name {
			font-size: 16px;
			font-weight: bold;
			color: #515151;
		}
		
		.content {
			margin-top: 6px;
			font-size: 20px;
			color: #494949;
			word-wrap: break-word;
		}
		.buttom{
			// display: flex;
			// justify-content: space-between;
			// .del {
			// 	margin-top: 6px;
			// 	font-size: 15px;
			// 	text-align: left;
			// 	padding-left: 70rpx;
			// 	color: #4489cd;
			// }
			
			.time {
				margin-top: 6px;
				font-size: 15px;
				text-align: right;
				color: #999;
			}
		}

	}


</style>
