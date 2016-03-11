
$(document).ready(function(){
	/* Интервал смены слайдов | The interval slide change */
	$timeInterval = 3000;

	/* Инициализация | Initialization */
	$fullItems = 0;

	if ($("#slider_full_items > div").length) {
		$fullItems = $("#slider_full_items > div");
	}
	else {
		$("#slider_full_items").append( $(".slider_full_item") );
		$fullItems = $(".slider_full_item");
	}

	$fullItems.first().addClass("slider_full_item_active");
	$("#slider_items > div:first").addClass("slider_item_active");
	
	/*$fullItems.each(function(index){
		$(this).css({"right" : -$(this).outerWidth() * index});
	});*/
	
	$("#slider_items > div").click(function(){
		var $index = $(this).index();
		_slideChange($index);
	});
	/*-----------------------------------*/


	/* Назначение кнопок | The buttons */
	$("#slider_next").click(function(){
		_slideTo("next");
	});

	$("#slider_prev").click(function(){
		_slideTo("prev");
	});
	/*-----------------------------------*/

	/* Создаем интервал и запускаем первый слайд | Create an interval and start the first slide */
	//$sliderInterval = setInterval(function() {_slideTo("next");}, $timeInterval);
	_slideChange(0);
	/*-----------------------------------*/
	
});

function _slideChange($index) {
	//clearInterval($sliderInterval);
	//$sliderInterval = setInterval(function() {_slideTo("next");}, $timeInterval);

	$("#slider_items > div").removeClass("slider_item_active");
	$fullItems.each(function(index){
		//console.log($index);
		$(this).removeClass("slider_full_item_active").removeClass("slider_full_item_next").removeClass("slider_full_item_prev");
		if (($index - index) == 0) {
			$(this).addClass("slider_full_item_active");
			$("#slider_items > div").eq($index).addClass("slider_item_active");
		}

		if (($index - index) == 1) {
			$(this).addClass("slider_full_item_prev");
		}

		if (($index - index) == -1) {
			$(this).addClass("slider_full_item_next");
		}

		if ($index + 1 == $fullItems.length) {
			$fullItems.eq(0).addClass("slider_full_item_next");
		}

		if ($index == 0) {
			$fullItems.last().addClass("slider_full_item_prev");
		}
	});
	
	_slideAnimate($way);
	_slideProgress();
	
	console.log($index);
	console.log($fullItems.length);

	
}

function _slideTo($way) {
	var $index = $("#slider_full_items > div.slider_full_item_active").index();
	//console.log($index);
	var $lastFullItem = $("#slider_full_items > div:last").index();
	//console.log($lastFullItem);
	if ($way == "next") {
		$index += 1;
		if ($index > $lastFullItem)
			$index = 0;
	}
	else if ($way == "prev") {
		$index -= 1;
		if ($index < $("#slider_full_items > div:first").index())
			$index = $lastFullItem;
	}
	_slideChange($index);
}

function _slideAnimate($way) {
	var $slide = $("div.slider_full_item_active");
	var $slideNext = $("div.slider_full_item_next");
	var $slidePrev = $("div.slider_full_item_prev");

	$slideNext.css("display","block");
	$slidePrev.css("display","block");

	$slide.animate({"left" : "0px"});
	if ($way == "next") {
		$slidePrev.animate({"left" : $slide.outerWidth() * -1}, function(){$(this).css("display","none");});
		$slideNext.css({"left" : $slide.outerWidth() * 1, "display" : "none"});
	}
	else if ($way == "prev") {
		$slidePrev.css({"left" : $slide.outerWidth() * -1, "display" : "none"});
		$slideNext.animate({"left" : $slide.outerWidth() * 1}, function(){$(this).css("display","none");});
	}
	
	//$slide.animate({"right" : $slide.outerWidth() * ($indexTo - $index)});
}

function _slideProgress() {
	var $sliderLoading = $("#slider_loading");

	if ($sliderLoading.length) {
		$sliderLoading.stop().css({"width" : "0px"});
		$sliderLoading.animate({"width" : "100%"}, $timeInterval, "linear", function(){ $(this).css({"width" : "0px"}); });
	}
}