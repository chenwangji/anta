	/*
	 * register page:
	 * 
	 * form
	 * 
	 * side bar
	 * 
	 * 
	 */
	
	
	
$(function() {
	
	/*------------------------register check start---------------------------*/
	
	//生成验证码
	//页面一加载即有验证码
	$(".check-code-box").text(createRandomCode());
	//点击改变验证码
	$(".check-code-box").on({
		click:function() {
			$(this).text(createRandomCode());
		}
	})
	
	$(".main-register form input:button").on({
		click:function() {	

			var username = $("form #username").val();

			//判断用户输入的是手机号还是邮箱
			if (/^\d+$/.test(username)) {
				
				//手机号验证
				if (!username.match(/^[1]\d{10}$/)) {
					$(".error-report em,.error-report p:first").show();
					return;
				}
				
			//邮箱验证 数字，字母下划线，以com结尾
			}else if (!username.match(/^\w{3,15}@\w{2,10}\.com$/)) {
				$(".error-report em,.error-report p:first").show();
				return;

			}
			
			$(".error-report em,.error-report p:first").hide();
			
			//验证验证码 --- 无视大小写  ????
			var inputStr = $("#check-code").val();
			var randomCodeStr = $(".check-code-box").text();
			
			
			pattern = new RegExp(randomCodeStr, "gi");
			if (!pattern.test(inputStr)) {
				$(".error-report em,.error-report p:last").show();
				return;
			}
	
			
//			if ($("#check-code").val() != $(".check-code-box").text()) {
//				$(".error-report em,.error-report p:last").show();
//				return;
//			}
//			
			$(".error-report em,.error-report p:last").hide();
			open("login.html");

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

