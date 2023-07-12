<!-- 确认购买页面 -->

<template>
	<view class="comfirmBuy">
		<view class="item-box">
			<view class="left-box">
				<img :src="baseUrl + imgArr" mode="widthFix" class="img"></img>
			</view>
			<view class="right-box">
				<view class="title">{{title}}</view>
				<view class="bottom-box">
					<view class="price">
						￥<span class="price-num">
							{{price}}
						</span>
					</view>
				</view>
			</view>
		</view>
		<view class="buttom-line">
			<view class="btn">
				<button type="primary" class="buy" @click="buy">确认购买</button>
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
				id: -1,
				title: "标题",
				price: 0,
				product: {},
				imgArr: "",
				user: {},
				baseUrl: ""
			}
		},
		methods: {
			async buy() {
				const res = await myRequest({
					url: "/api/buyProduct",
					method: "POST",
					data: {
						userid: this.user.user_id,
						productid: this.id
					}
				})
				// console.log(res);
				if (res.data.status == 0){
					uni.showToast({
						title: "购买成功,请及时联系发布者",
						success() {
							setTimeout(() => {
								uni.switchTab({
									url: "../index/index"
								})
							}, 3000)
						}
					})
				}
				if(res.data == 'yscErr')
				{
					uni.showToast({
						icon:'error',
						title:'慢了一步，已售出',
						success(){
							uni.switchTab({
								url:"../shoppingList/shoppingList"
							})
						}
					},2000)

				}
			},
			async getdetail() {
				const res = await myRequest({
					url: "/api/getProductDetail/" + this.id,
				})
				// console.log(res.data.message[0])
				this.product = res.data.message[0]
				this.price = this.product.product_price;
				this.title = this.product.product_title;
				this.imgArr = this.product.imgArr[0];
			},
		},
		onLoad(obj) {
			this.id = obj.id;
			this.baseUrl = this.$baseUrl;
		},
		mounted() {
			this.getdetail();
			this.user = this.$getUser();
		}
	}
</script>

<style scoped lang="scss">
	.comfirmBuy {
		.item-box {
			display: flex;
			margin: 40rpx 20rpx;
			padding: 30rpx 0;
			background: #FFFFFF;
			border-radius: 20rpx;

			.left-box {
				margin: auto;
				text-align: center;
				width: 45%;

				.img {
					max-width: 80%;
				}
			}

			.right-box {
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

					.price {
						color: #C30602;
						font-size: 20rpx;
						line-height: 18rpx;
					}

					.price-num {
						font-size: 40rpx;
					}

					.date {
						color: #cccccc;
						font-size: 15rpx;
					}
				}
			}
		}

		.buttom-line {
			width: 100%;
			position: fixed;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			background: #FFFFFF;
			height: 120rpx;


			.btn {
				width: 40%;
				margin: 0 20rpx;

				.buy {
					background: #1b92ff;
				}
			}
		}
	}
</style>
