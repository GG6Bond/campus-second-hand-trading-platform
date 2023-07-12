<template>

	<view class="">
<!-- 		<view>
			<button @click="getAllNotice">获取全部公告</button>
		</view> -->

		<uni-table border stripe emptyText="暂无更多数据">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">序号</uni-th>
				<uni-th align="center">标题</uni-th>
				<uni-th align="center">内容</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(item,index) in noticeArr" :key=index @click.native="getNoticeDetail(index)">
				<uni-td>{{index+1}}</uni-td>
				<uni-td>{{item.notice_title}}</uni-td>
				<uni-td>{{item.notice_content}}</uni-td>
			</uni-tr>


		</uni-table>

	</view>

</template>

<script>
	import {
		myRequest
	} from "../../util/api.js"
	export default {
		data() {
			return {
				noticeArr: []
			};
		},
		onShow() {
			this.getAllNotice();
		},
		methods: {
			async getAllNotice() {
				const res = await myRequest({
					url: '/api/getAllNotice/',
					method: "POST"
				})
				console.log(res.data.message);
				this.noticeArr = res.data.message;
			},


			getNoticeDetail(e) {
				console.log(e);
				uni.navigateTo({
					url:`/pages/editNoticeDetail/editNoticeDetail?id=${this.noticeArr[e].notice_id}`
					
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
