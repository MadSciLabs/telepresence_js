  var BORDER_SIZE = 2;
  var OPACITY = .7;

  function obj_button(_x, _y, _size, _index)
  {
     var _this = this;

     this.x = _x;
     this.y = _y;
     this.size = _size;
     this.radius = .5 * _size;
     this.name = "button_" + _index;
     this.on = false;

     this.nameLayer = new Kinetic.Layer();

     this.group = new Kinetic.Group({
       draggable: true
     });

     this.frame = new Kinetic.Rect({
       y: this.y,
       x: this.x,
       width: this.size,
       height: this.size,
       stroke: 'black',
       strokeWidth: 1,
       opacity: 1
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

    this.group.add(this.frame);
    this.group.add(this.circle);

    this.circle.on('mousedown', function() {

        _this.on = !_this.on;
        var _color = _this.on ? 'green' : 'red';
        this.setFill(_color);

        shapesLayer.draw();

        sb.send(_this.name, "boolean", _this.on.toString());
    });

    this.circle.on('mouseover', function() {
        this.setOpacity(1);
        shapesLayer.draw();
    });

    this.circle.on('mouseout', function() {
        this.setOpacity(OPACITY);
        shapesLayer.draw();
    });

    this.group.on('dragend', function() {
      
      p = _this.group.getPosition();
      console.log("write frame : " + p.x + "," + p.y);
      writeMessage(_this.nameLayer, _this.name, _this.x + p.x, _this.y + p.y + _this.size + 20);
    });

    //Init and add to SpaceBrew
    this.init = function()
    {
      //shapesLayer.add(this.frame);
      //shapesLayer.add(this.circle);
      shapesLayer.add(this.group);

      stage.add(this.nameLayer);
      console.log("Init frame : " + _this.frame.getX() + "," + (1*_this.frame.getY()+_this.size+20));
      writeMessage(this.nameLayer, this.name, this.x, (1*this.y+this.size+20));

      sb.addPublish(this.name, "boolean");
    };
}


