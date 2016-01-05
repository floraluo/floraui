
+(function ($) {
	'use strict';

	// Scratchcard PUBLIC CLASS DEFINITION
	// ===============================

	var Scratchcard = function(element, options){
		this.options = null;
		this.$element = null;
		this.canvas = null;
		this.img = null;
		this.context = null;
		this.x = null;
		this.y = null;

		this.isDown = false;
		this.init(element, options);
	}
	// layer: 1 图层是图片；layer: 2 图层是纯色
	Scratchcard.DEFAULTS = {
		layer: 1
	}
	Scratchcard.prototype.init = function(element, options){
		this.options = $.extend({},Scratchcard.DEFAULTS, options);
		this.$element = $(element);
		this.canvas = this.$element.find("canvas");
		this.offset = this.canvas.offset();
		this.context = this.canvas[0].getContext('2d');

		if(this.options.layer == 1){
			this.img = this.$element.find('.layer');
			this.img.on("load.scratchcard", $.proxy(this.drawImage, this));			
		}else if( this.options.layer == 2){
			this.setLayer();
		}
		this.setLine();
		this.canvas.on({
			'mousedown.scratchcard' : $.proxy(this.onDown, this),
			'touchstart.scratchcard' : $.proxy(this.onDown, this),
			'mousemove.scratchcard' : $.proxy(this.onMove, this),
			'touchmove.scratchcard' : $.proxy(this.onMove, this),
			'mouseup.scratchcard' : $.proxy(this.onUp, this),
			'touchend.scratchcard' : $.proxy(this.onUp, this)
		});
	}
	// 绘制图层
	Scratchcard.prototype.setLayer = function(){
		var canvas = this.canvas,
			width = canvas.attr("width"),
			height = canvas.attr("height")
		// this.context.fillStyle = "transparent";
		// this.context.fillRect(0, 0, width, height);
		this.context.fillStyle = "#808080";
		this.context.fillRect(0, 0, width, height);
		this.context.globalCompositeOperation = "destination-out";
	}
	// 绘制图像
	Scratchcard.prototype.drawImage = function(){
		var canvas = this.canvas,
			width = canvas.attr("width"),
			height = canvas.attr("height")
		this.context.drawImage(this.img[0], 0, 0, width, height);
		this.context.globalCompositeOperation = "destination-out";
	}

	// 设置线条：两线相交拐角为round，线条宽度20
	Scratchcard.prototype.setLine = function(){
		var context = this.context;
		// context.strokeStyle = '#f00';
		context.lineJoin = "round";
		context.lineWidth = 20;
	}

	// 设置路径起始位置
	Scratchcard.prototype.onDown = function(e){
		this.context.beginPath();
		this.x = e.pageX - this.offset.left;
		this.y = e.pageY - this.offset.top;
		this.context.moveTo(this.x, this.y);
		this.isDown = true;
	}

	// 创建滑动路径
	Scratchcard.prototype.onMove = function(e){
		if(this.isDown){
			this.x = e.pageX - this.offset.left;
			this.y = e.pageY - this.offset.top;
			this.context.lineTo(this.x, this.y);
			this.context.stroke();
		}
	}

	// 离开页面
	Scratchcard.prototype.onUp = function(){
		this.isDown = false;
	}


	// Scratchcard PLUGIN DEFINITION
	// =========================

	function Plugin(option) {
	  return this.each(function () {
	    var $this   = $(this)
	    var data    = $this.data('scratchcard')
	    var options = typeof option == 'object' && option

	    if (!data) $this.data('scratchcard', (data = new Scratchcard(this, options)))
	    // if (typeof option == 'string') data[option]()
	  })
	}

	var old = $.fn.scratchcard

	$.fn.scratchcard             = Plugin
	$.fn.scratchcard.Constructor = Scratchcard


	// Scratchcard NO CONFLICT
	// ===================

	$.fn.scratchcard.noConflict = function () {
	  $.fn.scratchcard = old
	  return this
	}
})(jQuery);