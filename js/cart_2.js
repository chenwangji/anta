/*
 * 
 * cart 
 * 
 * 1. 添加收藏地址
 * 2. 购物车
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
		
		
		//修改地址列表的方法
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
	 * 每次到详情页添加商品前记得刷新浏览器，不然改变的cookie在另一页不会实时更改
	 * 
	 */
	
	
	//如果cookie中保存的商品不为空则，显示购物车
	if (JSON.parse($.cookie("product")).length) {
		var cookieObjArr = JSON.parse($.cookie("product"));	
		$(".empty-cart").hide();
		$(".cart table").show();
	}

	
	for (var i in cookieObjArr) {
		
		//获取页面上商品节点对象，用于比较
		var originalObjArr = [];
		
		$(".more-detail").each(function() {
			var originalObj = {
				proColor:$(this).find(".color").text(),
				proSize:$(this).find(".size").text(),
				proAmmount:$(this).parents("tr").find(".pro-ammount input").val()
			};
			originalObjArr.push(originalObj);
		});
		
		var flag = true;
			
		if (cookieObjArr[i]) {
			
			//拼接节点,加入dom
			for (var j in originalObjArr) { //如果size, 颜色一样，则不创建新节点
				if (cookieObjArr[i].proSize == originalObjArr[j].proSize && cookieObjArr[i].proColor == originalObjArr[j].proColor) {
					//增加数量
					originalObjArr[j].proAmmount = parseInt(originalObjArr[j].proAmmount) + parseInt(cookieObjArr[i].proAmmount);
					$(".product-line").eq(j).find(".pro-ammount input").val(originalObjArr[j].proAmmount);
					
					flag = false;

				}

				
			}
			
			if (!flag) {
				continue;
			}

			createProList(cookieObjArr[i]);

		}

	}
	
	//更新购物车cookie
	newCookie();
	
	//商品数量，总价，折后价变化
	detailChange();
	


	//多选框的正反选
	$("#wrap-cart #toggle-checkbox").click(
		function(evt) {
			
			if (!$(this).attr("checked")) {
				$("#wrap-cart .product-line input:checkbox").each(function() {  //js写法
					this.removeAttribute("checked");
					
				});
				
				//商品数量，总价，折后价变化
				detailChange();	
				
	//			$("#wrap-cart :checkbox").removeAttr("checked"); //jq写法
			}else {
				$("#wrap-cart .product-line input:checkbox").each(function() {
					this.setAttribute("checked","checked");
					
					//商品数量，总价，折后价变化
					detailChange();
				});
	//			$("#wrap-cart :checkbox").attr("checked","ture");

			}
			
			event.stopPropagation();
		}

	); 
	
	
	//增减商品数量
	$(".product-line").each(function() {
			$(this).find(".pro-ammount .quantity-box b:last-child").on({
				click:function() {
					var originalAmmount = parseInt($(this).siblings("input").val());

					$(this).siblings("input").val(originalAmmount + 1);
					
					//cookie也要变
					newCookie();
					
					//商品数量，总价，折后价变化
					detailChange();
					
				}
			});
			
			$(this).find(".pro-ammount .quantity-box b:first-child").on({
				click:function() {
					var originalAmmount = parseInt($(this).siblings("input").val());

					$(this).siblings("input").val(originalAmmount - 1);
					
					//更新cookie
					newCookie();
					
					//商品数量，总价，折后价变化
					detailChange();

					//个数小于1删除该商品和cookie
					if (parseInt($(this).siblings("input").val()) < 1) {
						$(this).parents("tr").remove();
						
						//更新cookie
						newCookie();	
					}
					
					//如果没有商品行
					if ($("tr.product-line").length <= 0) {
						hideTable();
					}

				}
			});
			
			//点击删除，删除行
			$(this).find(".delete > a").on({
				click:function() {
					$(this).parents("tr").remove();
					//更新cookie
					newCookie();
					//商品数量，总价，折后价变化
					detailChange();
					//如果没有商品行
					if ($("tr.product-line").length <= 0) {
						hideTable();
					}
				}
			});
	});
	
	
	//优惠券变化
	$(".pro-detail-line select").change(function() {
		$(".pro-detail-line .discount").text($(".pro-detail-line select option:selected").val());
		//商品数量，总价，折后价变化
		detailChange();
	});
	
	//输入框变化
	$(".pro-detail-line #text").on({
		focus:function() {
			$(this).hide();
			$(".pro-detail-line #textarea").show();
		}
	});
	
	//删除选中
	$(".delete-select").on({
		click:function() {
			//删除选中tr
			$(".product-line input:checkbox:checked").parents("tr").remove();
			//更新cookie
			newCookie();
			//商品数量，总价，折后价变化
			detailChange();
			//如果没有商品行
			if ($("tr.product-line").length <= 0) {
				hideTable();
			}

		}
	});
	
	//清空购物车
	$(".delete-all").on({
		click:function() {
			//删除所有tr.product-line
			$(".product-line").remove();
			//更新cookie
			newCookie();
			//商品数量，总价，折后价变化
			detailChange();
			//隐藏购物车
			hideTable();
		}
	});	

	//checkbox click 价格数量变化
	$("tr.product-line input:checkbox").click (
		function() {
			console.log(111111)
			//商品数量，总价，折后价变化
			detailChange();
			event.stopPropagation();

		}
	)

/* ---------------------封装函数区------------------------*/
	
	//创建节点的办法
	function createProList(obj) {

		var $checkBoxNode = $("<td></td>").append($("<input type='checkbox' checked/>"));
		
		var $proNumberNode = $("<td class='pro-style-number'></td>").text(obj.proStyleNumber);
		
		var $proImgNode = $("<td class='pro-img'></td>").append($("<a href='javascript:;'></a>").append($("<img />").attr("src", obj.proImg)));
		
		var $proInfoh2Node = $("<h2></h2>").append($("<a href='javascript:;'></a>").text(obj.proTitle));
		var $proInfoPNode = $("<p class='more-detail'></p>").html("颜色:" + "<span class='color'>" + obj.proColor + "</span>" + " 尺码: " + "<span class='size'>" + obj.proSize + "</span>");
		var $proInfo = $("<td class='pro-info'></td>").append($proInfoh2Node).append($proInfoPNode);
		
		var $singlePriceNode = $("<td class='single-price'></td>").append($("<p></p>").text(obj.proTagPrice)).append($("<p></p>").text(obj.proPrice))
		
		var $ammountInputNode = $("<input type='text'/>").val(obj.proAmmount);
		var $ammountMinusNode = $("<b></b>").text("-");
		var $ammountPlusNode = $("<b></b>").text("+");
		var $ammountDivNode = $("<div class='quantity-box'></div>").append($ammountMinusNode).append($ammountInputNode).append($ammountPlusNode);
		var $proAmmountNode = $("<td class='pro-ammount'></td>").append($ammountDivNode);
		
		var $deleteNode = $("<td class='delete'></td>").append($("<a href='javascript:;'></a>").text("删除"));
		
		var $proScoreNode = $("<td></td>").text(parseInt(obj.proPrice));
		
		var $trNode = $("<tr class='product-line'></tr>").append($checkBoxNode).append($proNumberNode).append($proImgNode).append($proInfo).append($singlePriceNode).append($proAmmountNode).append($proScoreNode).append($deleteNode);
		
		$trNode.prependTo("tbody");
		
	} 
	

	//没有商品行，则隐藏table,显示empty-cart
	function hideTable() {  // ---------------------为什么没有动画？
		$("table").fadeOut(function() {
			$(".empty-cart").slideDown();
		});
	}
	

	
//	//改变cookieObj --------------------局部更新，选中对象的来改
//	function changeCookieObj($obj) {
//		var oldCookieObjArr = JSON.parse($.cookie("product"));
//		for (var i in oldCookieObjArr) {
//			if (oldCookieObjArr[i].proSize == $obj.find(".size").text() && oldCookieObjArr[i].proColor == $obj.find(".color").text()) {
//				
//				oldCookieObjArr[i].proAmmount = parseInt($obj.find("input:text").val());
//				
//				//如果proAmount < 1, 从数组中移出该对象
//				if (!oldCookieObjArr[i].proAmmount) {
//					oldCookieObjArr.splice(i,1);
//				}
//				
//			}
//		}
//		
//		newCookieObj(oldCookieObjArr);
//		console.log( JSON.parse($.cookie("product")))
//		
//	}
//	
//	//更新cookieObj
//	function newCookieObj(cookieObjArr) {
//		var cookieJson = JSON.stringify(cookieObjArr);
//		$.cookie("product", cookieJson, {expires:100});
//	}



	//更新cookieObj --------------------- ，全部更新，获取页面上的信息全部更新
	function newCookie() {
	
		var newCookieObjArr = [];
		$(".product-line").each(function() {
			    var proObj = {
					proImg:$(this).find(".pro-img img").attr("src"),
					proTitle:$(this).find(".pro-info h2 > a").text(),
					proStyleNumber:$(this).find(".pro-style-number").text(),
					proPrice:$(this).find(".single-price > p:last-child").text(),
					proTagPrice:$(this).find(".single-price > p:first-child").text(),
					proColor:$(this).find(".color").text(),
					proSize:$(this).find(".size").text(),
					proAmmount:$(this).find(".pro-ammount input").val()
				};
				
			newCookieObjArr.unshift(proObj); //让新的排在前面	
			
			
		});
			
		//序列化
		var cookieJson = JSON.stringify(newCookieObjArr);
		//保存
		$.cookie("product", cookieJson, {expires:100});		
		//TEST		
		console.log(JSON.parse($.cookie("product")));		
	}
	
	//商品总数
	function countItemAmmount() {
		var itemAmmount = 0;
		$(".product-line input:checked").parents("tr").each(function() {

			var ammount = parseInt($(this).find(".pro-ammount input").val());
			
			itemAmmount += ammount;
		});
		return itemAmmount;
	}
	
	//商品总金额 
	function countTotalMoney() {
		var totalMoney = 0;
		$(".product-line  input:checked").parents("tr").each(function() {
			var singlePrice = parseInt($(this).find(".single-price > p:last-child").text());
			var ammount = parseInt($(this).find(".pro-ammount input").val());
			
			totalMoney += singlePrice * ammount;
		});
		return totalMoney;
	}
	
	
	//detailChange
	function detailChange() {
		//商品总数变化
		$(".single-ammount").text(countItemAmmount());
		
		//价格变化
		//总额
		$(".single-total-price").text( "¥" + countTotalMoney() + ".00");
		//应付金额
		var discount = 0;
		if ($(".pro-detail-line select option:selected").val()) {
			discount = parseInt($(".pro-detail-line select option:selected").val().substr(2,2));
		}

		var finalPrice = countTotalMoney() - discount;
		
		$(".final-price").text("¥" + finalPrice + ".00");		
	}
	//-----------------------cart end---------------------
	
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
	});
	/*-----------------------bottom button end--------------------------*/
	
});