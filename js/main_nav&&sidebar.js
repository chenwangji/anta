/*********************主导航栏和右侧边栏*********************/

$(function() {
	$(window).scroll(function() {
		
		//从上往下到达边界，首先改变main nav 的初始样式，再动画修改top，
		//加 $("#wrap-main-nav").css("position") == "static"作用是避免top值被重复设为-36
		if ($("body").scrollTop() > 168 && $("#wrap-main-nav").css("position") == "static") { //滚动条范围在 0 -- 168
				
			$("#wrap-main-nav").css({
				position:"fixed",
				"z-index":200,
				top:-36
			}).stop().animate({
				top:0
			});
			
			//侧边栏
			$("#wrap-right-sideBar").css({
				top:0
			})
			//back to top 按钮显示
			$("#wrap-right-sideBar .back-to-top").show();
			
		//从下到上到达边界，让main nav 回到原来的文档流（改position:static）
		
		}else if ($("body").scrollTop() <= 168) {
			$("#wrap-main-nav").css({
				position:"static",
				"z-index":0
			});
			
			//侧边栏
			$("#wrap-right-sideBar").css({
				top:132
			})
			//back to top 按钮隐藏
			$("#wrap-right-sideBar .back-to-top").hide();
		}
	});
	
	
	$("#wrap-right-sideBar .right-sideBar .side-store, .right-sideBar .side-saw, .right-sideBar .online-server").on({
		mouseenter:function() {

			$(this).children("span").show().stop().animate({
				left:-90,
				opacity:100
			});
		},
		mouseleave:function() {
			$(this).children("span").hide().stop().css({
				left:-110,
				opacity:0
			});
		}
	});
	
	$(".right-sideBar .side-service").on({
		mouseenter:function() {

			$(this).children("div").show().stop().animate({
				left:-122,
				opacity:100
			});
		},
		mouseleave:function() {
			$(this).children("div").hide().stop().css({
				left:-142,
				opacity:0
			});
		}
	});	
	
	$(".right-sideBar .mall-code").on({
		mouseenter:function() {

			$(this).children("span").show().stop().animate({
				left:-219,
				opacity:1
			});
		},
		mouseleave:function() {
			$(this).children("span").hide().stop().css({
				left:-239,
				opacity:0
			});
		}
	});	
	
	
	
	//back to top 
	$("#wrap-right-sideBar .back-to-top").on({
		click:function() {
			$("body").stop().animate({
				scrollTop:0
			});
		}
	});
	
	//搜索框
	$("#wrap-main-nav .item-search input").on({
		focus:function() {
			$("#wrap-main-nav .item-search .hot-item").show();
		},
		blur:function() {
			$("#wrap-main-nav .item-search .hot-item").delay(2000).hide();	// 延时1s隐藏
		}
	});
	/*********************主导航栏和右侧边栏*********************/	
	
	//---------------------侧边栏购物车
	$("#wrap-right-sideBar .side-shopping-chart").toggle(
		function() {
			//侧边栏滑出
			$("#wrap-right-sideBar").animate({
				right:0
			});
			
			//store,history隐藏，cart显示，并且从cookie加载商品
			$(".right-sideBar-box").children().hide();
			$(".right-sideBar-box").children(".side-box-cart").show();

			if (JSON.parse($.cookie("product")).length) {

				//动态创建商品列表
				//清空当前
				$(".side-box-cart table").empty();
				var cartProCookieArr = JSON.parse($.cookie("product"));
				for (var i in cartProCookieArr) {
					
					//判断当前加载的商品是否有相同的型号？但这里好像不用这么做，就直接创建吧
					
					createCartList(cartProCookieArr[i]);
				}
			//出现了一个bug ,多了一个td:title,要删除,mark here
			$(".side-box-cart table tr td:nth-child(4)").remove();
			
			//点击checkbox统计总价
			$("#wrap-right-sideBar .side-box-cart table input:checkbox").on({
				click:function() {
					//改变件数，价格
					countTotalAmmount();
					countTotalPrice();
				}
			});
				
			}else {				
				//列表没有商品		
				$(".side-box-cart").children().hide();
				$(".side-box-cart > h3").show();
				$(".side-box-cart .side-empty-cart").show();
			}
			
		},
		function() {
			//侧边栏滑入
			$("#wrap-right-sideBar").animate({
				right:-280
			});
		}
	);


	
	//checkbox的正反选
	$("#wrap-right-sideBar .side-box-cart > h3 input").click(
		function() {
			if ($(this).attr("checked")) {
				$("#wrap-right-sideBar .side-box-cart input:checkbox").attr("checked", "checked");
				//改变件数，价格
				countTotalAmmount();
				countTotalPrice();
			}else {
				$("#wrap-right-sideBar .side-box-cart input:checkbox").removeAttr("checked");
				//改变件数，价格
				countTotalAmmount();
				countTotalPrice();
			}
		}
	);

//--------------history------------------
	$("#wrap-right-sideBar .side-saw").toggle(
		function() {
			//侧边栏滑出
			$("#wrap-right-sideBar").animate({
				right:0
			});
			
			//store,cart隐藏，history显示，并且从cookie加载商品
			$(".right-sideBar-box").children().hide();
			$(".right-sideBar-box").children(".side-box-history").show();
			
			//如果有cookie - history
			//标记位
			var hasHistory = false;
			for (var i = 0; i < 10; i++) {
				if ($.cookie("title" + i)) {
					
					hasHistory = true;
					
					//创建节点
					putHistoryToDOM();
					
				}
			}
			
			//更新历史记录个数
			$(".side-box-history .pro-ammount > span > b").text(countHistory());
			
			if (!hasHistory) {
				$(".side-box-history").children().hide();
				$(".side-box-history > h3").show();
				$(".side-box-history .side-empty-store").show();
			}
		},
		function() {
			
			//侧边栏滑入
			$("#wrap-right-sideBar").animate({
				right:-280
			});
		}
			
	);
	
	
	
	//clear history
	$(".side-box-history .pro-ammount > i").on({
		click:function() {
			$(".clear-warning").show();
			$(".clear-warning .ensure").click(function() {
				clearHistory();
				//更新历史记录个数
				$(".side-box-history .pro-ammount > span > b").text(countHistory());
				$(".clear-warning").hide();
			});
			
			$(".clear-warning .cancel").click(function() {
				$(".clear-warning").hide();
			});
		}
	});
	
	//上方收起按钮
	$(".side-box-history > h3 > span:first").on({
		//侧边栏滑入
		click:function() {
			$("#wrap-right-sideBar").animate({
			right:-280
		});
		}

	})
	
	
	//-------------love store-----------------
	
	$("#wrap-right-sideBar .side-store").toggle(
		function() {
			//侧边栏滑出
			$("#wrap-right-sideBar").animate({
				right:0
			});
			
			//cart,history隐藏，store显示，并且从cookie加载商品
			$(".right-sideBar-box").children().hide();
			$(".right-sideBar-box").children(".side-box-love").show();
			
			//如果有cookie - love
			//标记位
			var hasStore = false;
			for (var i = 0; i < 10; i++) {
				if ($.cookie("loveTitle" + i)) {
					
					hasStore = true;
					
					//创建节点
					putStoreToDOM();
					
				}
			}
			
			
			if (!hasStore) {
				$(".right-sideBar-box .side-box-love").children().hide();
				$(".right-sideBar-box .side-box-love > h3").show();
				$(".right-sideBar-box .side-box-love .empty-store").show();
			}
			
		},
		function() {
			//侧边栏滑入
			$("#wrap-right-sideBar").animate({
				right:-280
			});
		}
	);
	
	//上方收起按钮
	$(".right-sideBar-box > h3 > span:first").on({
		//侧边栏滑入
		click:function() {
			$("#wrap-right-sideBar").animate({
			right:-280
		});
		}

	});

//---------------------------封装方法区-----------------------------------------
	function createCartList(obj) {
		var $checkboxNode = $("<td width='25'></td>").html("<input type='checkbox'/>");
		
		var $imgNode = $("<img />").attr("src", obj.proImg);
		var $imgTdNode = $("<td width='60'></td>").append($("<a href='javascript:;'></a>").append($imgNode));
		
		var $titleNode = $("<td width='70' class='cart-pro-title'><td/>").text(obj.proTitle);
		
		var $ammountNode = $("<td  width='65' class='cart-pro-ammount'></td>").text(obj.proAmmount);
		
		var $priceNode = $("<td  width='60' class='cart-pro-single-price'></td>").text(obj.proPrice);
		
		var $productLine = $("<tr height='64'></tr>").append($checkboxNode)
													  .append($imgTdNode)
													  .append($titleNode)
													  .append($ammountNode)
													  .append($priceNode);
		
		$productLine.appendTo($(".side-box-cart table"));
		
		//出现了一个bug ,多了一个td:title,要删除,为什么？？？？？？？？？？？？？？？
		
	}
	
	
	//统计总价
	function countTotalPrice() {
		var totalPrice = 0;
		$("#wrap-right-sideBar .side-box-cart tr input:checked").each(function() {
			totalPrice += parseInt($(this).parents("tr").find(".cart-pro-single-price").text()) * parseInt($(this).parents("tr").find(".cart-pro-ammount").text());
		});
		$("#wrap-right-sideBar .side-box-cart .pro-ammount-box .totalPrice").text("￥ " + totalPrice + ".00");
	}
	
	//统计商品总数
	function countTotalAmmount() {
		var totalAmmount = 0;
		$("#wrap-right-sideBar .side-box-cart tr input:checked").each(function() {
			totalAmmount += parseInt($(this).parents("tr").find(".cart-pro-ammount").text());
		});
		$("#wrap-right-sideBar .side-box-cart .pro-ammount-box .totalAmmount > i").text(totalAmmount);
	}
	
	
	
	
	
	//创建历史记录节点
	function createHistoryDOM(cookieObj) {

		var $imgNode = $("<img />").attr("src", cookieObj.imgSrc);
		var $aNode = $("<a href='javascript:;'></a>").append($imgNode);
		var $title = $("<h6></h6>").text(cookieObj.title + "-" + cookieObj.proId);
		
		var $LiNode = $("<li></li>").append($aNode).append($title);
		
		$(".side-box-history ul").append($LiNode);
	}
	
	function putHistoryToDOM() {
		
		//先清空之前
		$(".side-box-history ul").empty();
		//获取cookie
		for (var i = 0; i < 10; i++) {
			
			if ($.cookie("title" + i)) {
				//
				var cookieObj = {
					title:$.cookie("title" + i),
					imgSrc:$.cookie("imgSrc" + i),
					proId:$.cookie("proId" + i)
				};
				
				createHistoryDOM(cookieObj);
			}
 
		}
	}
	
	//clear histoey
	function clearHistory() {
		for (var i = 0; i < 10; i++) {
			$.removeCookie("title" + i);
			$.removeCookie("imgSrc" + i);
			$.removeCookie("proId" + i);
		}
		
		//从界面移除
		$(".side-box-history ul").empty();
	}
	
	
	//统计历史记录个数
	function countHistory() {
		return $(".side-box-history ul > li").length;
	}
	 
	 
	 	
	 	
	 	
	 	
	
	//创建收藏节点
	function createStoreDOM(cookieObj) {

		var $imgNode = $("<img />").attr("src", cookieObj.imgSrc);
		var $aNode = $("<a href='javascript:;'></a>").append($imgNode);
		var $title = $("<h6></h6>").text(cookieObj.title + "-" + cookieObj.proId);
		
		var $LiNode = $("<li></li>").append($aNode).append($title);
		
		$(".right-sideBar-box .side-box-love ul").append($LiNode);
	}
	
	function putStoreToDOM() {
		
		//先清空之前
		$(".right-sideBar-box .side-box-love ul").empty();
		//获取cookie
		for (var i = 0; i < 10; i++) {
			
			if ($.cookie("loveTitle" + i)) {
				//
				var cookieObj = {
					title:$.cookie("loveTitle" + i),
					imgSrc:$.cookie("loveImgSrc" + i),
					proId:$.cookie("loveProId" + i)
				};
				
				createStoreDOM(cookieObj);
			}
 
		}
	}
	

});


