<!-- 求购商品详情页面 -->
<template>
	<view class="content">

		<!-- 		<view class="name">
			<u-tag text="名称" type="info" />
			<view class="">
				{{name}}
			</view>
		</view>



		<view class="detail">
			<u-tag text="详情" type="info" />
			<u-read-more :toggle="true" show-height="100">
				<rich-text :nodes="deatil"></rich-text>
			</u-read-more>
		</view>


		<view class="email">
			<u-tag text="联系方式" type="info" />
			<view class="">
				{{email}}
			</view>
		</view>


		<view class="postid">
			<u-tag text="发布人" type="info" />
			<view class="">
				{{postid}}
			</view>
		</view> -->


		<view class="name">
			<view class="tip">
				商品:
			</view>
			<input v-model="name" disabled="true" />
		</view>

		<view class="detail">
			<view class="tip">
				详情:
			</view>
			<textarea v-model="deatil" disabled="true" auto-height="true"></textarea>
		</view>
		
		<view class="connect">
			<view class="tip">
				联系方式:
			</view>
			<input v-model="email" disabled="true" />
		</view>

	</view>
</template>

<script>
	import {
		myRequest
	} from '../../util/api';
	export default {
		data() {
			return {
				wantBuyDeatil: {},
				name: '',
				deatil: '',
				email: '',
				postid: '',
			};
		},
		onLoad(e) {
			console.log(e.id);
			this.getDetail(e.id);


		},
		methods: {
			async getDetail(e) {
				const res = await myRequest({
					url: "/api/getWantBuyDetail/" + e,
					method: 'POST'
				})
				this.wantBuyDeatil = res.data;

				console.log(this.wantBuyDeatil.message[0].id);
				console.log(this.wantBuyDeatil.message[0].wantBuyName);
				console.log(this.wantBuyDeatil.message[0].wantBuyDetail);
				console.log(this.wantBuyDeatil.message[0].user_id);
				console.log(this.wantBuyDeatil.message[0].email);

				this.name = this.wantBuyDeatil.message[0].wantBuyName;
				this.deatil = this.wantBuyDeatil.message[0].wantBuyDetail;
				this.email = this.wantBuyDeatil.message[0].email;
				this.postid = this.wantBuyDeatil.message[0].user_id;


			}
		}
	}
</script>

<style lang="scss">
	.content {

		
	
		// font-size: 50rpx;

		.tip {
			padding-left: 30rpx;
			font-size: 50rpx;
			color: #1B92FF;
		}

		input {
			margin: 30rpx;
			border: 1rpx solid #ccc;
			border-radius: 5rpx;
			width: 90%;
			height: 60rpx;
			font-size: 56rpx;

		}

		textarea {
			margin: 30rpx;
			margin-top: 30rpx;
			border: 1rpx solid #ccc;
			border-radius: 5rpx;
			width: 90%;
			height: 400rpx;
			font-size: 40rpx;
		}

	}
</style>
