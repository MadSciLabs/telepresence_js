  var BORDER_SIZE = 2;
  var OPACITY = .5;

  function obj_led(_x, _y, _size, _index)
  {
     this.x = _x;
     this.y = _y;
     this.size = _size;
     this.radius = .5 * _size;
     this.name = "led_" + _index;
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
       radius: this.radius * .5,
       fill: 'yellow',
       stroke: 'yellow',
       strokeWidth: 2,
       opacity: OPACITY
    });

    //Init and add to SpaceBrew
    this.init = function()
    {
      shapesLayer.add(this.frame);
      shapesLayer.add(this.circle);

      sb.addPublish(this.name, "boolean");
    };

}


