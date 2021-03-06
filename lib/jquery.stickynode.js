// Generated by CoffeeScript 1.3.3

(function($, window) {
  var StickyNode, defaults, document, pluginName;
  pluginName = 'stickynode';
  document = window.document;
  defaults = {
    offsetY: 0
  };
  StickyNode = (function() {

    function StickyNode(element, options) {
      this.element = element;
      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      this.init();
    }

    StickyNode.prototype.init = function() {
      var node, rectangle, xAndY,
        _this = this;
      node = $(this.element);
      xAndY = node.offset();
      this.clone = node.clone().hide().appendTo(node.parent());
      rectangle = {
        position: 'fixed',
        top: this.options.offsetY,
        left: xAndY.left,
        margin: 0,
        width: node.width(),
        height: node.height()
      };
      this.clone.css(rectangle);
      $(window).on("scroll." + this._name, function() {
        return _this.window_scroll();
      });
      $(window).on("resize." + this._name, function() {
        return _this.window_resize();
      });
      this.clone.data("" + this._name + ".top", xAndY.top);
    };

    StickyNode.prototype.window_scroll = function() {
      var top;
      top = this.clone.data("" + this._name + ".top");
      if ($(window).scrollTop() > (top - this.options.offsetY)) {
        $(this.element).css('visibility', 'hidden');
        this.clone.show();
      } else {
        $(this.element).css('visibility', '');
        this.clone.hide();
      }
    };

    StickyNode.prototype.window_resize = function() {
      this.clone.css({
        left: $(this.element).offset().left
      });
    };

    return StickyNode;

  })();
  return $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + this._name)) {
        return $.data(this, "plugin_" + this._name, new StickyNode(this, options));
      }
    });
  };
})(jQuery, window);
