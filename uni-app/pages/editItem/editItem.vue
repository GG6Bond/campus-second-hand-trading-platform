<!-- 编辑商品页面 -->

<template>
	<view class="editItem">
		
		<form>
			<view class="title">
				<view class="title-text row">
					<view class="left-text">标题：</view>
					<input class="titleName" v-model="title" />
				</view>
				<view class="price-num row">
					<view class="left-text">价格：</view>
					<input class="price" type="digit" placeholder="￥" v-model="price" />
				</view>
				<view class="classify row">
					<picker mode="selector" :value="index" :range="classify" @change="bindPickerChange">
						<view>
							<view class="left-text">
								分类：
							</view>
							<template v-if="index > -1">
								{{classify[index]}}
							</template>
						</view>
					</picker>
				</view>
				<view class="uni-list row">
					<radio-group @change="radioChange">
						<view class="left-text">
							校区：
						</view>
						<label class="uni-list-cell" v-for="(item, index) in districts" :key="item.value">
							<view>
								<radio :value="item.value" :checked="index === current" />
							</view>
							<view class="radio-text">{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="text">
				<textarea class="text-area" placeholder="在这里输入商品的详细信息" v-model="detail"></textarea>
			</view>
			<view class="img-box">
				<view class="img" v-for="(item,index) in imgArr" :key="index">
					<!-- <span class="icon-bin del-btn" @click="delImg(index)"></span> -->
<!-- 					<image src="../../static/itemdetail/delete.png" :cl ass="del-btn" 
					@click="delImg(index)" mode=""></image> -->
					<!-- <view class="del-btn" @click="delImg(index)">×</view> -->
					<image :src="item" @click="previewImg(index)" class="pic" mode="aspectFill">
					</image>
					
					<image src="../../static/itemdetail/delete.png" 
					mode="aspectFill" @click="delImg(index)"></image>
				</view>
				<view class="upload-img" @click="chooseImg" v-if="imgArr.length < 9">
					<!-- <span class="plus"> + </span> -->
					<span class="icon-cloud-upload"></span>
					上传图片
				</view>
			</view>
			<view class="btn-group">
				<button class="submit" @click="checkSubmit">
					<span class="icon-done"></span>
					修改
				</button>
				<button class="del" type="warn" @click="checkDel">
					<span class="icon-del"></span>
					删除商品
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"
	export default {
		data() {
			return {
				price: "",
				title: "",
				detail: "",
				imgArr: [],
				user: {},
				productid: -1,
				product: {},
				classify: ["生活用品", "书本", "电子产品", "其它"],
				index: 0,
				districts: [{
					value: "0",
					name: "东校区"
				}, {
					value: "1",
					name: "西校区"
				}],
				current: 0
			}
		},
		onShow() {
			this.user = this.$getUser();
		},
		onLoad(obj) {
			this.productid = obj.id;
			this.getdetail();
		},
		methods: {
			bindPickerChange(e) {
				this.index = e.target.value
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.districts.length; i++) {
					if (this.districts[i].value === evt.detail.value) {
						this.current = i;
						console.log(this.current)
						break;
					}
				}
			},
			async getdetail() {
				const res = await myRequest({
					url: "/api/getProductDetail/" + this.productid,
				})
				this.product = res.data.message[0]
				this.price = this.product.product_price;
				this.title = this.product.product_title;
				this.detail = this.product.product_detail;
				this.index = this.classify.findIndex((item) =>
					this.product.product_classify === item
				)
				this.current = this.product.product_district;
				for (let i of this.product.imgArr) {
					this.imgArr.push(this.$baseUrl + i)
				}
			},
			chooseImg() {
				if (this.imgArr.length >= 9) {
					return;
				}
				uni.chooseImage({
					count: 9 - this.imgArr.length,
					success: (res) => {
						this.imgArr = [...this.imgArr, ...res.tempFilePaths];
					}
				})
			},
			previewImg(current) {
				uni.previewImage({
					current,
					urls: this.imgArr
				})
			},
			delImg(current) {
				this.imgArr.splice(current, 1);
			},
			checkSubmit() {
				let flag = false;
				this.price += ""
				if (this.price.trim() && this.title.trim() && this.detail.trim() && this.imgArr.length !== 0) {
					flag = true;
				} else {
					uni.showToast({
						title: "请检查信息是否填写完整",
						icon: "none",
					})
				}
				if (flag) {
					this.submit();
				}
			},
			async submit() {
				let _self = this;
				const res = await myRequest({
					url: "/api/editProductDetail",
					method: "POST",
					data: {
						title: this.title,
						price: this.price,
						detail: this.detail,
						imgArr: this.imgArr,
						id: this.productid,
						classify: this.classify[this.index],
						district: this.current
					}
				})
				if (res.data.status === 0) {
					this.uploadPic(this.productid);
					this.price = "";
					this.title = "";
					this.detail = "";
					uni.showToast({
						title: "修改成功",
						icon: "none",
					})
					uni.switchTab({
						url: "../userInfomation/userInfomation",
						success: () => {
							let url = "";
							if (_self.user.user_role === 2) {
								url = "../userHomePage/userHomePage"
							} else {
								url = "../allProduct/allProduct"
							}
							uni.navigateTo({
								url
							})
						}
					})
				}
			},
			async uploadPic(time) {
				let index = 0

				for (let i of this.imgArr) {
					await new Promise((resolve, reject) => {
						uni.uploadFile({
							url: this.$baseUrl + "/api/upload",
							filePath: i,
							name: "files",
							formData: {
								time: time,
								id: index
							},
							success: res => {
								resolve(res);
								this.imgArr = [];
							},
							fail: err => {
								reject(err);
							}
						})
					})
					index++;
				}
			},
			async delProduct() {
				let _self = this;

				const res = await myRequest({
					url: "/api/delProduct",
					method: "POST",
					data: {
						productid: _self.productid
					}
				})
				if (res.data.status === 0) {
					uni.navigateBack({
						delta: 2
					})
					uni.navigateTo({
						url: "../userHomePage/userHomePage"
					})
				}
			},
			checkDel() {
				let _self = this;
				uni.showModal({
					title: "确定删除商品吗？",
					content: "删除后无法恢复",
					showCancel: true,
					confirmText: "删除",
					confirmColor: "#d50000",
					success(res) {
						if (res.confirm == true) {
							_self.delProduct();
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.editItem {
		$img-size: 200rpx;

		.title {
			// padding-bottom: 50rpx;
			padding: 0rpx 0rpx;

			//公共样式
			.row {
				padding: 0rpx 30rpx;
				background-color: #FFFFFF;
				position: relative;
				top: 0;
				display: flex;
				align-items: center;
				height: 150rpx;
				width: 100%;
				margin-top: 1px;

				.left-text {
					width: 20%;
					margin-right: 30rpx;
					display: inline-block;
					text-align: right;
				}
			}
			
			.classify {
				picker {
					width: 100%;
					line-height: 150rpx;
				}
			}

			.titleName {
				padding: 0 10rpx;
			}

			.price {
				margin: 30rpx 0;
				padding: 0 10rpx;
			}
		}

		.text {
			margin-top: 1px;
			padding: 10rpx 10rpx;
			background: #FFFFFF;

			.text-area {
				width: 90%;
				padding: 30rpx 30rpx;
			}
		}

		.uni-list {
			display: flex;
			align-items: flex-end;
			width: 750rpx;
			
			uni-radio-group {
				width: 100%;
			}
			
			radio-group {
				width: 100%;
			}

			.uni-list-cell {
				view {
					display: inline-block;
				}

				.radio-text {
					padding-right: 50rpx;
				}
			}
		}

		.img-box {
			display: flex;
			flex-wrap: wrap;
			margin: 20rpx 48rpx;
			
			
			.img {
				margin: 10rpx;
				position: relative;
				top: 0;
				left: 0;
				width: $img-size;
				height: $img-size;
				overflow: hidden;

				image{
					width: 50rpx;
					height: 50rpx;
				}
				
				.del-btn {
					position: absolute;
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					bottom: 0;
					left: 0;
					background: #d9d9d9;
					font-size: 30rpx;
					z-index: 999;
					text-align: center;
					opacity: 0.8;
				}

				// .icon-bin:before {
				// 	content: '\e9ac';
				// 	color: #000000;
				// }

				.pic {
					text-align: center;
					width: 100%;
					height: 230rpx;
				}
				
				image {
					position: absolute;
					width: 80rpx;
					height: 80rpx;
					line-height: 40rpx;
					bottom: 0;
					right: 0;
					background: #ffffff;
					font-size: 30rpx;
					z-index: 999;
					text-align: center;
					opacity: 0.8;
				}
			}

			.upload-img {
				display: flex;
				margin: 10rpx;
				position: relative;
				top: 0;
				left: 0;
				width: $img-size;
				height: $img-size;
				align-items: center;
				justify-content: center;
				background: #dddddd;
				opacity: 0.5;

				.plus {
					font-size: 46rpx;
					font-weight: 700;
				}
			}
		}

		.btn-group {
			display: flex;
			width: 100%;

			.submit {
				width: 35%;
			}

			.del {
				width: 35%;
			}
		}

		// .icon-del:before {
		// 	content: "\e905";
		// }

		// .icon-cloud-upload:before {
		// 	content: "\e90e";
		// }

		// .icon-done:before {
		// 	content: "\e906";
		// }
	}
</style>
