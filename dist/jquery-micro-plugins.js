(function($) {
  $.fn.draggable = function() {
    var elem = this;
    var x = null;
    var y = null;
    this.on("mousedown", function(e) {
      x = e.clientX;
      y = e.clientY;
      elem.addClass("dragging");
    });
    this.on("mouseup", function(e) {
      x = null;
      y = null;
    });
    this.on("mousemove", function(e) {
      if (x !== null && y !== null) {
        var dx = e.clientX - x;
        var dy = e.clientY - y;
        x = e.clientX;
        y = e.clientY;
        var cpy = $.Event(e);
        cpy.type = "drag";
        cpy.deltaX = dx;
        cpy.deltaY = dy;
        $(this).trigger(cpy);
      }
    });
    return this;
  };
  $.fn.uploader = function() {
    this.on("change", function(evt) {
      var elem = $(this);
      for (var i = 0; i < evt.target.files.length; i++) {
        var file = evt.target.files[i];
        if (file.type.match(/image.*/)) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var event = $.Event("upload");
            event.image = e.target.result;
            elem.trigger(event, e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    });
    return this;
  };
})(window.jQuery);
