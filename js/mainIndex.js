(function($, owner) {
	
	owner.indexInfo= function(users,state){
		
		$.ajax('http://localhost:8888/index/indexss',{
			data:{
				username: state.account
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			headers:{'Content-Type':'application/json'},	   
			beforeSend: function(request) { 
			            request.setRequestHeader("Authorization", state.token); 
			}, 
			success:function(data){
				// var a = JSON.stringify(data);
				if(data.msg=="OK"){
					
					console.log(data.data);
					console.log(data.data);
					lione.innerText=data.data
					//owner.createState(data.data.user_name,data.data.user_token, callback);
				}else{
					// $.toast(data.msg);
				}
			}
	        }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}(mui, window.mainIndex = {}));