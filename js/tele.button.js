  var BORDER_SIZE = 2;
  var OPACITY = .5;

  function obj_button(_x, _y, _size, _index)
  {
     _this = this;

     this.x = _x;
     this.y = _y;
     this.size = _size;
     this.radius = .5 * _size;
     this.name = "button_" + _index;
     this.on = false;

     this.frame = new Kinetic.Rect({
       y: this.y,
       x: this.x,
       width: this.size,
       height: this.size,
       stroke: 'black',
       strokeWidth: 1
    });

    this.circle = new Kinetic.Circle({
       y: this.y + this.radius,
       x: this.x + this.radius,
       radius: this.radius * .75,
       fill: 'red',
       stroke: 'black',
       strokeWidth: 2,
       opacity: OPACITY
    });

    this.circle.on('mousedown', function() {

        _this.on = !_this.on;
        var _color = _this.on ? 'green' : 'red';
        this.setFill(_color);

        shapesLayer.draw();
        sb.send(this.name, "boolean", _this.on);
    });

    this.circle.on('mouseover', function() {
        this.setOpacity(1);
        shapesLayer.draw();
    });

    this.circle.on('mouseout', function() {
        this.setOpacity(.5);
        shapesLayer.draw();
    });

    //Init and add to SpaceBrew
    this.init = function()
    {
      shapesLayer.add(this.frame);
      shapesLayer.add(this.circle);

      sb.addPublish(this.name, "boolean");
    };

}


