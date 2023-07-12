<template>
	<view class="content">
		<view v-for="(item,index) in wantBuyList" :key="index">
			<wantBuyList :item="item" @click.native="getDetail(index)"></wantBuyList>
		</view>
	</view>
</template>

<script>
	import {
		myRequest
	} from "../../util/api.js"

	export default {
		data() {
			return {
				wantBuyList:[]
			};
		},
		methods: {

			async getAllWantBuyList() {
				const res = await myRequest({
					url: "/api/getWantBuyList/",
					method: "POST"
				})
				this.wantBuyList = res.data.message;
				// console.log("666" + res.data.message[0].wantBuyDetail);
			},
			
			getDetail(index){
				console.log(this.wantBuyList[index].id);
				
				uni.navigateTo({
					url:"/pages/wantBuyDeatil/wantBuyDeatil?id="+this.wantBuyList[index].id,
				})
			}

		},
		onLoad() {
			// console.log('进入全部求购');
			this.getAllWantBuyList();

		}
	}
</script>

<style lang="scss">

</style>
