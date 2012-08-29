# Project: StickyNode jQuery Plugin
# Description: Allows an element of html node to be made "sticky", 
# 	e.g. when the window scroll below the element's top it will
#	start to float on the page at it's same position for the entire
#	height of the page.
# Author: farmetha
# License: MIT 
(($, window) ->
	pluginName = 'stickynode'
	document = window.document
	clone = null
	defaults = 
		offsetY: 0
		offsetX: 0
	
	class StickyNode
	
		# Constructor for the StickyNode class
		# @param element
		# @param option @see StickyNode::init
		constructor: (@element, options) ->
			@options = $.extend {}, defaults, options
			
			@_defaults = defaults
			@_name = pluginName
			
			@init()
		
		# Sets up our object
		init: ->
			node = $ @element
			xAndY = node.offset()
			@clone = node
				.clone()
				.hide()
				.appendTo(node.parent())
			rectangle = 
				position: 'fixed'
				top: xAndY.top
				left: xAndY.left
				width: node.width()
				height: node.height()
			@clone.css(rectangle)
			$(window).on "scroll.#{@_name}", => @window_scroll()
			@clone.data("#{@_name}.top", rectangle.top)
			return
		
		# Observer for the window scroll event, will show the clone if the scrolltop
		# is below our element top, else it will hide the clone.
		window_scroll: ->
			top = @clone.data("#{@_name}.top")
			if  $(window).scrollTop() > (top + @options.offsetY)
				@clone.show()
			else 
				@clone.hide()
			return
	# Set up our jquery.stickynode method.
	# @param options array
	#   offsetX - How far from the left of the page the element should float 
	#   offsetY - How far from the top of the page the element should float
	$.fn[pluginName] = (options) ->
		@each ->
			if !$.data(@, "plugin_#{@_name}")
				$.data(@, "plugin_#{@_name}", new StickyNode(@, options))
)(jQuery, window)