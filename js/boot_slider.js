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
	
	$fullItems.each(function(index){
		$(this).css({"right" : -$(this).outerWidth() * index});
	});
	
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
	//_slideTo(0);
	/*-----------------------------------*/
	
});

function _slideChange($index) {
	//clearInterval($sliderInterval);
	//$sliderInterval = setInterval(function() {_slideTo("next");}, $timeInterval);

	$("#slider_items > div").removeClass("slider_item_active");

	$fullItems.each(function(index){
		//console.log($index);
		$(this).removeClass("slider_full_item_active");
		if (($index - index) == 0) {
			$(this).addClass("slider_full_item_active");

			$("#slider_items > div").eq($index).addClass("slider_item_active");
		}
			
		_slideAnimate( $(this), $index, index);
	});

	_slideProgress();
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

function _slideAnimate($slide, $indexTo, $index) {
	$slide.animate({"right" : $slide.outerWidth() * ($indexTo - $index)});
}

function _slideProgress() {
	var $sliderLoading = $("#slider_loading");

	if ($sliderLoading.length) {
		$sliderLoading.stop().css({"width" : "0px"});
		$sliderLoading.animate({"width" : "100%"}, $timeInterval, "linear", function(){ $(this).css({"width" : "0px"}); });
	}
}