  var BORDER_SIZE = 2;
  var OPACITY = .5;

  function obj_slider(_x, _y, _size, _index, _range_l, _range_h)
  {
     this.vertical = true;
     this.name = "slider_" + _index;
     this.size = _size;
     this.x = _x;
     this.y = _y;
     this.range_l = _range_l;
     this.range_h = _range_h;

     this.on = false;

     this.range_low;
     this.range_high;

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

          var y = pos.y > _size+groupP.y ? _size+groupP.y : pos.y;
          y = y < groupP.y ? groupP.y : y;

          //Spacebrew to
          var p = _this.xline.getPosition();
          var _ty = range(p.y,0,_this.size,1023,0);
          writeMessage(_this.msgLayer, _ty, _this.x+5+groupP.x, _this.y+20+groupP.y);

	  console.log("write range : " + _ty);
          sb.send(_this.name, "range", String(_ty));

          return {
            y: y,
            //y: y + groupP.y,
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
       writeMessage(_this.nameLayer, _this.name, _this.x + p.x, _this.y + p.y + _this.size + 20);
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
       shapesLayer.add(this.group);

       stage.add(this.msgLayer);
       stage.add(this.nameLayer);

       writeMessage(this.nameLayer, this.name, this.x, this.y+this.size+20);

       sb.addPublish(this.name, "range", "1023");
     };
}


