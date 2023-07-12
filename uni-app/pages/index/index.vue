<!-- 首页 -->
<template>
	<!-- 普通用户 和 管理员 分别显示 -->
	<view class="">

		<view class="user" v-if="user && user.user_role === 2">
			<view class="content">
				<view class="sign" v-if="!isLogin">
					<button class="sign-in" @click="gotoPage('signIn')">去登录</button>
				</view>

				<!-- 轮播图 -->
				<!-- 标签里面不能用插值语法 -->
				<swiper class="swiper" :indicator-dots="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in scrollData" :key="item.pic_id">
						<view class="swiper-item" @click="getInfo(item.pic_url)">
							<image :src="baseUrl+item.image" mode="scaleToFill"></image>
						</view>
					</swiper-item>
				</swiper>


				<view class="hint">
					在本平台发布商品请遵守相关法律法规，严禁发布违法信息。
				</view>


				<view class="nav">
					<view class="nav-item" v-for="(item,index) in navData" :key="index" @click="gotoClassify(index)">
						<!-- <view class="icon" :class="item.class"></view> -->
						<image :src="item.img_url" mode=""></image>
						<!-- <text>{{item.text}}</text> -->
						<text>{{item.text}}</text>
					</view>
				</view>

				<view class="today">
					<view class="today_head">
						<view class="title">
							推荐商品：
						</view>

						<view class="allToday" @click="loolAll">
							点击查看全部>
						</view>
					</view>

					<scroll-view scroll-x="true" class="scroll-box">
						<shoppingListItemUpDown :data="todayList"></shoppingListItemUpDown>
					</scroll-view>
				</view>

				<!-- 		<view class="today">
					<view class="title">
						推荐商品：
					</view>
					<scroll-view scroll-x="true" class="scroll-box">
						<shoppingListItemUpDown :data="todayList"></shoppingListItemUpDown>
					</scroll-view>
				</view> -->


				<view class="want">

					<view class="want_head">
						<view class="title">
							求购商品：
						</view>

						<view class="allWantBuyList" @click="lookAllWantBuy">
							点击查看全部>
						</view>
					</view>
					<view class="" v-for="(item,index) in wantBuyList.slice(0,5) " :key="index">
						<wantBuyList :item="item" @click.native="lookDetail(index)"></wantBuyList>
					</view>


				</view>


				<view class="login">
					<!-- <wx-login></wx-login> -->
				</view>


				<!-- <button @click="testPage">测试按钮</button> -->
			</view>
		</view>

		<view class="admin" v-if="user && user.user_role === 0">
			<view class="content">

				<view class="sign" v-if="!isLogin">
					<button class="sign-in" @click="gotoPage('signIn')">去登录</button>
				</view>

				<view class="notice">
					<view class="title">
						公告管理：
					</view>

					<view class="btn">
						<button class="btn1" @click="postNotice">发布公告</button>
						<button class="btn2" @click="lookNotice">查看公告</button>
					</view>
				</view>


				<view class="user">
					<view class="title">
						用户管理：
					</view>
				
					<view class="btn">
						<button class="btn1" @click="manageUser()">用户管理</button>
					</view>
				</view>
				
				<view class="good">
					<view class="title">
						商品管理：
					</view>
				
					<view class="btn">
						<button class="btn1" @click="manageGoods()">商品管理</button>
					</view>
				</view>

				<view class="want">
					<view class="want_head">
						<view class="title">
							求购商品：
						</view>

						<view class="allWantBuyList">
							点击查看全部>
						</view>
					</view>
					<view class="" v-for="(item,index) in wantBuyList.slice(0,5) " :key="index">
						<wantBuyList :item="item" @click.native="lookDetail(index)"></wantBuyList>
					</view>
				</view>
			</view>
		</view>

		<view class="user" v-if="!user">
			<view class="content">
				<view class="sign" v-if="!isLogin">
					<button class="sign-in" @click="gotoPage('signIn')">去登录</button>
				</view>

				<!-- 轮播图 -->
				<!-- 标签里面不能用插值语法 -->
				<swiper class="swiper" :indicator-dots="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in scrollData" :key="item.pic_id">
						<view class="swiper-item" @click="getInfo(item.pic_url)">
							<image :src="baseUrl+item.image" mode="scaleToFill"></image>
						</view>
					</swiper-item>
				</swiper>



				<view class="hint">
					在本平台发布商品请遵守相关法律法规，严禁发布违法信息。
				</view>


				<view class="nav">
					<view class="nav-item" v-for="(item,index) in navData" :key="index" @click="gotoClassify(index)">
						<!-- <view class="icon" :class="item.class"></view> -->
						<image :src="item.img_url" mode=""></image>
						<!-- <text>{{item.text}}</text> -->
						<text>{{item.text}}</text>
					</view>
				</view>

				<view class="today">
					<view class="today_head">
						<view class="title">
							推荐商品：
						</view>

						<view class="allToday" @click="loolAll">
							点击查看全部>
						</view>
					</view>

					<scroll-view scroll-x="true" class="scroll-box">
						<shoppingListItemUpDown :data="todayList"></shoppingListItemUpDown>
					</scroll-view>
				</view>


				<view class="want">

					<view class="want_head">
						<view class="title">
							求购商品：
						</view>

						<view class="allWantBuyList">
							点击查看全部>
						</view>
					</view>
					<view class="" v-for="(item,index) in wantBuyList.slice(0,5) " :key="index">
						<wantBuyList :item="item" @click.native="lookDetail(index)"></wantBuyList>
					</view>


				</view>


				<!-- <button @click="testPage">测试按钮</button> -->
			</view>
		</view>


	</view>






</template>

<script>
	import {
		cleanUser,
		myRequest
	} from "@/util/api.js"
	import wantBuyDeatilVue from "../wantBuyDeatil/wantBuyDeatil.vue";

	export default {
		data() {
			return {
				title: '校园二手交易平台',
				baseUrl: '',
				isLogin: false,
				show: true,
				shoppingListItem: [],
				user: {},
				todayList: [],
				wantBuyList: [],
				searchData: [],
				scrollData: [],

				list3: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],

				navData: [{
						img_url: '../../static/indexpage/life.png',
						text: "生活用品"
					},
					{
						img_url: '../../static/indexpage/book.png',
						text: "书本"
					},
					{
						img_url: '../../static/indexpage/phone.png',
						text: "电子产品"
					},
					{
						img_url: '../../static/indexpage/etc.png',
						text: "其他"
					}
				]
			}
		},
		onShow() {
			let url = "../sign/signIn/signIn"
			this.isLogin = this.$checkLogin(url, false);
			this.user = this.$getUser();
			this.getSwiper();
			this.getProductList();
			this.getWantBuyList();

		},
		methods: {
			manageGoods()
			{
				// uni.navigateTo({
				// 	url:"/pages/allProduct/allProduct"
				// })
				uni.switchTab({
					url:"/pages/shoppingList/shoppingList"
				})
			},
			manageUser()
			{
				uni.navigateTo({
					url:"/pages/manageUser/manageUser"
				})
			},

			postNotice() {
				uni.navigateTo({
					url: "/pages/postNotice/postNotice"
				})
			},

			lookNotice() {
				uni.navigateTo({
					url: "/pages/editNotice/editNotice"
				})
			},

			gotoPage(sign) {
				let url = "../sign/" + sign + "/" + sign
				uni.navigateTo({
					url
				})
			},
			async getProductList() {
				const res = await myRequest({
					url: "/api/getProductList/" + this.user.user_id
				})
				this.shoppingListItem = res.data.message;
				this.getToday();
				// console.log(this.shoppingListItem)
			},
			// 获取今天发布的商品
			getToday() {
				let now = new Date;
				// console.log(new Date(parseInt(now)))
				let mon = now.getMonth();
				let day = now.getDate();
				let todayList = [];
				for (let i of this.shoppingListItem) {
					let date = new Date(parseInt(i.product_id))
					if (date.getMonth() === mon && date.getDate() === day) {
						todayList.push(i)
					}
				}
				this.todayList = todayList;
			},
			getResult(data) {
				let _self = this;
				this.searchData = data;
				uni.navigateTo({
					url: "../searchResult/searchResult",
					success(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', _self.searchData)
					}
				})
			},
			gotoClassify(index) {
				uni.navigateTo({
					url: "../itemClassify/itemClassify?classify=" + this.navData[index].text
				})
				// console.log(index)
			},
			async getSwiper() {
				const res = await myRequest({
					url: "/api/getSwiper/",
					method: 'POST'
				})
				// console.log(res.data.message);
				// console.log(res.data.message[0].pic_url);
				this.scrollData = res.data.message;
				console.log(this.scrollData);
			},

			loolAll() {
				uni.switchTab({
					url: "/pages/shoppingList/shoppingList"
				})
			},
			lookAllWantBuy()
			{
				console.log('点击了！！！');
				uni.navigateTo({
					url:'/pages/allWantBuy/allWantBuy'
				})
			},


			async getWantBuyList() {
				const res = await myRequest({
					url: "/api/getWantBuyList/",
					method: 'POST'
				})

				console.log(res.data.message);

				this.wantBuyList = res.data.message;

				console.log(this.wantBuyList);


			},

			getInfo(item) {
				console.log(item);
			},

			lookDetail(index) {
				console.log(index);
				uni.navigateTo({
					url: `/pages/wantBuyDeatil/wantBuyDeatil?id=${this.wantBuyList[index].id}`
				})
			},

			testPage() {
				console.log("click test button !!!");
				uni.navigateTo({
					url: '/pages/testPage/testPage'
				})
				console.log("click test button222 !!!");
			}
		},
		mounted() {
			this.baseUrl = this.$baseUrl;
		}
	}
</script>

<style scoped lang="scss">
	.content {
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;

		.notice {
			display: flex;
			flex-direction: column;


			.title {
				padding: 30rpx;
				font-size: 60rpx;

			}

			.btn {
				display: flex;
				justify-content: space-around;

				.btn1 {
					width: 300rpx;
					height: 100rpx;
					background-color: #cccccc;
				}

				.btn2 {
					width: 300rpx;
					height: 100rpx;
					background-color: #cccccc;
				}
			}


		}

		.user{
			.title {
				padding: 30rpx;
				font-size: 60rpx;
			}
			.btn1{
				background-color: #cccccc;
				height: 100rpx;
				width: 90%;
			}
		}
		
		
		.good{
			.title {
				padding: 30rpx;
				font-size: 60rpx;
			}
			.btn1{
				background-color: #cccccc;
				height: 100rpx;
				width: 90%;
			}
		}
		
		.today {
			width: 100%;
			padding: 30rpx 10rpx;

			.today_head {
				display: flex;
				justify-content: space-between;

				.title {
					padding: 30rpx;
					font-size: 60rpx;
					text-align: start;
				}

				.allToday {
					padding-right: 10rpx;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					padding-bottom: 40rpx;
					color: #1b92ff;
				}
			}
		}

		.want {
			width: 100%;
			padding: 30rpx 10rpx;

			.want_head {
				display: flex;
				justify-content: space-between;

				.title {
					padding: 30rpx;
					font-size: 60rpx;
					text-align: start;
				}

				.allWantBuyList {
					padding-right: 10rpx;
					
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					padding-bottom: 40rpx;
					color: #1b92ff;
				}
			}

		}

		.logo {
			height: 200rpx;
			width: 200rpx;
			margin-top: 200rpx;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 50rpx;
		}

		.swiper {
			border: #1b92ff;
			width: 100%;
			height: 200px;

			// height: 100%;
			image {
				// border: 10px solid red;
				width: 100%;
				// height: 100%;
			}
		}

		.hint {
			color: #939393;
			padding: 20rpx;
			line-height: 30px;
		}

		.nav {
			width: 100%;
			display: flex;
			text-align: center;
			height: 100rpx;
			align-items: center;
			padding-top: 50rpx;
			// flex-wrap: wrap;



			.nav-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				width: 25%;

				image {
					width: 80rpx;
					height: 80rpx;
				}



				text {
					display: inline-block;
					padding-top: 10rpx;
				}

			}
		}

		.scroll-box {
			white-space: nowrap;
		}

		.sign {
			position: fixed;
			// bottom: var(--window-bottom);
			bottom: 60px;
			width: 100%;
			// background-color: #FFFFFF;
			flex-direction: column-reverse;
			z-index: 999;

			.sign-in {
				width: 60%;
				right: 0;
				border: 0px;
				background-color: #1b92ff;
				color: #FFFFFF;
				border-radius: 50px;
			}
		}
	}
</style>
