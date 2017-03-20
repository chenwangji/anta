	/*
	 * login page:
	 * 
	 * form
	 * 
	 * side bar
	 * 
	 * 
	 */
	
	
	
$(function() {
	
	/*------------------------login check start---------------------------*/
	
	//如果cookie保存了账号密码，则加载
	if ($.cookie("username") && $.cookie("password")) {
		$("form #username").val($.cookie("username"));
		$("#check-code").val($.cookie("password"));
	}
	
	$(".main-register form input:button").on({
		click:function() {	

			var username = $("form #username").val();
			var password = $("#check-code").val();

			if (!username) {
				$(".error-report em,.error-report p:first").show();
				return;
			}
			$(".error-report em,.error-report p:first").hide();
			//判断用户输入的是手机号还是邮箱
			if (/^\d+$/.test(username)) {
				
				//手机号验证
				if (!username.match(/^[1]\d{10}$/)) {
					$(".error-report em,.error-report p:last").show();
					return;
				}
			$(".error-report em,.error-report p:last").hide();
			//邮箱验证 数字，字母下划线，以com结尾
			}else if (!username.match(/^\w{3,15}@\w{2,10}\.com$/)) {
				$(".error-report em,.error-report p:last").show();
				return;

			}
			
			$(".error-report em,.error-report p:last").hide();
			
			if (!password) {
				$(".error-report em,.error-report p").eq(1).show();
				return;
			}
			$(".error-report em,.error-report p").eq(1).hide();
			
			//模拟密码 1111111
			if (password != "1111111") {
				$(".error-report em,.error-report p:last").show();	
				return;
			}
			$(".error-report em,.error-report p:last").hide();

			//保存cookie -- 10天免登录
			$.cookie("username", username, {expires:10});
			$.cookie("password", password, {expires:10});
			
			open("index.html");
		}
	});
	
	
	
//	----------------------------------------
	//封装函数
	function createRandomCode() {
		var randomCodeArr = [];
		//数字字母一样的出现概率
		
		//随机数字		
		for (var i = 0; i < 4; i++) {
			var randomNum = parseInt(Math.random() * 10);
			var randomLetter = String.fromCharCode(parseInt(Math.random() * 26 + 65));
			var randomChance = Math.random();
			if (Math.random() < 0.5) {
				randomCodeArr.push(randomNum);
			}else {
				randomCodeArr.push(randomLetter);			
			}
		}
		
		var randomCode = randomCodeArr.join("");
		return randomCode;
	}
	/*------------------------register check end---------------------------*/
	
	
	/*-----------------------bottom button start--------------------------*/
	$("#bottom-button .service-number").on({
		mouseenter:function() {
			$(this).children("span").fadeIn("fast");
		},
		mouseleave:function() {
			$(this).children("span").fadeOut("fast");

		}
	});
	
	$(document).scroll(function() {
		
		if ($(this).scrollTop() > 250) {

			$("#bottom-button .back-to-top").slideDown();
		}else {
			$("#bottom-button .back-to-top").slideUp();
		}
	});	
	
	
	$("#bottom-button .back-to-top").on({
		click:function() {
			$(document.body).animate({
				scrollTop:0
			})
		}
	})
	/*-----------------------bottom button end--------------------------*/
	
})

