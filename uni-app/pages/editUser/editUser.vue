<!-- 用户信息编辑页面 -->

<!-- todo 重构该页面 -->

<template>
	<view class="editUser">
		<rowTextEnter :data="rowTextEnter"></rowTextEnter>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: [],
				rowTextEnter: [{
						text: "手机号",
						righttext: "",
						url: "../changeUser/changeUser?index="
					},
					{
						text: "昵称",
						righttext: "",
						url: "../changeUser/changeUser?index="
					},
					{
						text: "密码",
						righttext: "",
						url: "../changeUser/changeUser?index="
					},
				]
			};
		},

		onLoad(obj) {
			this.user = this.$getUser();
			this.rowTextEnter[0].righttext = this.user.user_name;
			this.rowTextEnter[1].righttext = this.user.user_id;
		}
	}
</script>

<style lang="scss">
	.editUser {}
</style>
