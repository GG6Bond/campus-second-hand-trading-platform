function verifyPhone(number) {

	console.log('验证手机号码中');

	const regexNum = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])d{8}$/;

	if (regexNum.test(number)) {
		console.log('手机号格式正确');
		return true;
	} else {
		console.log('手机号格式错误');
		return false;
	}

}


function verifyEmail(email) {

	console.log('验证邮箱中');

	const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

	if (regex.test(email)) {
		console.log('邮箱格式正确');
		return true;
	} else {
		console.log('邮箱格式不正确');
		return false;
	}

}

module.exports = {
	verifyPhone,
	verifyEmail
}
