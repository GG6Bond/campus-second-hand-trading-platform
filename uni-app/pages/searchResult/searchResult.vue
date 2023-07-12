<!-- 搜索结果页面 -->
<template>
	<view class="searchResult">
		<shoppingListItem :data="searchResult"></shoppingListItem>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				shoppingListItem: [],
				user: {},
				isLogin: false,
				searchResult: []
			};
		},

		methods: {},
		onLoad() {
			this.isLogin = this.$checkLogin("", false);
			this.user = this.$getUser();
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptDataFromOpenerPage', (data) => {
				console.log(data)
				this.searchResult = data;
			})
		},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
</style>
