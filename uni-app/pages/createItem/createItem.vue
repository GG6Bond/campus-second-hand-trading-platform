<!-- 发布闲置页面 -->
<template>
	<view class="createItem">
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
			
			<view class="text row">
				<textarea class="text-area" placeholder="在这里输入商品的详细信息" v-model="detail"></textarea>
			</view>
			
			
			<view class="img-box">
				<view class="img" v-for="(item,index) in imgArr" :key="index">
					<!-- <span class="icon-bin del-btn" @click="delImg(index)"></span> -->
					<image :src="item" @click="previewImg(index)" class="pic" mode="aspectFill">
					</image>
					<image src="../../static/postitem/delete.png" mode="aspectFill" @click="delImg(index)"></image>
					<!-- <span class="icon-bin del-btn" @click="delImg(index)"></span> -->
					
					<!-- <view class="del-btn" @click="delImg(index)">×</view> -->

				</view>
				<view class="upload-img" @click="chooseImg" v-if="imgArr.length < 9">
					<!-- <span class="plus"> + </span> -->
					<span class=""></span>
					&nbsp;上传图片
				</view>
			</view>
			
			
			<button class="submit" :disabled="!isLogin" @click="checkSubmit">
				<!-- <span :class="isLogin ? 'icon-upload' : 'icon-ban'"></span> -->
				<image :src="isLogin?'../../static/postitem/post.png':'../../static/postitem/ban.png'" 
				mode="aspectFill"></image>
				<text>{{isLogin ? " 发布" : "请登录后进行操作"}}</text>
			</button>
		</form>
		
		<!-- <button @click="lookDetail">test</button> -->
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
				isLogin: false,
				classify: ["生活用品", "书本", "电子产品", "其它"],
				index: -1,
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
			let url = "../sign/signIn/signIn";
			this.user = this.$getUser();
			this.isLogin = this.$checkLogin(url);
		},
		methods: {
			bindPickerChange(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				console.log(this.index)
				// console.log(this.classify[this.index])
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.districts.length; i++) {
					if (this.districts[i].value === evt.detail.value) {
						this.current = i;
						// console.log(this.current)
						break;
					}
				}
			},
			chooseImg() {
				if (!this.isLogin) {
					return;
				}
				if (this.imgArr.length >= 9) {
					return;
				}
				
				
				// [...this.imgArr, ...res.tempFilePaths] 是扩展运算符的使用，
				// 可以将原来的 this.imgArr 数组和新的 res.tempFilePath 图片吗的本地文件列表
				 // 数组合并成一个新的数组，
				// 然后将其赋值给 this.imgArr。这样做可以避免覆盖 this.imgArr 数组里现有的元素。
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
				if (this.price.trim() && this.title.trim() && this.detail.trim() && this.imgArr.length !== 0 && this.index > -
					1) {
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
				let time = Date.now();
				const res = await myRequest({
					url: "/api/createProductInfo",
					method: "POST",
					data: {
						title: this.title,
						price: this.price,
						detail: this.detail,
						imgArr: this.imgArr,
						id: time,
						ownerId: this.user.user_id,
						classify: this.classify[this.index],
						district: this.current
					}
				})
				if (res.data.status === 0) {
					this.uploadPic(time);
					this.price = "";
					this.title = "";
					this.detail = "";
					this.index = -1;
					// uni.switchTab({
					// 	url: "../shoppingList/shoppingList",
					// 	success() {
					// 		uni.showToast({
					// 			title: "发布成功",
					// 			icon:"success"
					// 		})
					// 	}
					// })
					uni.showToast({
						title: "发布成功",
						icon:"success"
					})
				}
			},
			// 上传文件
			async uploadPic(time) {
				let index = 0
				// 遍历每一项 将他们上传到服务器，为了保证上传顺序，
				// 使用promise对象的方式来控制上传流程
				
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
			lookDetail(){
				console.log(this.imgArr);
			}
		},
	}
</script>

<style scoped lang="scss">
	.createItem {
		$img-size: 200rpx;

		.title {
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
					color: #376fa7;
					font-size: 40rpx;
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
				display: flex;
				flex-direction: column;

				// image{
				// 	width: 50rpx;
				// 	height: 50rpx;
				// 	align-items: center;
					
				// }

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

				// .icon-bin:before {
				// 	content: '\e9ac';
				// 	color: #000000;
				// }

				.pic {
					text-align: center;
					width: 100%;
					height: 230rpx;
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

		.submit {
			margin: 0 50rpx 30rpx;
			// width: 80%;
			height: 100rpx;
			background-color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
			
			image{
				// padding-top: 10rpx;
				width: 36rpx;
				height: 36rpx;
			}
			
			text{
				padding-left: 20rpx;
				font-size: 36rpx;
			}
			
		}

		.uni-radio-input-checked {
			background-color: #000;
			color: #000;
		}

		// .icon-cloud-upload:before {
		// 	content: "\e90e";
		// }

		// .icon-ban:before {
		// 	content: '\e901';
		// }

		// .icon-upload:before {
		// 	content: '\e9c6';
		// }
	}
</style>
