/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		
		$.ajax('http://192.168.1.7:8888/login/userlogin',{
			data:{
				username: loginInfo.account,
				userpassword: loginInfo.password
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			headers:{'Content-Type':'application/json'},	              
			success:function(data){
				// var a = JSON.stringify(data);
				if(data.msg=="OK"){
					owner.createState(data.data.user_name,data.data.user_token, callback);
				}else{
					// $.toast(data.msg);
				}
				
				
				// console.log(a);
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				console.log(type);
			}
		});
		
		// var users = JSON.parse(localStorage.getItem('$users') || '[]');
		// var authed = users.some(function(user) {
		// 	return loginInfo.account =='admin' && loginInfo.password == 'admin';
		// });
		// if (authed) {
		// 	return owner.createState(loginInfo.account, callback);
		// } else {
		// 	return callback('用户名或密码错误');
		// }

		
	};

	owner.createState = function(name,token, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = token;
		console.log(token);
		owner.setState(state);
		return callback();
	};


	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};


	
}(mui, window.app = {}));