<template>
	<view>
		<view class="title">
			{{noticeList[1].notice_title}}
		</view>
		
		<view class="content">
			{{noticeList[1].notice_content}}
		</view>
	</view>
</template>

<script>
	
	import {
		cleanUser,
		myRequest
	} from "@/util/api.js"
	
	export default {
		data() {
			return {
				noticeList:[]
			};
		},
	
		async onLoad(){
			console.log('获取全部公告。。。。。。');
			const res = await myRequest({
				url:'/api/getAllNotice/',
				method:'POST'
			})
			
			this.noticeList = res.data.message;
			// console.log(res.data);
		}
	}
</script>

<style lang="scss">

</style>
