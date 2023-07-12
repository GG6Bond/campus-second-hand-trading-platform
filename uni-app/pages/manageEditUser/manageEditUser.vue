<!-- 管理员修改用户信息 -->
<template>
	<view class="manageEditUser">
		
		<view class="name row">
			<label for="name">用户名</label>
			<input id="name" type="text" v-model="name" />
		</view>
		
		<view class="id row">
			<label for="id">手机号</label>
			<input id="name" type="text" v-model="id" />
		</view>
		
		<view class="password row">
			<label for="password">密码</label>
			<input id="password" type="password" v-model="password" />
		</view>
		
		<view class="role row">
			<label for="role">用户类型</label>
			<picker mode="selector" :range="role" @change="bindPickerChange">
				<view>{{role[index]}}</view>
			</picker>
		</view>
		
		<button class="btn" @click="submitUser">提交</button>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				id: -1,
				user: {},
				role: ["超级管理员", "管理员", "用户"],
				index: 0,
				name: "",
				password: "",
			};
		},
		onLoad(obj) {
			this.id = obj.id;
			this.getUserDetail();
		},
		methods: {
			bindPickerChange(e) {
				this.index = e.target.value
			},
			async getUserDetail() {
				const res = await myRequest({
					url: "/api/getUserDetail/" + this.id
				})
				this.user = res.data.message[0];
				console.log(this.user);
				this.name = this.user.user_name;
				this.id = this.user.user_id;
				this.password = this.user.user_password;
				this.index = this.user.user_role;
			},
			async submitUser() {
				const _self = this;
				const res = await myRequest({
					url: "/api/editUser/",
					method: "POST",
					data: {
						id: _self.id,
						name: _self.name,
						password: _self.password,
						role: _self.index,
						preId: _self.user.user_id
					}
				})
				if (res.data.status === 0) {
					uni.showToast({
						title: "修改成功！",
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				} else {
					uni.showToast({
						title: "修改失败！"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.manageEditUser {

		.row {
			position: relative;
			top: 0;
			display: flex;
			align-items: center;
			height: 100rpx;
			width: 100%;
			background-color: #FFFFFF;
			margin-top: 1px;

			label {
				width: 30%;
				padding: 60rpx;
			}

			input {
				width: 60%;
			}

			picker {
				width: 60%;
			}
		}

		.btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #1b92ff;
			color: #FFFFFF;
			border-radius: 0px;
		}

	}
</style>
