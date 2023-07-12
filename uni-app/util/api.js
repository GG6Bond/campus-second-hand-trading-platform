// 发送请求

export const BASE_URL = "http://127.0.0.1:9001";

// export const BASE_URL = "http://39.101.122.139:9001";

export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || "GET",
			data: options.data || {},
			success: (res) => {
				console.log(options.url, res)
				resolve(res);
			},
			fail: (err) => {
				uni.showToast({
					title: "请求出错，请检查网络",
					icon: "error"
				})
				reject(err);
			}
		})
	})
}




// 检查是否登录
export const checkLogin = (url, show) => {
	let flag = uni.getStorageSync("isLogin");
	if (show == undefined || show == null) {
		show = show || true;
	}
	if (!flag && show) {
		uni.showModal({
			title: "提示",
			content: "您还未登录，是否前往登录？",
			showCancel: true,
			confirmText: "登录",
			success(res) {
				// console.log(res)
				if (res.confirm == true) {
					uni.navigateTo({
						url
					})
					flag = true;
				} else {}
			}
		})
	}
	return flag;
}

// 获取用户名
export const getUser = () => {
	let obj = uni.getStorageSync("user");
	return obj;
}

// 退出登录，删除用户
export const cleanUser = () => {
	uni.removeStorageSync("user")
	uni.removeStorageSync("isLogin")
	uni.switchTab({
		url: "../index/index"
	})
}
