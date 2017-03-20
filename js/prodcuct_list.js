/*
 * 
 * product list 
 * 
 * 
 * 
 */

//商品页选择器展开收起
$(function() {
	$("#wrap-selector .more").on({
		click:function() {
			//改变文字、样式
			if ($(this).find("span").text() == "收起") {
				$(this).addClass("unfold").find("span").text("更多");
				
				//ul收起
				$(this).parents("dl").addClass("fold-dl");
				
			//展开	
			}else {
				$("#wrap-selector .more").removeClass("unfold");
				$(this).find("span").text("收起");
				$(this).parents("dl").removeClass("fold-dl");
			}

		}
	});
	
	
	
	//多选按钮
	
	//点击多选按钮显示多选框
	$("#wrap-selector .second-dd .options").on({
		click:function() {
			//如果没展开要先展开
			if ($(this).siblings().find("span").text() == "更多") {
				$("#wrap-selector .more").removeClass("unfold");
				$(this).siblings().find("span").text("收起");
				$(this).siblings().parents("dl").removeClass("fold-dl");
				
			}
			
			$("#wrap-selector dl").removeClass("options-dl");
			$(this).parents("dl").addClass("options-dl");
		}
	});
	
	//点击确定 或者 取消隐藏多选框
	$("#wrap-selector .cancel-btn,#wrap-selector .first-btn").on({
		click:function() {
			$(this).parents("dl").removeClass("options-dl");
		}
	});
	
	//小多选框样式
	$("#wrap-selector dl dd > ul > li").toggle(
		function() {
			$(this).addClass("select-class");	
		},
		function() {
			$(this).removeClass("select-class");			
		}
	);
	
	//改变确认框样式
	$("#wrap-selector dl dd > ul > li").on({
		click:function() {
			if ($(this).parent().children().is(".select-class")) {
				$(this).parents("dl").find(".first-btn").addClass("confirm-btn");
				$(this).parents("dl").find(".first-btn").removeClass("disabled");
			}else {
				$(this).parents("dl").find(".first-btn").addClass("disabled");
				$(this).parents("dl").find(".first-btn").removeClass("confirm-btn");
			}
		}
	});
	
//------------------------------------------------------------------------------------	
	
	//商品列表动态加载
//	var detailObj = {
//		bigImgSrc:"img/product_list_img/11711101_big--w_220_h_220.jpg",
//		title:"加内特狼王系列纪念版战靴",
//		price:599.00,
//		hasTag:true,
//		smallImgSrcArr:["img/product_list_img/11711101_2_01--w_30_h_30.jpg",
//						"img/product_list_img/11711101_3_01--w_30_h_30.jpg",
//						"img/product_list_img/11711101_7_01--w_30_h_30.jpg",
//						"img/product_list_img/11711101_8_01--w_30_h_30.jpg"]
//		
//	}
	
	function addProToList(obj) {

		var $liNode = $("<li></li>");
		var $likeNode = $("<a href='javascript:;' class='like'><i></i>关注</a>");
		var $bigImg = $("<img />").attr("src",obj.bigImgSrc);
		var $bigImgNode = $("<a href='product_detail.html' class='big-img'></a>").append($bigImg);
		
		
		var $smallImgNodeList = $("<ul class='small-img-list clear'></ul>");
		
		for (var i = 0; i < obj.smallImgSrcArr.length; i++) {
			var $smallImg = $("<img />");
			var $smallImgLi = $("<li></li>");
			$smallImgLi.append($smallImg.attr("src",obj.smallImgSrcArr[i])).appendTo($smallImgNodeList);
		}
		
		var $priceNode = $("<span class='price'></span>").append(obj.price);
		var $tagNode = $("<strong></strong>").text("领券");
		var $priceLineNode = $("<div class='price-line'>￥</div>").append($priceNode);
		
		//是否有券
		if (obj.hasTag) {
			$priceLineNode.append($tagNode);
		}
		var $titleNode = $("<p></p>").text(obj.title);
		
		$liNode.append($likeNode).append($bigImgNode).append($smallImgNodeList).append($priceLineNode).append($titleNode);
		
		$(".list-pro-box > ul").append($liNode);
	
	}
	//test
//	addProToList(detailObj);
	

	
	//添加完节点后绑定移入移出事件和点击保存cookie的事件，以回调函数的形式调用--------------
	function eventCallBack() {
		//移入移出改变大图图片
		//保存大图原来的src到自定义的originalSrc属性里
		$("#wrap-main-list .list-pro-box > ul > li > .big-img > img").each(function() {
			$(this).attr("originalSrc",$(this).attr("src"));
		})
		
		$("#wrap-main-list .small-img-list > li").on({
			mouseenter:function() {
			
			//大图src
			var bigImgSrcStr = $(this).find("img").attr("src").replace("w_30_h_30", "w_220_h_220");

			$(this).parent().siblings(".big-img").find("img").attr("src",bigImgSrcStr);
			
			}
		});
		
		//鼠标移出大图恢复原来的大图src
		$("#wrap-main-list .list-pro-box > ul > li").on({
			mouseleave:function() {
			
			//恢复原来的大图src
			var bigImgSrcStr = $(this).find(".big-img > img").attr("src",$(this).find(".big-img > img").attr("originalSrc"));
			
			}
		});
		
		
		/*--------------------- set cookie to  history start---------------------*/
		//点击列表保存信息到cookie
//		$("#wrap-main-list .list-pro-box > ul > li > .big-img > img").on({
//			click:function() {
//				
//				//从src中截取商品id
//				var startIndex = $(this).attr("src").indexOf("list_img/") + 9;
//				var productId = $(this).attr("src").substr(startIndex, 8);
//				console.log(productId)
//				//保存到cookie中
//				$.cookie("historySrc" + productId, $(this).attr("src"), {expires:100});
//				$.cookie("title" + productId, $(this).parents("li").find("p"), {expires:100});
//			}
//		});
			
			
			
		//定义数组保存cookie
		var cookieInfoArr = [];
		
		//将原来浏览器的cookie保存到数组中
		for(var i = 0; i < 10; i++) {
			if ($.cookie("title" + i)) {
				var temObj = {
					imgSrc:$.cookie("imgSrc" + i),
					title:$.cookie("title" + i),
					proId:$.cookie("proId" + i)
				};
				cookieInfoArr.push(temObj);
			}
		}
		
		//添加新cookie
		$("#wrap-main-list .list-pro-box > ul > li > .big-img > img").on({
			click:function() {
				//从src中截取商品id
				var startIndex = $(this).attr("src").indexOf("list_img/") + 9;
				var productId = $(this).attr("src").substr(startIndex, 8);
				
				cookieInfoArr.unshift({
					imgSrc:$(this).attr("src"),
					title:$(this).parents("li").find("p").text(),
					proId:productId
				});
				
				//让cookie的数量最多为10
				if (cookieInfoArr.length > 10) {
					cookieInfoArr.pop();
				}
				
				//保存最多10条cookie----------最新的同名cookie会把旧的覆盖
				for (var i = 0; i < cookieInfoArr.length; i++) {
					var tempObj = cookieInfoArr[i];
					$.cookie("imgSrc" + i, tempObj.imgSrc, {expires:100});
					$.cookie("title" + i, tempObj.title, {expires:100});
					$.cookie("proId" + i, tempObj.proId, {expires:100});
					
				}
				
			}
		});
		
		
		/*---------------------  set cookie to history finish --------------------*/
		/*---------------------  set cookie to love store start --------------------*/
				//定义数组保存cookie
		var loveCookieInfoArr = [];
		
		//将原来浏览器的cookie保存到数组中
		for(var i = 0; i < 10; i++) {
			if ($.cookie("loveTitle" + i)) {
				var temObj = {
					imgSrc:$.cookie("loveImgSrc" + i),
					title:$.cookie("loveTitle" + i),
					proId:$.cookie("loveProId" + i)
				};
			loveCookieInfoArr.push(temObj);
			}
		}
		
		//添加新cookie
		$("#wrap-main-list .list-pro-box > ul > li > .like").on({
			click:function() {
				//从src中截取商品id
				console.log($(this).parent().find(".big-img > img"))
				var startIndex = $(this).parent().find(".big-img > img").attr("src").indexOf("list_img/") + 9;
				var productId = $(this).parent().find(".big-img > img").attr("src").substr(startIndex, 8);
				
				loveCookieInfoArr.unshift({
					imgSrc:$(this).parent().find(".big-img > img").attr("src"),
					title:$(this).parent().find(".big-img > img").parents("li").find("p").text(),
					proId:productId
				});
				
				//让cookie的数量最多为10
				if (loveCookieInfoArr.length > 10) {
					loveCookieInfoArr.pop();
				}
				
				//保存最多10条cookie----------最新的同名cookie会把旧的覆盖
				for (var i = 0; i < loveCookieInfoArr.length; i++) {
					var tempObj = loveCookieInfoArr[i];
					$.cookie("loveImgSrc" + i, tempObj.imgSrc, {expires:100});
					$.cookie("loveTitle" + i, tempObj.title, {expires:100});
					$.cookie("loveProId" + i, tempObj.proId, {expires:100});
					
				}
				
			}
		});
		
		
		/*---------------------  set cookie to love store end --------------------*/
		
	}
	

	
	
//	--------------------------------------------------------
	//初始请求全部
	function getAllJson(callBack) {
		$.get("json/product_list.json",function(responText) { //为什么相对路径没用？
			//test
//			console.log(1)
	//		console.log(responText);
			
			for (var i = 0; i < responText.length; i++) {
				addProToList(responText[i]);
			}
			
			//执行回调函数
			callBack();
		});
	
	}
	
	//初始加载页面时，加在全部json
	getAllJson(eventCallBack);

	
	//点击筛选
	$(".select-box dl > dd > ul > li").on({
		click:function() {
			var $selfLi = $(this); //临时收this
			
			//选中类型加在头部
			
			var selectStr = $selfLi.parents("dl").find("dt").text() + " : " + $selfLi.find("a").text();
			var selectSpan = $(".selector .crumb-nav .show-select-box");
			selectSpan.show();
			selectSpan.find("b").text(selectStr);
			
			
			//清空list
			$(".main-list .list-pro-box > ul").empty();
			
			
			//获取dl id 值，用于筛选
			var selectType = $(this).parents("dl").attr("id");
			

			//获取json
			$.get("json/product_list.json",function(responText) {
				
				//判断选中的类型 
				for (var i = 0; i < responText.length; i++) { //------------ajax 中的this 不为li

					//将满足条件的对象保存仅数组
					if ($selfLi.find("a").text() == responText[i][selectType]) {
						
						//加入DOM中
						addProToList(responText[i]);
	
					}

				}
				
				eventCallBack();
				
			});
		}
	});
	
	
	//点击头部清除选中的按钮，加在全部原始数据
	$(".selector .crumb-nav .show-select-box em").on({
		click:function() {
			//按钮隐藏
			$(this).parent().hide();
			
			//清空list
			$(".main-list .list-pro-box > ul").empty();
			
			//请求全部数据,加载到页面
			getAllJson(eventCallBack);
		}
	})
	
	//筛选领券
	$(".main-list .getTag input").click(
		function() {
			if ($(this).attr("checked")) {

				//获取json
				$.get("json/product_list.json",function(responText) {
					//清空list
					$(".main-list .list-pro-box > ul").empty();
					
					//判断选中的类型 
					for (var i = 0; i < responText.length; i++) { //------------ajax 中的this 不为li
	
						if (responText[i].hasTag) {
						
							//加入DOM中
							addProToList(responText[i]);
							
						}
	
					}
					
				});	
			}else {
				
				//清空list
				$(".main-list .list-pro-box > ul").empty();
				getAllJson(eventCallBack);
			}
					
		}

	);
	
	/*-------------价格排序-start------------------------------*/
	
	function sortList(bool, callBack) {
		//储存满足条件的对象的数组
		var selectArr = [];
		
		$.get("json/product_list.json",function(responText) {
			
			var objLength = responText.length;
			//选择排序
			for (var i = 0; i < objLength; i++) {
				//参数为真，从大到小
				if (bool) {
					for (var j = i; j < objLength; j++) {
						if (responText[i].price < responText[j].price) {
							//交换位置
							var temObj = responText[i];
							responText[i] = responText[j];
							responText[j] = temObj;
						}	
					}
					
					
				}else {
					for (var j = i; j < objLength; j++) {
						//从小到大
						if (responText[i].price > responText[j].price) {
							//交换位置
							var temObj = responText[i];
							responText[i] = responText[j];
							responText[j] = temObj;
						}
					}

				}

			}
			
			addAllNodeToDom(responText);
			callBack();
			
			//倒入DOM
			function addAllNodeToDom(objArr) {
				for (var i = 0; i < objArr.length; i++ ) {
					addProToList(objArr[i]);
				}
			}
		
		});

	}

	
	$(".main-list .filter-list .list-sort > .price-sort").toggle(
		function() {
			$thisNode = $(this);
			//改变样式
			$thisNode.siblings().removeClass("select");
			$thisNode.addClass("select").text("价格"+ "↓");
			
			//清空所有
			$(".main-list .list-pro-box > ul").empty();
			
			sortList(true, eventCallBack);
		},
		function() {
			$thisNode.addClass("select").text("价格" + "↑");
			
			//清空所有
			$(".main-list .list-pro-box > ul").empty();
			
			sortList(false, eventCallBack);
		}
		)
	
	/*-------------价格排序---end----------------------------*/
	
	//综合排序，回到初始状态 -----------有bug, 综合排序和价格排序先后点会导致综合排序的text()变为价格
	$(".main-list .filter-list .list-sort > a:first").on({
		click:function() {
			$thisNode = $(this);
			//改变样式
			$thisNode.siblings().removeClass("select");
			$thisNode.addClass("select");
			
			//清空list
			$(".main-list .list-pro-box > ul").empty();
			getAllJson(eventCallBack);

		}
	});
	

//	--------------------------list end------------------------------//
 
//-------------------------create history DOM --------------------- 
	//创建节点
	function createHistoryDOM(cookieObj) {
		
		$(".borowse-record").show();
		
		var $imgNode = $("<img />").attr("src", cookieObj.imgSrc);
		var $aNode = $("<a href='javascript:;'></a>").append($imgNode);
		var $title = $("<p></p>").text(cookieObj.title + "-" + cookieObj.proId);
		
		var $LiNode = $("<li></li>").append($aNode).append($title);
		
		$("#wrap-browse-record ul").append($LiNode);
	}
	
	function putHistoryToDOM() {
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
	
	putHistoryToDOM();
	
});





