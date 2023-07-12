<!-- 我发布的求购商品页面 -->
<template>
	<view>
		
		<view class="nowant" v-if="myWantBuy.length === 0">
			暂无求购商品
		</view>
		
		<view class="" v-for="(item,index) in myWantBuy " :key="index">
			
			<wantBuyList :item="item"></wantBuyList>
			<u-button type="warning" size="medium"  @click="deleteMyWantItem(index)">删除</u-button>
			<u-gap height="8" bg-color="#bbb"></u-gap>
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
				myWantBuy: []
			};
		},
		onLoad() {
			let user = this.$getUser();
			let id = user.user_id;
			this.getList(id);
		},

		methods: {
			async getList(id) {
				const res = await myRequest({
					url: "/api/getMyWantBuyList/" + id,
					method: 'POST'
				})
				this.myWantBuy = res.data.message;
				console.log(res.data.message);
			},
			
			async deleteMyWantItem(index) {
				// console.log(index);
				
				
				
				console.log(this.myWantBuy[index].id);
				let delId = this.myWantBuy[index].id;
				const res = await myRequest({
					url: "/api/deleteMyWantBuyItem/" + delId,
					method: "POST"
				})
				console.log("已删除" + res);
				let user = this.$getUser();
				let id = user.user_id;
				this.getList(id);
			}
		}

	}
</script>

<style lang="scss">
	.nowant{
		font-size: 60rpx;
		text-align: center;
		padding-top: 30rpx;
		color: #787;
	}
</style>
