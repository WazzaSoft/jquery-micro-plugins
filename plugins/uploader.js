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
