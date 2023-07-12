<template>
	<view>
		<view class="rowTextEnter" v-for="(item,index) in data" :key="index" @click="gotoPage(item.url, index)">
			<span v-if="item.icon"></span>
			<span class="text">{{item.text}}</span>
			<span class="right-arrow">{{item.righttext || ""}}&nbsp;&nbsp;&gt;</span>
			<!-- 除最后一个，下方加入下划线 -->
			<span v-if="index != data.length - 1">
				<span class="bottom-line-bg"></span>
				<span class="bottom-line"></span>
			</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			data: Array
		},
		methods: {
			gotoPage(url, index) {
				console.log(url);
				if (url == undefined || url == "") {
					return;
				}
				
				
				if (url === "../changeUser/changeUser?index=") {
					url = url + index
				}


				if (url == "signOut") {
					uni.showModal({
						title: "确认退出登录吗？",
						showCancel: true,
						confirmText: "退出",
						confirmColor: "#d50000",
						success(res) {
							// console.log(res)
							if (res.confirm == true) {
								uni.removeStorageSync("user")
								uni.removeStorageSync("isLogin")
								uni.switchTab({
									url: "../index/index"
								})
							}
						}
					})
					return;
				}
				setTimeout(() => {
					uni.navigateTo({
						url
					})
				}, 200)
			}
		}
	}
</script>

<style scoped lang="scss">
	.rowTextEnter {
		padding: 50rpx 40rpx;
		margin-bottom: 1px;
		height: 10rpx;
		line-height: 10rpx;
		position: relative;
		top: 0;
		background: #FFFFFF;

		.right-arrow {
			position: absolute;
			right: 3%;
			text-align: right;
		}

		.bottom-line-bg {
			background: #FFFFFF;
			width: 100%;
			height: 1px;
			position: absolute;
			bottom: -1px;
			left: 50%;
			transform: translate(-50%, 0);
		}

		.bottom-line {
			background: #d2e6fb;
			width: 90%;
			height: 1px;
			position: absolute;
			bottom: -1px;
			left: 50%;
			transform: translate(-50%, 0);
		}

		&:active {
			background: #a9a8b1;
		}
	}
</style>
