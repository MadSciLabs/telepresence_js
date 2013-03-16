  var BORDER_SIZE = 2;
  var OPACITY = .5;

  function obj_joystick(_x, _y, _size, _index)
  {
     this.x = _x;
     this.y = _y;
     this.size = _size;
     this.name_x = "joy_" + _index + "_x";
     this.name_y = "joy_" + _index + "_y";

     this.radius = _size * .5;
     this.small_radius = _size * .25;

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
       y: this.y+this.radius,
       x: this.x+this.radius,
       radius: this.radius,
       fill: 'cfcfcf',
       stroke: 'black',
       strokeWidth: 1,
       opacity: OPACITY
    });

    this.inside = new Kinetic.Circle({
       draggable: true,
       x: this.x+this.radius,
       y: this.y+this.radius,
       radius: this.small_radius,
       fill: 'blue',
       stroke: 'blue',
       strokeWidth: 0,
       opacity: OPACITY,

       dragBoundFunc: function(pos) {

         var _x = this.x;
         var _y = this.y;
         var _radius = 50; //this.radius;
         var scale = _radius / Math.sqrt(Math.pow(pos.x - _x, 2) + Math.pow(pos.y - _y, 2));

         if(scale < 1)
           return {
             y: Math.round((pos.y - _y) * scale + _y),
             x: Math.round((pos.x - _x) * scale + _x)
           };

         else
           return pos;
       }
    });

    this.xline = new Kinetic.Line({
        points: [this.x,this.y+this.radius,this.x+this.size,this.y+this.radius],
        stroke: 'black',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    this.yline = new Kinetic.Line({
        points: [this.x+this.radius, this.y, this.x+this.radius, this.y+this.size],
        stroke: 'black',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    this.circle.on('mousedown', function() {

        this.on = !this.on;
        var _color = this.on ? 'green' : 'red';
        this.setFill(_color);

        shapesLayer.draw();
        sb.send(this.name, "boolean", this.on);
    });

    this.frame.on('mousemove', function() {

        if (this.on) {
/*
          var p = this.inside.getPosition();
          var x = range(p.x,joy_range_x1,joy_range_x2,0,1023);
          var y = range(p.y,joy_range_y1,joy_range_y2,0,1023);

          //writeMessage(messageLayer, x + "," + y, joy_loc_x-unit_size, joy_loc_y-unit_size+20);
          sb.send("camera_x", "range", x);
          sb.send("camera_y", "range", y);
*/
        }
    });

    this.inside.on('dragstart', function() {
      this.on = true;
    });

    this.inside.on('dragend', function() {
      this.on = false;
    });

    this.inside.on('mouseover', function() {
      this.setOpacity(.7);
      shapesLayer.draw();
    });

    this.inside.on('mouseout', function() {
      this.setOpacity(.5);
      shapesLayer.draw();
    });

    //Init and add to SpaceBrew
    this.init = function()
    {
      shapesLayer.add(this.frame);
      shapesLayer.add(this.circle);
      shapesLayer.add(this.inside);
      shapesLayer.add(this.xline);
      shapesLayer.add(this.yline);

      sb.addPublish(this.name_x, "range");
      sb.addPublish(this.name_y, "range");
    };

}


