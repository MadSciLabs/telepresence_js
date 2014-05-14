  var BORDER_SIZE = 2;

  function obj_led(_x, _y, _size, _index)
  {
     var _this = this;

     this.x = _x;
     this.y = _y;
     this.size = _size;
     this.radius = .5 * _size;
     this.border = .1 * _size;
     this.name = "led_" + _index;
     this.on = false;

     this.nameLayer = new Kinetic.Layer();

     //writeMessage(this.msgLayer, "1", this.x+5, this.y+5);

     this.group = new Kinetic.Group({
       draggable: true
     });

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
       fill: 'red',
       opacity: this.opacity
    });

    this.group.add(this.frame);
    this.group.add(this.led);

    this.group.on("dragend", function() {

      p = _this.group.getPosition();
      writeMessage(_this.nameLayer, _this.name, _this.x+p.x, _this.y + p.y + _this.size + 20);
    });

    this.setLed = function(_val)
    {
       if (_val == true) {
       console.log("yes");
         this.led.setOpacity(1);
       } else {
       console.log("no");
         this.led.setOpacity(.1);
       }
       shapesLayer.draw()
    }

    //Init and add to SpaceBrew
    this.init = function()
    {
      shapesLayer.add(this.group);

      stage.add(this.nameLayer);
    
      _this.setLed(false);
      writeMessage(this.nameLayer, this.name, this.x, (1*this.y+this.size+20));
      sb.addSubscribe(this.name, "boolean");
    };

}


