<!-- 暂时不需要了，用uview替代 -->

<template>
	<view class="search-bar">
		<form @submit="searchItem" class="form">
			<input v-model="search" confirm-type="search" class="input" />
			<image src="../../static/searchbar/search.png" mode="scaleToFill" @click="searchItem"></image>
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
				search: ""
			}
		},
		methods: {
			async searchItem() {
				let id = this.$getUser().user_id;
				const res = await myRequest({
					url: "/api/searchItem",
					method: "POST",
					data: {
						text: this.search.trim(),
						id
					},
				})
				this.$emit("searchResult", res.data.message);
			}
		}
	}
</script>

<style scoped lang="scss">
	.search-bar {
		display: flex;
		height: 50px;
		align-items: center;

		.form {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 750rpx;
			
			image{
				padding-left: 20rpx;
				width: 50rpx;
				height: 50rpx;
			}
			.input {
				display: inline-block;
				padding: 0 25rpx;
				height: 65%;
				width: 550rpx;
				border: 1px solid #8a8a8a;
				border-radius: 50rpx;
			}

			.btn {
				display: inline-block;
				vertical-align: bottom;
				line-height: 30px;
				width: 140rpx;
				border: 0;
				font-size: 30rpx;
			}

			.icon-search {
				width: 100rpx;
				height: 100%;
				line-height: 80rpx;
				font-size: 60rpx;
				text-align: center;
				display: inline-block;

				// &:before {
				// 	content: '\e911';
				// }
			}
		}

		&:focus {}
	}
</style>
