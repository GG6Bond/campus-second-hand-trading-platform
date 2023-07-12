<template>
	<view>
		<!-- 动态绑定class，最后一条数据无下划线 长按删除 点击跳转详情页-->
		<view class="shoppingListItem" v-for="(items, index) in data" :key="index"
			:class="index != data.length - 1 ? 'bottom-line' : ''" 
			@click="gotoPage(items.product_id)"
			@longpress="myLongPress(items.history_id)">
		
			<view class="left-box">
				<image :src="baseUrl + items.imgArr" mode="aspectFit" class="img"></image>
				<!-- <image :src="items.imgArr" mode="widthFix" class="img"></image> h5 -->
				<!-- <image :src="'../' + items.imgArr" mode="widthFix" class="img"></image> wx -->
			</view>
			<view class="right-box">
				<view class="title">{{items.product_title}}</view>
				<view class="bottom-box">
					<view class="price">
						￥<span class="price-num">
							{{items.product_price}}
						</span>
					</view>
					<!-- 显示商品状态 -->
					<view class="date-status">
						<view class="date">日期：{{formatDate(items.product_id)}}</view>
						<!-- <view class="status" v-if="showStatus">{{status(items.product_status)}}</view> -->
						<view class="status1" v-if="status(items.product_status) === '已上架'">{{status(items.product_status)}}</view>
						<view class="status2" v-if="status(items.product_status) === '交易中'">{{status(items.product_status)}}</view>
						<view class="status3" v-if="status(items.product_status) === '已完成'">{{status(items.product_status)}}</view>
					</view>
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
				baseUrl: "",
			}
		},
		// props 将父组件传来的数据给子组件，后面为接收的类型
		props: {
			data: Array,
			showStatus: Boolean,
			delInfo: {
				type: Object,
				default: undefined
			}
		},
		methods: {
			// 点击跳转到详情页
			gotoPage(id) {
				console.log(id);
				uni.navigateTo({
					url: '/pages/itemDetails/itemDetails?id=' + id,
				});
			},
			// 格式化时间
			formatDate(time) {
				var date = new Date(parseInt(time));
				var mon = date.getMonth() + 1;
				var day = date.getDate();
				return mon + '月' + day + '日';
			},
			// 商品状态
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
			myLongPress(h_id) {
				let _self = this;
				if (!this.delInfo) {
					return
				}
				uni.showModal({
					title: "是否删除这条记录",
					showCancel: true,
					confirmText: "删除",
					confirmColor: "#d50000",
					success(res) {
						// console.log(res)
						if (res.confirm == true) {
							_self.delHistory(h_id);
						}
					}
				})
			},
			async delHistory(h_id) {
				let _self = this;

				const res = await myRequest({
					url: _self.delInfo.url,
					method: "POST",
					data: {
						userid: _self.delInfo.userid,
						history_id: h_id
					}
				})
				// console.log(res.data.status);
				if (res.data.status === 0) {
					this.$emit("refresh", true)
				}
			},
		},
		mounted() {
			this.baseUrl = this.$baseUrl;
			// console.log(this.data)
		},
		onLoad() {
			this.changeList();
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-line {
		border-bottom: 1px solid #91d3fb;
	}

	.shoppingListItem {
		display: flex;
		padding: 10px;
		overflow: hidden;
		height: 180rpx;

		.left-box {
			margin: auto;
			text-align: center;
			// flex-grow: 1;
			width: 45%;
			height: 100%;

			.img {
				max-width: 80%;
				height: 100%;
			}
		}

		.right-box {
			// flex-grow: 1.5;
			width: 55%;
			position: relative;
			top: 0;
			left: 0;



			.title {
				font-weight: 700;
				font-size: 40rpx;
				line-height: 40rpx;
				height: 80rpx;
				overflow: hidden;
			}

			.bottom-box {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;

				.price {
					color: #C30602;
					font-size: 20rpx;
					line-height: 18rpx;
				}

				.price-num {
					font-size: 40rpx;
				}

				.date-status {
					display: flex;
					color: #102132;
					font-size: 30rpx;
					padding-top: 20rpx;
					line-height: 40rpx;
					width: 100%;
					justify-content: space-between;

					.date {}

					.status1 {
						color: #000;
					}
					.status2 {
						color: #d10000;
					}
					.status3 {
						color: #00aa00;
					}
				}
			}
		}

	}
</style>
