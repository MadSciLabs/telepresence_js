  var BORDER_SIZE = 2;

  function obj_led(_x, _y, _size, _index)
  {
     this.x = _x;
     this.y = _y;
     this.size = _size;
     this.radius = .5 * _size;
     this.border = .1 * _size;
     this.name = "led_" + _index;
     this.on = false;

     this.opacity = .1;
     this.frame = new Kinetic.Rect({
       y: this.y,
       x: this.x,
       width: this.size,
       height: this.size,
       stroke: 'gray',
       strokeWidth: 1
    });

    this.led = new Kinetic.Rect({
       y: this.y + this.border,
       x: this.x + this.border,
       width: this.size - 2*this.border,
       height: this.size - 2*this.border,
       fill: 'yellow',
       opacity: this.opacity
    });

    this.setLed = function(_val)
    {
       if (_val) {
         this.led.setOpacity(1);
       } else {
         this.led.setOpacity(OPACITY);
       }
       shapesLayer.draw()
    }

    //Init and add to SpaceBrew
    this.init = function()
    {
      shapesLayer.add(this.frame);
      shapesLayer.add(this.led);

      sb.addSubscribe(this.name, "boolean");
    };

}


