/*
 * 
 *product details showing, include:
 * 1. 放大镜
 * 2. 图片，数据的切换显示
 * 3. 样式的动态修改
 * 
 */

$(function() {
	//点击左边小图，切换大图的显示，并且修改小图样式
	//全局变量记录左边小图下标和右边小图下标
	var detail_leftSelectImgIndex = 0;
	var detail_rightLiIndex = 0;
	
	$(".small-img-box > ul > li").on({
		click:function() {
			//改变样式
			$(".small-img-box > ul > li").removeClass("select-small-img");
			//因为切换另外的ul会保留原来选中的li的序号，所以让所有的同样下标的li都加上class
			detail_leftSelectImgIndex = $(this).index();
			$(".small-img-box > ul").each(function() {
				$(this).children().eq(detail_leftSelectImgIndex).addClass("select-small-img");
			});
			
			//改变大图地址
			//大图地址
			var srcStr = this.children[0].src.replace("--w_220_h_220",""); //删除后面的一段即可
			$(".show-box > img").attr("src",srcStr);
			//细节图背景
			$(".product-detail .show-box .show-detail").css({
				"background-image":"url(" + srcStr + ")"
			});
			
		}
	});
	
	//点击右边小图切换商品颜色款式，并且切换颜色描述
	$(".pro-info .color-style-list > li").on({
		click:function() {
			detail_rightLiIndex = $(this).index();
			//改变边框样式
			$(".pro-info .color-style-list > li").removeClass("select-color");
			$(this).addClass('select-color');
			
			//改变左边显示列表
			$(".small-img-box > ul").removeClass("select-small-img-list");
			$(".small-img-box > ul").eq(detail_rightLiIndex).addClass("select-small-img-list");
			
			//大图地址得跟着变		
			//获取当前小图的地址
			var srcStr = $(".small-img-box > ul").eq(detail_rightLiIndex).children().eq(detail_leftSelectImgIndex).get(0).children[0].src.replace("--w_220_h_220",""); //删除后面的一段即可

			$(".show-box > img").attr("src",srcStr);
			
			//细节图背景
			$(".product-detail .show-box .show-detail").css({
				"background-image":"url(" + srcStr + ")"
			});
			
			
			//切换颜色描述
			$(".pro-info .color-description > p").removeClass("color-des-show");
			$(".pro-info .color-description > p").eq(detail_rightLiIndex).addClass("color-des-show");
			
			//切换显示的尺码
			$(".color-code > ul").removeClass("show-color-list");
			$(".color-code > ul").eq(detail_rightLiIndex).addClass("show-color-list");
			
			/* ---------改变库存--start-----------*/
			/*
			 * 1. 如果尺码表没有选中，显示总库存
			 * 2. 如果尺码表有选中项，显示选中项库存
			 * 
			 */
			if ($(".color-code > .show-color-list > li").is(".current")) {
				//有被选中
				var storeAmount = $(".pro-info .current").eq(detail_rightLiIndex).attr("amount");
				$(".store-amount-show").text(storeAmount);
				
			//没有选中，则为总数	
			}else {
				var storeAmount = 0;
				$(".color-code > ul").eq(detail_rightLiIndex).children("li").each(function(index) {
					storeAmount += parseInt($(this).attr("amount"));
				});
//				console.log(storeAmount); //test
				$(".store-amount-show").text(storeAmount);
			}
			/* ---------改变库存-end------------*/
			
			
		}
	});
	
	
	$(".color-code > ul").children("li").on({
		
		click:function() {
			//点击尺码列表切换尺码并且改变样式(所有的ul的相同下标的li都改)
			
			var selectCodeIndex = $(this).index();
//			console.log(selectCodeIndex)
			$(".color-code > ul >li").removeClass("current");
			
			$(".color-code > ul").each(function() {
				$(this).children("li").eq(selectCodeIndex).addClass("current");
			});
			
			//显示尺码
			$(".pro-info .size-show").text($(this).text());
			
			//改变库存
			$(".store-amount-show").text($(this).attr("amount"));   //有bug  ---- mark
			
		}
	});
	
	//点击查看尺码表
	$(".color-code .size-table").on({
		click:function() {

			$(".shoe-code-table").show();
		}
	});
	$(".shoe-code-table .after").on({
		click:function() {
			$(".shoe-code-table").hide();
		}
	})
	
	//点击数量显示数字列表
	$(".color-code .sum-box").on({
		click:function () {
			$(this).children("ul").show();
		}
	});
	//显示
	$(".color-code .sum-box > ul > li").on({
		click:function(evt) {
			//要阻止冒泡，不然冒泡到sum-box上又会让ul显示
			evt.stopPropagation();
			$(".color-code .sum-box > b").text($(this).text());
			$(this).parent().hide();
		}
	});
	
	
	
	//放大镜效果
	$(".product-detail .show-box").on({
		mouseenter:function() {
			$(".product-detail .show-box .choose-area").show();	
			$(".product-detail .show-box .show-detail").show();
		},
		mouseleave:function() {
			$(".product-detail .show-box .choose-area").hide();
			$(".product-detail .show-box .show-detail").hide();
		},
		mousemove: function(evt) {
			var $Node = $(".product-detail .show-box .choose-area");
			var disX = evt.pageX;
			var disY = evt.pageY;
			var left = disX - $Node.parent().offset().left - $Node.width() / 2;	
			var top = disY - $Node.parent().offset().top - $Node.height() / 2;
			
			$Node.css({
				left: function() {
					if (left < 0) {
						return 0;
					}else if (left > $Node.parent().width() - $Node.width()) {
						return $Node.parent().width() - $Node.width();
					}
					return left;
				},
				top: function() {

					if (top < 0) {
						return 0;
					}else if (top > $Node.parent().height() - $Node.height()) {
						return $Node.parent().height() - $Node.height();
					}
					return top;
					
				}
			});
			
			
			$(".product-detail .show-box .show-detail").css({
				"background-positionX":-left,
				"background-positionY":-top
				
			});

		}

	})
	
	/*---------------保存商品到购物车 ----------------------------------------------------*/
	

	//解析
	var cookieObjArr = [];
	
	//如果原来有cookie，则接收
	if ($.cookie("product")) {
		cookieObjArr = JSON.parse($.cookie("product"));	
		console.log(cookieObjArr)
	}

	//保存新cookie	
	$(".put-in-chart").on({
		click:function() {
			
			var proObj = {
				proImg:$(".select-color > img").attr("src"),
				proTitle:$("#wrap-product-detail .detail-header > h1 > b").text(),
				proStyleNumber:$("#wrap-product-detail .detail-header > h1 > span strong").text(),
				proPrice:$("#wrap-product-detail .price > h3 > span").text(),
				proTagPrice:$("#wrap-product-detail .price > p > span").text(),
				proColor:$("#wrap-product-detail .color-description > p.color-des-show").text(),
				proSize:$("#wrap-product-detail .size-show").text(),
				proAmmount:$("#wrap-product-detail .sum-box > b").text()
			};

			cookieObjArr.unshift(proObj); //让新的排在前面-------------?
			
			//最多保存6件商品
			if (cookieObjArr.length > 7) {
				cookieObjArr.pop();
			}
			
			//序列化
			var cookieJson = JSON.stringify(cookieObjArr);
			console.log(cookieJson);
			//保存
			$.cookie("product", cookieJson, {expires:100});
			
			
			if ($(".color-style-list .select-color").length && $(".color-code > ul > .current").length) {
				
				$("#wrap-right-sideBar").animate({
					right:0
				});
				
			}
			
			
			
			
			
			
			
//			//当前选中商品的下标
//			var proIndex = $(".select-color").index();
//			
//			//商品图片src
//			$.cookie("pro-img" + proIndex, $(".select-color > img").attr("src"), {expires:30});
//			
//			//商品名称
//			$.cookie("pro-title" + proIndex, $("#wrap-product-detail .detail-header > h1 > b").text(), {expires:30});
//			//商品编号
//			$.cookie("pro-style-number" + proIndex, $("#wrap-product-detail .detail-header > h1 > span strong").text(), {expires:30});
//			//商品价格
//			$.cookie("pro-price" + proIndex, $("#wrap-product-detail .price > h3 > span").text(), {expires:30});
//			//商品吊牌价
//			$.cookie("pro-tag-price" + proIndex, $("#wrap-product-detail .price > p > span").text(), {expires:30});
//			
//			//颜色
//			$.cookie("pro-color" + proIndex, $("#wrap-product-detail .color-description > p.color-des-show").text(), {expires:30});
//			
//			//尺码
//			$.cookie("pro-size" + proIndex, $("#wrap-product-detail .color-code > p .size-show").text(), {expires:30});
//			
//			//数量
//			$.cookie("pro-ammount" + proIndex, $("#wrap-product-detail .sum-box > b").text(), {expires:30});
//			
		}
	});

	
	
	
	
	/*-------商品详情和评论切换-----------*/
	$(".product-detail .more-detail .toggle-btn > span").on({
		click:function() {
			$(this).siblings().removeClass("select-btn");
			$(this).addClass("select-btn");
			
			var btnIndex = $(this).index();
			
			$(".product-detail .more-detail > div").not(":first").hide();
			$(".product-detail .more-detail > div").eq(btnIndex + 1).show();
			
		}
	});	

	
});