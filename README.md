# jQuery Micro Plugins

A collection of micro [jQuery](https://jquery.com/) plugins.

Each section below contains the entire code for the plugin and instructions on how to use it.

- [Draggable](#draggable)
- [Uploader](#uploader)

<a name="draggable"></a>
## Draggable

Allows mouse drag event binding on elements.

<details>
<summary>Code</summary>
```javascript
(function($) {

  $.fn.draggable = function() {
    var elem = this;

    // When x and y are null, it indicates that no dragging is occurring.
    var x = null;
    var y = null;

    this.on('mousedown', function(e) {
      x = e.clientX;
      y = e.clientY;
      elem.addClass('dragging');
    });
    this.on('mouseup', function(e) {
      x = null;
      y = null;
      elem.removeClass('dragging');
    });
    this.on('mousemove', function(e) {
      if (x !== null && y !== null) {
        var dx = e.clientX - x;
        var dy = e.clientY - y;
        x = e.clientX;
        y = e.clientY;
        // Copy the current mouse move event and add deltaX and deltaY to it.
        var cpy = $.Event(e);
        cpy.type = 'drag';
        cpy.deltaX = dx;
        cpy.deltaY = dy;
        $(this).trigger(cpy);
      }
    })
    return this;
  }
})(window.jQuery);
```
</details>

**Usage**

Enable draggability: `$(selector).draggable()`

Bind to drag event: `$(selector).on('drag', callback)`

The callback function will be given an event object identical to a `mousemove` event with a `deltaX` and `deltaY` property.

While dragging, the element will be given the `dragging` css class.

**Example**

[fiddle](https://jsfiddle.net/6khhueba/)

Allows a container's contents to be pannable by dragging the middle mouse button.

```javascript
$('#my-container').draggable().on('drag', function(e) {
  if (e.which === 2) {
    var top = $(this).scrollTop();
    var left = $(this).scrollLeft();
    $(this).scrollTop(top - e.deltaY);
    $(this).scrollLeft(left - e.deltaX);
  }
});

```

<a name="uploader"></a>
## Uploader

A small wrapper for `FileReader` that makes using local images easier for front end applications.

<details>
<summary>Code</summary>
```javascript
$.fn.uploader = function() {
  this.on('change', function(evt) {
    for (let file of evt.target.files) {
      if (file.type.match(/image.*/)) {
        let reader = new FileReader();
        reader.onload = (e) => {
          let event = $.Event('upload');
          event.image = e.target.result;
          $(this).trigger(event, e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  });
  return this;
}
```
</details>

**Usage**

Enable uploading on file input: `$(selector).uploader()`

Watch for a file to be selected: `$(selector).on('upload', callback)`

The callback function will be given an event parameter that has an `image` property; it will be the base64 encoded image data.

**Example**

[fiddle](https://jsfiddle.net/eg0mm3zk/)

Appends an image to the page without having to upload it to the back end:

```javascript
$('#file').uploader().on('upload', function(e) {
  $('body').append($('<img />', {src: e.image}));
});
```
