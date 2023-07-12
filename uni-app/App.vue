
<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		onLoad() {

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */

	@import "uview-ui/index.scss";
	// @import "uni_modules/uview-ui/index.scss";

	page {
		background: #f1f1f1;
	}

	/* #ifdef H5 */
	uni-radio .uni-radio-input-checked {
		background: #1b92ff !important;
	}

	/* #endif */

	/* #ifdef MP-WEIXIN */
	wx-radio .wx-radio-input-checked {
		background: #1b92ff !important;
		border-color: #1b92ff !important;
	}

	/* #endif */
</style>
