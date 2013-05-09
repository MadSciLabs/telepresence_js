  var BORDER_SIZE = 2;
  var OPACITY = .5;

  function obj_joystick(_x, _y, _size, _index)
  {
     //So this i can use 'this' reference within another context
     var _this = this;

     this.x = _x;
     this.y = _y;

     this.size = _size;

     this.name_x = "joy_" + _index + "_x";
     this.name_y = "joy_" + _index + "_y";

     this.radius = _size * .5;
     this.small_radius = _size * .125;

     this.on = false;

     this.range_x1 = this.x + this.small_radius;
     this.range_x2 = this.x + this.size - this.small_radius;

     this.range_y1 = this.y + this.small_radius;
     this.range_y2 = this.y + this.size - this.small_radius;

     this.msgLayer = new Kinetic.Layer();
     this.nameLayer = new Kinetic.Layer();

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

         groupP = _this.group.getPosition();

         _radius = _this.radius - _this.small_radius;
         _x = _this.x + _radius + _this.small_radius + groupP.x;
         _y = _this.y + _radius + _this.small_radius + groupP.y;

         var scale = _radius / Math.sqrt(Math.pow(pos.x - _x, 2) + Math.pow(pos.y - _y, 2));

         //Write to SB
         p = _this.inside.getPosition();
         var x = range(p.x,_this.range_x1,_this.range_x2,0,1023);
         //var x = range(p.x+groupP.x,_this.range_x1,_this.range_x2,0,1023);
         var y = range(p.y,_this.range_y1,_this.range_y2,0,1023);

         writeMessage(_this.msgLayer, x + ", " + y, _this.x+5+groupP.x, _this.y+20+groupP.y);

         sb.send(_this.name_x, "range", x);
         sb.send(_this.name_y, "range", y);

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

    this.group = new Kinetic.Group({
        draggable: true
    });

    this.group.add(this.frame);
    this.group.add(this.circle);
    this.group.add(this.inside);
    this.group.add(this.xline);
    this.group.add(this.yline);

    this.circle.on('mousemove', function() {

        if (_this.on) {
console.log('mousemove on');

          p = _this.inside.getPosition();

          var x = p.x + groupP.x; //range(p.x+groupP.x,_this.range_x1,_this.range_x2,0,1023);
          var y = p.y + groupP.y; //range(p.y+groupP.y,_this.range_y1,_this.range_y2,0,1023);

          writeMessage(_this.msgLayer, x + ", " + y, _this.x+5, _this.y+20);

          sb.send(_this.name_x, "range", x);
          sb.send(_this.name_y, "range", y);

        }
    });

    this.inside.on('dragstart', function() {
console.log('dragstart');

      _this.on = true;
    });

    this.inside.on('dragend', function() {
console.log('drag end');
      _this.on = false;
    });

    this.inside.on('mouseover', function() {
      this.setOpacity(.7);
      shapesLayer.draw();
    });

    this.inside.on('mouseout', function() {
      this.setOpacity(.5);
      shapesLayer.draw();
    });

    this.inside.on('mousemove', function() {
console.log(">");
    });

    this.group.on('dragend', function() {
      var mousePos = stage.getMousePosition();

      p = _this.group.getPosition();
      writeMessage(_this.nameLayer, _this.name_x+", "+_this.name_y, _this.x + p.x, _this.y + p.y + _this.size + 20);
    });

    //Init and add to SpaceBrew
    this.init = function()
    {

      shapesLayer.add(this.group);

      stage.add(this.msgLayer);
      stage.add(this.nameLayer);

      writeMessage(this.nameLayer, this.name_x+", "+this.name_y, this.x, _this.y+this.size+20);

      sb.addPublish(this.name_x, "range");
      sb.addPublish(this.name_y, "range");
    };
}


