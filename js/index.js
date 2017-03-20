/*
 * 
 * -------------首页脚本
 * 
 */
$(function() {
	
/*************************大轮播图开始****************************/	
	//点击左右按钮切换
	//声明保存图片序号的变量
	var bannerleftCount = 1;
	$(".bigbanner-box .btn").on({
		click:function() {
			//判断点击的按钮
			$(this).hasClass("right-btn") ? ++bannerleftCount : --bannerleftCount;
			//运动
			slider();
		}
	})
	
	//点击tab切换图片
	$(".banner-tab li").on({
		click:function() {
			//将图片序号和tab li 下标关联
			bannerleftCount = $(this).index() + 1;
			//切换图片
			slider();
			
		}
	})
	
	//自动运动
	var bannerTimerId = autoSlider();
	
	//鼠标悬停停止计时器
	$(".bigbanner-box").on({
		mouseenter:function() {
			clearInterval(bannerTimerId);
		},
		mouseleave:function() {
			bannerTimerId = autoSlider();
		}
		
	})
	
	//第一张描述图片自动运动
	descriptionImgMove();
	
/*************************大轮播封装函数区开始******************************/
	
	//动画函数
	function slider() {
		//判断边界
		//3 ---> 1
		if (bannerleftCount == 4) {
			//目标位置
			bannerleftCount = 1;
			//动画前调到的位置
			$(".bigbanner").css({
				left:0
			})	
		//3 < ----- 1
		}else if (bannerleftCount == 0) {
			//目标位置
			bannerleftCount = 3;
			//动画前调到的位置
			$(".bigbanner").css({
				left:-1920 * 4
			})
		}
		
		//动画执行
		$(".bigbanner").stop().animate({
			left:-1920 * bannerleftCount
		},descriptionImgMove);
		
		//改变tab样式
		$(".banner-tab li").removeClass("select");
		$(".banner-tab li").eq(bannerleftCount - 1).addClass("select");
		
		//描述图片还原初始
		$(".bigbanner li .horizontal-move").css({
			left:-50,
			opacity:0
		})
		
		$(".bigbanner li .vertical-move").css({
			top:50,
			opacity:0
		})	
	}

	//自动运动函数
	function autoSlider() {
		var bannerTimer = setInterval(function() {
		++bannerleftCount;
		slider();
		},5000);
		return bannerTimer;
	}
	
	//回调描述图移动函数
	function descriptionImgMove() {

		var $descritionImgObj = $(".bigbanner li .descrition-img");
		if (bannerleftCount == 1 || bannerleftCount == 2) {
			
			//运动
			$descritionImgObj.eq(bannerleftCount - 1).animate({
				left:0,
				opacity:1
			},1000);
		}else if (bannerleftCount == 3) {
			//运动
			$descritionImgObj.eq(bannerleftCount - 1).animate({
				top:0,
				opacity:1
			},1000);
		}
		
	}
	
/*************************大轮播封装函数区结束******************************/
/*************************大轮播图结束****************************/

/*****************************系列列表开始************************/
//鼠标移入li mask和buttn 显示
$(".series-list > li dt").on({
	mouseenter:function() {
		$(this).find(".img-mask").show();
		$(this).find(".shop-btn").show();
	},
	mouseleave:function() {
		$(this).find(".img-mask").hide();
		$(this).find(".shop-btn").hide();
	}
});

//鼠标移入shop-btn mask动画显示
$(".series-list > li dt .shop-btn").on({
	mouseenter:function() {
		console.log(11)
		$(this).find(".btn-mask").stop().animate({
			left:0
		});
		$(this).find("a:first-child").css({
			color:"black"
			});
	},
	mouseleave:function() {
		$(this).find(".btn-mask").stop().animate({
			left:"-110px"
		});
		$(this).find("a:first-child").css({
			color:"#fff"   
		});   //---------------略微有些bug：文字颜色能用动画效果吗？为什么加了没反应？
	}
});
/*****************************系列列表结束************************/

/*****************************小轮播图开始*********************************/
//鼠标移入大图显示按钮
$(".small-bannerBox .bannerBox").on({
	mouseenter:function() {

		$(this).find(".side-btn").fadeIn();
	},
	mouseleave:function() {
		$(this).find(".side-btn").fadeOut();
	}
});


//轮播
//记录banner图片序号
var leftCount = 1;
var rightCount = 1;

/*-----------左边-------------*/
$(".left .side-btn").on({
	click:function() {
		$(this).hasClass("right-btn") ? ++leftCount : --leftCount;
		//调用边界切换方法
		leftCount = countCal(leftCount, $(".left"));
		//运动
		smallBannerSlider(leftCount, $(".left"));

	}
});

//自己运动
var smallLeftBanerTimer = setInterval(function() {
	leftCount++;
	leftCount = countCal(leftCount, $(".left"));
	smallBannerSlider(leftCount, $(".left"));
},3000);

/*-----------右边-------------*/
$(".right .side-btn").on({
	click:function() {
		$(this).hasClass("right-btn") ? ++rightCount : --rightCount;
		//调用边界切换方法
		rightCount = countCal(rightCount, $(".right"));

		//运动
		smallBannerSlider(rightCount, $(".right"));	
	}
});

//自己运动
var smallLeftBanerTimer = setInterval(function() {
	rightCount++;
	rightCount = countCal(rightCount, $(".right"));
	smallBannerSlider(rightCount, $(".right"));
},5000);


/*---------------封装函数区-----------------*/
function smallBannerSlider(count,$obj) { //把父元素传进去
	//判断边界

	//改变描述文字
	$obj.find(".pro-description span").removeClass();
	$obj.find(".pro-description h4 span").eq(count - 2).addClass("hide"); //eq -- 0 1 leftCount 1 2 3 
	$obj.find(".pro-description p span").eq(count - 2).addClass("hide");
	
	//改变焦点样式
	$obj.find(".bottom-btn li").removeClass();
	$obj.find(".bottom-btn li").eq(count - 1).addClass("select");
	
	//运动
	$obj.find(".banner").stop().animate({
		left:-580 * count
	});
	
}

//边界切换
function countCal(count,$obj) {
	if (count == 3) {
	//目标位置
	count = 1;
	//起始位置
	$($obj).find(".banner").css({
		left:0
	});
	}else if (count == 0) {
		//目标位置
		count = 2;
		//起始位置		
		$($obj).find(".banner").css({
			left:-580 * 3
		});
	}
	return count;
}

/*****************************小轮播图结束*********************************/

/*************************商品列表开始*********************************/
/*
 * 列表动画思路：
 * 1. dl向上移动
 * 2. 小鞋列表height增加
 * 3. 购买按钮高度增加
 * 4. 增加阴影
 */
//定义全局变量记录最开始显示的商品图的下标-------------------------下面切换图片事件用到，在这里定义
var selectIndex = 0;

$("#wrap-product-list .product-list > li").on({
	mouseenter:function() {
		$(this).css({
			"z-index":30
		});
		//1. dl向上移动
		$(this).find("dl").stop().animate({
			top:-5,			
		},"fast");
		//2. 小鞋列表height增加
		$(this).find(".small-img").stop().animate({
			height:32
		},"fast");
		//3. 购买按钮高度增加
		$(this).find(".buy-btn").show().stop().animate({
			height:30
		},"fast");
		
		//记录最开始显示的商品图的下标 --------------------------下面切换图片事件用到，在这里获取
		var $selectObj = $(this).find('dt .select');
		selectIndex = $(this).find("dt > a").index($selectObj);
		
	},
	mouseleave:function() {
		$(this).css({
			"z-index":0
		});
		
		$(this).find("dl").stop().animate({
			top:0,			
		},"fast");
		$(this).find(".small-img").stop().animate({
			height:0
		},"fast");
		$(this).find(".buy-btn").stop().animate({
			height:0
		},"fast",function() {
			$(this).hide();
		});
	}
});

//
//移入小图标切换大图
$("#wrap-product-list .product-list > li .small-img > a").on({
	mouseenter:function() {
		//切换大图
		$(this).parents("dl").find("dt > a").removeClass("select").eq($(this).index()).addClass("select");
		
	},
	//移出恢复原图 ------------不用恢复
//	mouseleave:function() {
//		//先移除所有图片的select ---------利用之前获取的selectIndex变量
//		$(this).parents("dl").find("dt > a").removeClass("select");
//		//再给原图加select
//		$(this).parents("dl").find("dt > a").eq(selectIndex).addClass("select");
//	}
})

//移入购买按钮动画变色   ---------------用css3写了,如果用jq写选不中:afeter伪类中，改不了效果  -- jq能选中:after吗？
/*
$("#wrap-product-list .product-list > li dd .buy-btn").on({
	mouseenter:function() {
		$(this).find(":after").animate({
			left:0
		});
	},
	mouseleave:function() {
		$(this).find(":after").animate({
			left:"-100%"
		});
	}
})
*/

//---------------------------字体颜色的渐变，除了用css3外，也可以改变他的16进制数
/*************************商品列表结束*********************************/
});








//
//$(".tag li").removeClass("className");
//$(".tag").each(function() {
//	$(this).find("li").eq(count - 1).addClass("className");
//});