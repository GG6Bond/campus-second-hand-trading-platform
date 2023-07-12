<!-- 发布求购页面 -->
<template>
	<view>
		<u-form :model="form" ref="uForm">

			<u-form-item label="商品名称:" label-position="top" label-width="auto">
				<u-input v-model="form.name" />
			</u-form-item>

			<u-form-item label="详细信息:" label-position="top" label-width="auto">
				<u-input v-model="form.intro" :type="type" :height="height" />
			</u-form-item>

			<u-form-item label="联系邮箱:" label-position="top" label-width="auto">
				<u-input v-model="form.email" />
			</u-form-item>

		</u-form>

		<u-button type="primary" @click="commitWantBuy">发布</u-button>

	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {

				type: 'textarea',
				height: 300,
				autoHeight: true,

				form: {
					name: '',
					intro: '',
					intro2: '',
					email: '',
					user_id: 1,

				},

			}
		},

		methods: {


			async commitWantBuy() {
				console.log('click commit button');
				if (this.form.name == '' || this.form.intro == '') {
					console.log('请输入完整信息');
					uni.showToast({
						title: "请输入完整信息",
						icon: "error"
					});
				} else {
					console.log('商品名称是：' + this.form.name);
					console.log('商品简介是：' + this.form.intro);
					console.log('联系邮箱是：' + this.form.email);


					let id = this.$getUser().user_id;
					this.form.user_id = id;
					console.log(this.form.user_id);


					const res = await myRequest({
						url: "/api/postWantBuy/",
						method: 'POST',
						data: this.form,
					});

					console.log(res);

					if (res.data.status == 0) {
						uni.showToast({
							title: "发布成功",
							icon: "success"
						});

						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);

					}
				}

			}
		}
	}
</script>


<style lang="scss">
	* {
		padding: 20rpx;
	}


</style>
