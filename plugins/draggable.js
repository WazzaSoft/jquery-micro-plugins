$.fn.draggable = function() {
  var elem = this;
  // When x and y are null, it indicates that no dragging is occurring.
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
      // Copy the current mouse move event and add deltaX and deltaY to it.
      var cpy = $.Event(e);
      cpy.type = "drag";
      cpy.deltaX = dx;
      cpy.deltaY = dy;
      $(this).trigger(cpy);
    }
  });
  return this;
};
