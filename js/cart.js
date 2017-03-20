/*
 * 
 * cart 
 * 
 * 1. 添加收藏地址
 * 
 */


$(function() {
	
	//---------------------header address start----------------------
	//1. 地址列表之间的切换
	$(".address-box .address-list > li").on({
		click:function() {
			$(".address-box .address-list > li .change-btn").hide();
			$(this).find(".change-btn").slideDown();
			$(this).siblings().removeClass("select");
			$(this).addClass("select");
		}
	});
	
	$(".address-box .address-list > li").find(".default-btn").on({
		click:function() {
			$(".default-btn").removeClass("already-default-btn").addClass("set-default-btn").text("设为默认");	
			$(this).addClass("already-default-btn").removeClass("set-default-btn").text("默认地址");
		}
	});
	
	
	//2. 点击增加新地址按钮显示地址列表和输入框
	$(".address-box button").on({
		click:function() {
			//显示输入框
			$(".add-adress").show();
			$(".address-box .save-btn > a").hide();
			$(".address-box .save-btn .save").show();

		}
	});
	
	//3. 增加/修改收货地址 (验证)
	$(".address-box .save-btn .save").on({
		click:function() {
			//检测输入
			checkInput(function() {
				//输入到地址列表中
				outPutToAddressList();
				
				//添加成功隐藏输入框
				$(".add-adress").slideUp();


			});
			
		}
	});
	
	
	
	
	//4. 修改收货地址
	//点击修改按钮，将要修改的li的内容转到输入框中
	$(".address-list .change-btn").on({
		click:function() {
			//显示输入框
			$(".add-adress").show();
			
			$(".address-box .save-btn > a").hide();
			$(".address-box .save-btn .change").show();
			changeAddress($(this));
		}
	});
	

	//修改 ， 反回来修改li中的内容
	$(".address-box .save-btn .change").on({
		click:function() {
			checkInput(function() {
				//提交到裂列表
				changeNode($(".address-list .select > .change-btn")); //-----------将选中的Li的子节点传进去
				//添加成功隐藏输入框
				$(".add-adress").slideUp();
			});
		}
	});
	
	
	//5. 地址管理
	$(".address-manage > a").toggle(
		function() {
//			console.log(111)
			$(".address-box .address-list > li > .delete-btn").fadeIn();
			$(this).text("[取消删除]");		
		},
		function() {
			$(".address-box .address-list > li > .delete-btn").fadeOut();
			$(this).text("[删除收货地址]");
		}
	);
	$(".address-box .address-list > li > .delete-btn").on({
		click:function() {
			$(this).parent().remove();
		}
	});
	
	
		//---------------------封装方法区---------------------------
		//验证输入是否合法的方法
		function checkInput(callBack) {
			//收货人不能为空
			if (!$(".personal .username").val()) {

				$(".personal").addClass("check-wrong");
				return;
			}
			$(".personal").removeClass("check-wrong");
			//手机号码和固定号码二选一，且符合格式
			if (!$(".contact-phone .mobile-phone").val() && !$(".contact-phone .telephone").val()) {
			
				$(".address-box .add-adress > div").removeClass("check-wrong");
				$(".contact-phone").addClass("check-wrong");
				return;
			}
			$(".contact-phone").removeClass("check-wrong");
			
			if (!$(".contact-phone .telephone").val() && !$(".contact-phone .mobile-phone").val().match(/^\d{11}$/)) {
				
				$(".address-box .add-adress > div").removeClass("check-wrong");
				$(".contact-phone").addClass("check-wrong");
				return;
			}
			if (!$(".contact-phone .mobile-phone").val() && !$(".contact-phone .telephone").val().match(/^\d{7,8}$/)) {
				$(".address-box .add-adress > div").removeClass("check-wrong");
				$(".contact-phone").addClass("check-wrong");
				return;
			}
			$(".contact-phone").removeClass("check-wrong");
			
			//select 验证
			console.log()
			if ($(".choose-province option:selected").text() == "-请选择/省份-" || $(".choose-city option:selected").text() == "-请选择/市-" || $(".choose-district option:selected").text() == "-请选择/县、区-") {
				$(".location").addClass("check-wrong");
				return;
			}
			$(".location").removeClass("check-wrong");
			
			//详细地址验证
			if(!$(".detail-address > input").val()) {
				$(".detail-address").addClass("check-wrong");
				return;
			}
			$(".detail-address").removeClass("check-wrong");
			
			//回调函数加入DOM
			callBack();
		}
		
		
		//将输入框的内容输出到地址列表中的方法
		function outPutToAddressList() {
			
			//全部验证通过添加地址到DOM中-------------没有后台数据库，直接添加到DOM中
			//用clone()方法
			var $cloneLiNode = $(".address-box .address-list > li:first-child").clone(true,true).appendTo($(".address-box .address-list"));
			
			changeNode($cloneLiNode.find(".phone")); //将任意一个后代元素传进去

		}
		
		
		//修改地址列表----------要以回调函数的形式异步调用
		function changeAddress($obj) {
			
			
			
			//将地址列表的内容返回到输入框中
			//一直选中的内容选择选中option
			$(".choose-province option").each(function() {
				if ($(this).text() == $obj.parents("li").find(".province").text()) {
					$(this).prop("selected", true);
				}
			});
			$(".choose-city option").each(function() {
				if ($(this).text() == $obj.parents("li").find(".city").text()) {
					$(this).prop("selected", true);
				}
			});
			$(".choose-district option").each(function() {
				if ($(this).text() == $obj.parents("li").find(".district").text()) {
					$(this).prop("selected", true);
				}
			});
			
			$(".detail-address > input").val($obj.parents("li").find(".street").text());
			$(".personal .username").val($obj.parents("li").find(".customer b").text());
			
			if ($obj.parents("li").find(".phone").text().length == 11) {
				$(".contact-phone .mobile-phone").val($obj.parents("li").find(".phone").text());
			}else {
				$(".contact-phone .telephone").val($obj.parents("li").find(".phone").text());
			}
			

			
		}
		
		function changeNode($obj) {

			$obj.parents("li").find(".province").text($(".choose-province option:selected").text());
			$obj.parents("li").find(".city").text($(".choose-city option:selected").text());
			$obj.parents("li").find(".district").text($(".choose-district option:selected").text());
			$obj.parents("li").find(".street").text($(".detail-address > input").val());
			
			$obj.parents("li").find(".customer b").text($(".personal .username").val());
			
			if ($(".contact-phone .mobile-phone").val()) {
				$obj.parents("li").find(".phone").text($(".contact-phone .mobile-phone").val());	
			}else {
				$obj.parents("li").find(".phone").text($(".contact-phone .telephone").val());		
			}
			
			//当前添加的节点设为选中
			$(".address-box .address-list > li").removeClass("select");
			$obj.parents("li").addClass("select");

		}

		
		
	
	//---------------------header address end----------------------
	
	//-----------------------cart start---------------------
	/*
	 * 商品的数量,cookie,checkedbox，积分，商品的总价，折扣价格联动
	 * 
	 */
	
	
	//如果cookie中保存的商品不为空则，显示购物车
	for (var i = 0; i < 3; i++) {
		if ($.cookie("pro-title" + i)) {
			$(".empty-cart").hide();
			$(".cart table").show();

			//拼接节点,加入dom
			createProList(i);
		}

	}

	//多选款的正反选
	$("#wrap-cart #toggle-checkbox").toggle(
		function() {
			$("#wrap-cart :checkbox").each(function() {  //js写法
				this.removeAttribute("checked");
			});
//			$("#wrap-cart :checkbox").removeAttr("checked"); //jq写法
		},
		function() {
			$("#wrap-cart :checkbox").each(function() {
				this.setAttribute("checked","checked");
			});
//			$("#wrap-cart :checkbox").attr("checked","ture");
		}
	); 
	
	
	//增减商品数量
	$(".product-line").each(function() {
			$(this).find(".pro-ammount .quantity-box b:last-child").on({
				click:function() {
					var originalAmmount = parseInt($(this).siblings("input").val());

					$(this).siblings("input").val(originalAmmount + 1);
					//cookie也要变
					console.log($(this));
					$.cookie("pro-ammount" + ColorIndex($(this)), $(this).siblings("input").val());
				}
			});
			
			$(this).find(".pro-ammount .quantity-box b:first-child").on({
				click:function() {
					var originalAmmount = parseInt($(this).siblings("input").val());

					$(this).siblings("input").val(originalAmmount - 1);
					//cookie也要变					
					$.cookie("pro-ammount" + ColorIndex($(this)), $(this).siblings("input").val());
					
					//个数小于1删除该商品和cookie
					if (parseInt($(this).siblings("input").val()) < 1) {
						$(this).parents("tr").remove();
						
						//删除cookie
						$.removeCookie("pro-ammount" + ColorIndex($(this)));
						
						//如果没有商品行,
						
						if (!$(this).parents("tbody").find(".product-line")) {
							hideTable();
						}
					}

				}
			});
	});


/* ---------------------封装函数区------------------------*/
	
	//创建节点的办法
	function createProList(num) {

		var $checkBoxNode = $("<td></td>").append($("<input type='checkbox' checked/>"));
		
		var $proNumberNode = $("<td></td>").text($.cookie("pro-style-number" + num));
		
		var $proImgNode = $("<td class='pro-img'></td>").append($("<a href='javascript:;'></a>").append($("<img />").attr("src", $.cookie("pro-img" + num))));
		
		var $proInfoh2Node = $("<h2></h2>").append($("<a href='javascript:;'></a>").text($.cookie("pro-title" + num)));
		var $proInfoPNode = $("<p class='more-detail'></p>").text("颜色:" + $.cookie("pro-color" +num) + " 尺码: " + $.cookie("pro-size" + num));
		var $proInfo = $("<td class='pro-info'></td>").append($proInfoh2Node).append($proInfoPNode);
		
		var $singlePriceNode = $("<td class='single-price'></td>").append($("<p></p>").text($.cookie("pro-tag-price" + num))).append($("<p></p>").text($.cookie("pro-price" + num)))
		
		var $ammountInputNode = $("<input type='text'/>").val($.cookie("pro-ammount" + num));
		var $ammountMinusNode = $("<b></b>").text("-");
		var $ammountPlusNode = $("<b></b>").text("+");
		var $ammountDivNode = $("<div class='quantity-box'></div>").append($ammountMinusNode).append($ammountInputNode).append($ammountPlusNode);
		var $proAmmountNode = $("<td class='pro-ammount'></td>").append($ammountDivNode);
		
		var $deleteNode = $("<td class='delete'></td>").append($("<a href='javascript:;'></a>").text("删除"));
		
		var $proScoreNode = $("<td></td>").text(parseInt($.cookie("pro-price" + num)));
		
		var $trNode = $("<tr class='product-line'></tr>").append($checkBoxNode).append($proNumberNode).append($proImgNode).append($proInfo).append($singlePriceNode).append($proAmmountNode).append($proScoreNode).append($deleteNode);
		
		$trNode.prependTo("tbody");
		
	} 
	
	
	//判断是哪一个颜色的鞋子的方法
	function ColorIndex($obj) {
		console.log($obj)
		var color = $obj.parents("tr").find(".more-detail").text().substr(3,2); 
		if (color == "酱紫") {
			return 0;
		}else if (color == "咖玛") {
			return 1;
		}else {
			return 2;
		}
	}
	
	
	//没有商品行，则隐藏table,显示empty-cart
	function hideTable() {
		$("table").slideUp();
		$(".empty-cart").slideDown();
	}
	
	
	//删除cookie 
	function deleteCookie(proIndex) {
		$.cookie("pro-img" + proIndex);
		$.cookie("pro-title" + proIndex);
	}
	//-----------------------cart end---------------------
	
	
});