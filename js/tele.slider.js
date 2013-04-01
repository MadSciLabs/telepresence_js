  var BORDER_SIZE = 2;
  var OPACITY = .5;

  function obj_slider(_x, _y, _size, _index)
  {
     this.vertical = true;
     this.name = "slider_" + _index;
     this.size = _size;
     this.x = _x;
     this.y = _y;
     this.on = false;

     this.msgLayer = new Kinetic.Layer();
     this.nameLayer = new Kinetic.Layer();

     this.group = new Kinetic.Group({
       draggable: true
     });

     var _this = this;

     this.frame = new Kinetic.Rect({
        x: _x,
        y: _y,
        width: _size*.25,
        height: _size,
        stroke: 'black',
        strokeWidth: 2
     });

     this.xline = new Kinetic.Line({
        points: [_x, _y, _x+(.25*_size), _y],
        stroke: 'black',
        strokeWidth: 30,
        lineCap: 'butt',
        lineJoin: 'round',
        draggable: true,
        opacity: OPACITY,

        dragBoundFunc: function(pos) {

          groupP = _this.group.getPosition();
          console.log(groupP.x + "," + groupP.y);

          var y = pos.y > _size ? _size : pos.y;
          y = y < 0 ? 0 : y;

          return {
            y: y + groupP.y,
            x: groupP.x
          };
        }
     });

     this.group.add(this.frame);
     this.group.add(this.xline);

     this.group.on('dragstart', function() {
  
       p = _this.group.getPosition();
       writeMessage(_this.nameLayer, "", _this.x + p.x, _this.y + p.y + _this.size + 20);
     });

     this.group.on('dragend', function() {
  
       p = _this.group.getPosition();
       console.log("write frame : " + p.x + "," + p.y);
       writeMessage(_this.nameLayer, _this.name, _this.x + p.x, _this.y + p.y + _this.size + 20);
     });

     this.frame.on('mousemove', function() {

        if (_this.on) {

        var p = _this.xline.getPosition();
        var _ty = range(p.y,0,_this.size,1023,0);

        writeMessage(_this.msgLayer, _ty, _this.x+5, _this.y+20);
        sb.send(this.name, "range", _ty);
        }
     });

    this.xline.on('dragstart', function() {
      _this.on = true;
    });

    this.xline.on('dragend', function() {
      _this.on = false;
    });

    this.xline.on('mouseover', function() {
        this.setOpacity(.7);
        shapesLayer.draw();
    });

    this.xline.on('mouseout', function() {
        this.setOpacity(.5);
        shapesLayer.draw();
    });

     //Init and add to SpaceBrew
     this.init = function()
     {
       //shapesLayer.add(this.frame);
       //shapesLayer.add(this.xline);
       shapesLayer.add(this.group);

       stage.add(_this.msgLayer);
       stage.add(this.nameLayer);

       writeMessage(this.nameLayer, this.name, this.x, _this.y+this.size+20);

       sb.addPublish(this.name, "boolean");
     };
}


