<template>
	<view class="main-box" :class="isMiddle ? 'middle' : ''">
		<view class="none" v-if="data.length === 0">今天还没有新的商品哦</view>
		<view class="shoppingListItemUpDown" v-for="(items, index) in data" :key="index"
			@click="gotoPage(items.product_id)" @longpress="myLongPress(items.product_id)">
			<view class="top-box">
				<image :src="baseUrl + items.imgArr" mode="aspectFit" class="img"></image>
			</view>
			<view class="bottom-box">
				<view class="title">{{items.product_title}}</view>
				<view class="price">
					￥<span class="price-num">
						{{items.product_price}}
					</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"
	export default {
		data() {
			return {
				baseUrl: ""
			}
		},
		props: {
			data: Array,
			showStatus: Boolean,
			delInfo: {
				type: Object,
				default: undefined
			},
			isMiddle: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			gotoPage(id) {
				uni.navigateTo({
					url: '/pages/itemDetails/itemDetails?id=' + id,
				});
			},
			status(status) {
				switch (status) {
					case 0:
						return "已上架";
					case 1:
						return "交易中";
					case 2:
						return "已完成"
				}
			},
			myLongPress(productid) {
				let _self = this;
				console.log('delete' + productid);
				if (!this.delInfo) {
					return
				}
				uni.showModal({
					title: "是否删除这条记录",
					showCancel: true,
					confirmText: "删除",
					confirmColor: "#d50000",
					success(res) {
						if (res.confirm == true) {
							_self.delHistory(productid);
						}
					}
				})
			},
			async delHistory(productid) {
				let _self = this;

				const res = await myRequest({
					url: _self.delInfo.url,
					method: "POST",
					data: {
						userid: _self.delInfo.userid,
						productid: productid
					}
				})
				if (res.data.status === 0) {
					this.$emit("refresh", true)
				}
			}
		},
		mounted() {
			this.baseUrl = this.$baseUrl;
		}
	}
</script>

<style lang="scss" scoped>
	.middle {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}

	.main-box {
		// white-space: nowrap;
		// border-bottom: 1px solid #000000;


		.none {
			padding: 50rpx;
			text-align: center;
			color: #54547e;
		}

		.shoppingListItemUpDown {
			text-align: center;
			height: 350rpx;
			border: 1px solid #d4d4d4;
			border-radius: 10px;
			width: 300rpx;
			padding: 10rpx 10rpx;
			margin: 10rpx 10rpx;
			overflow: hidden;
			display: inline-block;
			box-sizing: border-box;

			.top-box {
				// margin: auto;
				text-align: center;
				width: 100%;
				height: 70%;

				.img {
					max-width: 80%;
					height: 100%;
				}
			}

			.bottom-box {
				width: 100%;
				position: relative;
				top: 0;
				left: 0;

				.title {
					font-weight: 700;
					font-size: 40rpx;
					line-height: 60rpx;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.price {
					color: #ff0000;
				}

				// 	.bottom-box {}
			}
		}
	}
</style>
