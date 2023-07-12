<template>
	<view class="wantBuyItem">

		<view class="left_pic">
			<image src="../../static/indexpage/qiugou.png" mode="aspectFit"></image>
		</view>

		<view class="right_content">
			<view class="wantBuyName">
				{{item.wantBuyName}}
			</view>

			<view class="wantDetail">
				{{item.wantBuyDetail}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "wantBuyList",
		data() {
			return {

			};
		},
		props: {
			item: {
				wantBuyName: '',
				wantBuyDetail: '',
				email: '',
				id: 1
			}
		},
		methods: {
			getList() {
				console.log('获取求购列表' + this.wantList);
			}
		},
	}
</script>

<style lang="scss">
	.wantBuyItem {
		height: 190rpx;
		display: flex;
		// padding: 20rpx;


		.left_pic {
			// height: 200px;
			// width: 240px;

			image {
				height: 180rpx;
				width: 240rpx;
				// height: 100%;
				// width: 100%;
				padding-left: 30rpx;

			}
		}

		.right_content {
			padding-left: 30rpx;

			.wantBuyName {
				padding-top: 20rpx;
				font-size: 50rpx;
				width: 200px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.wantDetail {
				padding-top: 25rpx;
				width: 220px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #646464;

			}
		}
	}
</style>
