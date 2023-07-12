<template>
	<view>
		<view class="uni-container">
			
			<uni-table ref="table" :loading="loading" border stripe type="none" emptyText="暂无更多数据"
				@selection-change="selectionChange">
				<uni-tr>
					<!-- <uni-th width="150" align="center">姓名</uni-th> -->
					<uni-th align="center" width="10">手机号</uni-th>
					<uni-th align="center" width="150">用户权限</uni-th>
					<uni-th width="200" align="center">设置</uni-th>
				</uni-tr>
				
				<uni-tr v-for="(item, index) in data" :key="index">
					<uni-td align="center">{{ item.user_id }}</uni-td>
					<uni-td align="center">{{ role[item.user_role] }}</uni-td>
					<uni-td align="center">
						<view class="uni-group">
							<button class="uni-button" size="mini" type="default"
								@click="edit(item.user_id)">修改</button>
							<button class="uni-button" size="mini" type="warn" @click="del(item.user_id)">删除</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			
			<view class="uni-pagination-box">
				<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total"
					@change="change" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequest
	} from "@/util/api.js"

	export default {
		data() {
			return {
				role: ["超级管理员", "管理员", "用户"],
				// 每页数据量
				pageSize: 5,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false
			};
		},
		props: {
			data: Array
		},
		onLoad() {
			console.log(this.data)
			this.selectedIndexs = []
		},
		methods: {
			// 分页触发
			change(e) {
				this.selectedIndexs.length = 0
			},
			edit(id) {
				uni.navigateTo({
					url: "../manageEditUser/manageEditUser?id=" + id
				})
				console.log("修改")
			},
			del(id) {
				let _self = this;
				uni.showModal({
					title: "警告",
					content: "是否要删除用户？（此操作不可逆）",
					confirmText: "删除",
					confirmColor: "#ff0000",
					success(res) {
						if (res.confirm == true) {
							console.log(res.confirm)
							_self.delUser(id);
						}
					}
				})
			},
			async delUser(id) {
				let _self = this;
				const res = await myRequest({
					url: "/api/delUser/" + id
				})
				if (res.data.status === 0) {
					uni.showToast({
						title: "删除成功！"
					})
					_self.$emit('refresh');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userList {

		/* #ifndef H5 */
		page {
			padding-top: 85px;
		}

		/* #endif */
		.uni-group {
			display: flex;
			align-items: center;
		}
	}
</style>
