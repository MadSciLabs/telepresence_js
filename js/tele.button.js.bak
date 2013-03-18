  var BORDER_SIZE = 2;
  var OPACITY = .5;

  function obj_button(_x, _y, _size, _index)
  {
     this.x = _x;
     this.y = _y;
     this.size = _size;
     this.name = "button_" + _index;
     this.on = false;

     this.frame = new Kinetic.Rect({
       y: this.y,
       x: this.x,
       width: this.size,
       height: this.size,
       stroke: 'black',
       strokeWidth: 2
    });

    this.circle = new Kinetic.Circle({
       y: this.y,
       x: this.x,
       radius: this.size * .75,
       fill: 'red',
       stroke: 'black',
       strokeWidth: 2,
       opacity: OPACITY
    });

    this.circle.on('mousedown', function() {

        this.on = !this.on;
        var _color = this.on ? 'green' : 'red';
        this.setFill(_color);

        shapesLayer.draw();
        sb.send(this.name, "boolean", this.on);
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


