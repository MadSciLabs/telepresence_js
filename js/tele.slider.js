  var BORDER_SIZE = 2;
  var OPACITY = .5;

  function obj_slider(_x, _y, _size, _index)
  {
     this.vertical = true;
     this.name = "slider_" + _index;
     this.size = _size;
     this.x = _x;
     this.y = _y;

     this.frame = new Kinetic.Rect({
        x: _x,
        y: _y,
        width: _size*.25,
        height: _size,
        stroke: 'black',
        strokeWidth: 2
     });

     this.xline = new Kinetic.Line({
        points: [_x, _y, _x+_size, _y],
        stroke: 'black',
        strokeWidth: 30,
        lineCap: 'butt',
        lineJoin: 'round',
        draggable: true,
        opacity: OPACITY,
        dragBoundFunc: function(pos) {

          var y = pos.y > _size ? _size : pos.y;
          y = y < -_size ? -_size : y;
          return {
            y: y,
            x: 0
          };
        }
     });

     this.xline.on('mousemove', function() {

        var p = this.getPosition();
        var _ty = range(p.y,this.y,this.y+this.size,0,1023);

        writeMessage(messageLayer, ","+_ty, this.size, 20);
        sb.send(this.name, "range", _ty);
     });

     //Init and add to SpaceBrew
     this.init = function()
     {
       shapesLayer.add(this.frame);
       shapesLayer.add(this.xline);

       sb.addPublish(this.name, "boolean");
     };
}


