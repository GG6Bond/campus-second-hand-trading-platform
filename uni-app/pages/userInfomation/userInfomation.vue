<!-- tab栏我的页面 -->
<template>
	<view class="userInfomation">
		<!-- 登录显示 顶部头像 昵称 箭头 -->
		<!-- <view class="user" @click="gotoPage('user')" v-if="user"> -->
		<view class="user" @click="editUserInformation" v-if="user">
			<image class="image" src="../../static//userpage/user_H5.jpg" mode="aspectFill"></image>
			<span class="id">{{user.user_name}}</span>
			<span class="right-arrow">&gt;</span>
		</view>
		<!-- 未登录 显示 -->
		<view class="user" v-else>
			<image class="image" src="../../static//userpage/member.png" mode="aspectFill"></image>
			<span class="id">{{"登录后显示"}}</span>
		</view>

		<!-- 登录 并且角色为普通用户，进行相应的跳转 -->
		<view v-if="user && user.user_role === 2" class="first-menu">
			<view class="buyandsell">
				<view class="buy" @click="gotoPage('buy')">
					<!-- <view>{{allData.buy}}</view> -->
					<image src="../../static/userpage/buy.png"></image>
					<view>已购买({{allData.buy}})</view>
				</view>
				<view class="sell" @click="gotoPage('sell')">
					<!-- <view>{{allData.sell}}</view> -->
					<image src="../../static/userpage/sell.png"></image>
					<view>已售出({{allData.sell}})</view>
				</view>
				<view class="follow" @click="gotoPage('follow')">
					<!-- <view>{{allData.follow}}</view> -->
					<image src="../../static/userpage/like.png"></image>
					<view>关注({{allData.follow}})</view>
				</view>
				<view class="history" @click="gotoPage('history')">
					<!-- <view>{{allData.history}}</view> -->
					<image src="../../static/userpage/history.png"></image>
					<view>历史记录({{allData.history}})</view>
				</view>
			</view>
			<rowTextEnter :data="rowTextEnter"></rowTextEnter>
		</view>


		<!-- 角色为超级管理员 -->
		<view class="manager" v-if="user.user_role === 0">
			<rowTextEnter :data="superManager"></rowTextEnter>
		</view>
		<!-- 角色为管理员 -->
		<view class="manager" v-if="user.user_role === 1">
			<rowTextEnter :data="manager"></rowTextEnter>
		</view>
		<!-- 注销 -->
		<view class="sign-out">
			<rowTextEnter :data="signOut" v-if="user"></rowTextEnter>
			<rowTextEnter :data="signIn" v-else></rowTextEnter>
		</view>
		<!-- 普通用户显示 -->
		<view class="info" v-if="user.user_role === 2">
			<rowTextEnter :data="info"></rowTextEnter>
		</view>
		<!-- 通知 ，点击跳转到交易页面-->
		<view class="notice" @click="notice" v-if="user && user.user_role == 2">
			<image src="../../static/userpage/notice.png" mode="aspectFill" class="img"></image>
			<span class="red" v-if="allData.trading != 0">{{allData.trading}}</span>
		</view>

		<!-- <span class="android_red" v-if="allData.trading != 0">{{allData.trading}}</span> -->
		<!-- #ifdef APP-ANDROID -->
		<span class="android_red" v-if="allData.trading != 0">{{allData.trading}}</span>
		<!-- #endif -->
		
		<!-- <span class="android_red" v-if="allData.trading != 0">{{allData.trading}}</span> -->
		
	</view>
</template>

<script>
	import {
		cleanUser,
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				user: {},
				rowTextEnter: [{
						text: "消息(5)",
						url: "../tradingProduct/tradingProduct"
					}, {
						text: "在这里已经赚了：￥123",
						url: "../userHomePage/userHomePage"
					},
					{
						text: "查看我的求购",
						url: "../myWantBuy/myWantBuy"
					}
					// {
					// 	text: "我关注的商品",
					// 	url: "../myFollow/myFollow"
					// }
				],
				// 超级管理员的菜单
				superManager: [{
						text: "全部商品",
						url: "../allProduct/allProduct"
					},
					{
						text: "用户权限修改",
						url: "../manageUser/manageUser"
					},
					{
						text: "公告管理",
						url: "../postNotice/postNotice"
					}
				],
				manager: [{
					text: "全部商品",
					url: "../allProduct/allProduct"
				}],
				signOut: [{
					text: "注销",
					url: "signOut"
				}],
				signIn: [{
					text: "登录",
					url: "../sign/signIn/signIn"
				}],
				// 菜单
				info: [{
						text: "全部公告",
						url: "../notice/notice"
					}, {
						text: "使用规约",
						url: "../about/about"
					}, {
						text: "问题反馈",
						url: "../about/about"
					}
					, {
						text: "关于我们",
						url: "../about/about"
					},
				],
				sellItem: [],
				buyItem: [],
				historyList: [],
				tradingProduct: [],
				myFollow: [],
				allData: {
					"buy": 2,
					"sell": 0,
					"follow": 0,
					"history": 0,
					"trading": 0,
					"price": 0
				}
			}
		},

		methods: {
			
			editUserInformation()
			{
				console.log('点击了头像栏，进入修改用户信息页面');
				uni.navigateTo({
					url:"../editUserInformation/editUserInformation"
				})
			},
			// 进行页面的相应跳转
			gotoPage(page) {
				let url;
				if (page == "buy") {
					url = "../buyItem/buyItem"
				} else if (page == "sell") {
					url = "../sellItem/sellItem"
				} else if (page == "history") {
					url = "../historyList/historyList"
				} else if (page == "user") {
					url = "../editUser/editUser"
				} else if (page == "follow") {
					url = "../myFollow/myFollow"
				}
				uni.navigateTo({
					url
				})
			},
			// 获取用户赚钱总数
			async getUserInfoNum() {
				const res = await myRequest({
					url: "/api/getUserInfoNum/",
					method: "POST",
					data: {
						id: this.user.user_id
					}
				})
				this.allData = res.data.message;
				this.rowTextEnter[0].text = "未读消息 : " + '( ' + this.allData.trading + ' )';
				this.rowTextEnter[1].text = "在这里已经赚了：￥" + this.allData.price;
				// console.log(res)
			},
			notice() {
				uni.navigateTo({
					url: "../tradingProduct/tradingProduct"
				})
			}
		},
		mounted() {

		},
		onShow() {
			// cleanUser();
			this.user = this.$getUser();
			if (this.user && this.user.user_role == 2) {
				this.getUserInfoNum();
			}
		},
		onLoad() {
			// console.log('开启定时器');
			// setTimeout(() => {
			// 	console.log('开启定时器');
			// 	cleanUser();
			// }, 3000)
		}
	}
</script>

<style scoped lang="scss">
	.userInfomation {
		// margin: 30rpx 0;

		.user {
			padding: 30rpx 80rpx;
			height: 200rpx;
			line-height: 200rpx;
			position: relative;
			top: 0;
			font-size: 36rpx;
			background-color: #FFFFFF;

			.right-arrow {
				position: absolute;
				right: 2%;
				text-align: right;
				font-size: 40rpx;
			}

			.id {
				position: absolute;
				left: 40%;
			}

			.image {
				position: absolute;
				top: 50%;
				// right: 20%;
				width: 100rpx;
				height: 100rpx;
				transform: translate(0%, -50%);
			}
		}


		.first-menu {
			margin-top: 40rpx;
		}

		.buyandsell {
			margin: 50rpx 0;
			display: flex;
			text-align: center;

			image {
				width: 80rpx;
				height: 80rpx;
			}

			.buy {
				flex-grow: 1;
			}

			.sell {
				flex-grow: 1;
			}

			.follow {
				flex-grow: 1;
			}

			.history {
				flex-grow: 1;
			}



		}

		.manager {
			margin-top: 50rpx;
		}

		.sign-out {
			margin-top: 50rpx;
		}

		.info {
			margin-top: 50rpx;
		}

		.notice {
			position: absolute;
			top: -64rpx;
			right: 18rpx;

			.img {
				width: 24px;
				height: 24px;
				z-index: 999;
				right: 15rpx;
			}

			.red {
				position: absolute;
				top: -20%;
				right: -25%;
				background-color: #f30004;
				color: #FFFFFF;
				z-index: 999;
				font-size: 12px;
				width: 30rpx;
				height: 30rpx;
				line-height: 30rpx;
				border: 1px solid #f30004;
				border-radius: 100rpx;
				text-align: center;
			}


		}

		.android_red {
			position: absolute;
			top: 38%;
			right: 10%;
			background-color: #f30004;
			color: #FFFFFF;
			z-index: 999;
			font-size: 12px;
			width: 50rpx;
			height: 30rpx;
			line-height: 30rpx;
			border: 1px solid #f30004;
			border-radius: 20rpx;
			text-align: center;
		}
	}
</style>
