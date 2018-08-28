/**
 * Stats Widget
 * ____________________________________________________________________________
 *
 * Requires installation of https://github.com/Chris911/iStats.
 *
 */

/**
 * Visual appearance configuration
 */
ui: {
  /* Temperature unit, either C or F */
  unit: 'C',

  /* Vertical position in PX, either top or bottom */
  top: '20',

  //bottom: '0',

  /* Horizontal position in PX, either left or right */
  left: '0',

  //right: '0',

  /* Stats color */
  color: '#666',

  /* Stats donut background color*/
  bgcolor: 'transparent',

  /* Stats width in PX */
  width: 74,

  /* Stats height in PX */
  height: 40,

  /* Stats radius in PX, needs be be at leat (width/2 - thickness) */
  radius: 18,

  /* Donut line thickness in PX */
  thickness: 2,

  /* Icon size in PX */
  iconsize: 18,

  /* Icon height in PX */
  iconheight: 40,

  /* Label font size in PX */
  fontsize: 10
}

/**
 * Path to istats binary.
 *
 * In case you use rvm or rbenv your istats binary might be
 * located somewhere else and this value needs modification.
 *
 * Try the following in your command line
 * $ which istats
 */
,command: '/usr/local/bin/istats'

,refreshFrequency: 5000

,render: function(output) {
  var data = this.parseOutput(output);
  var html  = '<div id="stats" ';
      html +=      'style="color: ' + this.ui.color + '; ';
  if (this.ui.top) {
      html +=           'top:' + this.ui.top + 'px; ';
  } else if (this.ui.bottom) {
      html +=           'bottom:' + this.ui.bottom + 'px; ';
  }
  if (this.ui.left) {
      html +=           'left:' + this.ui.left + 'px; ';
  } else if (this.ui.right) {
      html +=           'right:' + this.ui.right + 'px; ';
  }
  html += '">';

  if (data.cpu) {
      html += this.renderChart('CPU', 'icon-cpu', 100, 0);
  }

  if (data.battery) {
      html += this.renderChart('Battery', 'icon-carbattery', 100, 0);
  }

  if (data.fan) {
    for (var i = 0; i < data.fan['total-fans-in-system']; i++) {
      html += this.renderChart('Fan ' + i, 'icon-fan', 100, 0);
    }
  }
  html +=  '</div>';

  return html;
}

,update: function(output, domElement) {
  // we just assume max. values as they are not available via iStats
  var MAX_CPU = 90;
  var MAX_FAN = 5000;

  var data = this.parseOutput(output);
  var c = Math.floor(2 * Math.PI * this.ui.radius);

  if (data.cpu) {
    var temperature = (this.ui.unit.toUpperCase() === 'C')
                        ? Math.floor(data.cpu['cpu-temp']) + '°C'
                        : Math.floor(data.cpu['cpu-temp'] * 1.8 + 32) + '°F';

    $('#stats .cpu circle.bar').css('stroke-dasharray', Math.floor( (data.cpu['cpu-temp'] / MAX_CPU * 100) * c/100) + ' ' + c);
    $('#stats .cpu .temp').text(temperature);
  }

  if (data.battery) {
      var cur = data.battery['current-charge'][0];
      var max = data.battery['maximum-charge'][0];
      var percentage = data.battery['current-charge'][1] || Math.floor(cur / max * 100);
      $('#stats .battery circle.bar').css('stroke-dasharray', Math.floor( percentage * c/100) + ' ' + c);
      $('#stats .battery .temp').text(percentage + '%');
  }

  if (data.fan) {
    for (var i = 0; i < data.fan['total-fans-in-system']; i++) {
      $('#stats .fan-' + i + ' circle.bar').css('stroke-dasharray', Math.floor( (data.fan['fan-' + i + '-speed'] / MAX_FAN * 100) * c/100) + ' ' + c);
      $('#stats .fan-' + i + ' .temp').text(Math.floor(data.fan['fan-' + i + '-speed']) + ' RPM');
    }
  }
}

,renderChart: function(title, icon, percentage, temp) {
  var r = this.ui.radius;
  var c = Math.floor(2 * Math.PI * this.ui.radius);
  var p = c / 100 * percentage;

  var html  = '<div class="chart ' + title.replace(/\s/g, '-').toLowerCase() + '">';
      html +=       '<i class="icon ' + icon + '" style="font-size: ' + this.ui.iconsize + 'px; line-height:' + this.ui.iconheight + 'px"></i>';
      html +=       '<svg width="' + this.ui.width + 'px" height="' + this.ui.height + 'px">';
      html +=         '<circle class="bg" r="' + r + '" cx="' + (this.ui.width/2) + '" cy="' + (this.ui.height/2) + '"';
      html +=                ' style="stroke: ' + this.ui.bgcolor + '; stroke-width: ' + this.ui.thickness + '; stroke-dasharray: ' + c + ' ' + c + '"/>';
      html +=         '<circle class="bar" r="' + r + '" cx="' + (this.ui.width/2) + '" cy="' + (this.ui.height/2) + '" ';
      html +=                ' style="stroke: ' + this.ui.color + '; stroke-width: ' + this.ui.thickness + '; stroke-dasharray: ' + p + ' ' + c + '" />';
      html +=       '</svg>';
      html +=       '<div class="temp" style="font-size:' + this.ui.fontsize + 'px">' + temp + '</div>';
      html += '</div>';
  return html;
}

,parseOutput: function(output) {
  var out = output.split('\n');
  var o = {};
  var section;
  while (out.length > 0) {
    var line = out.shift();
    if (!line || line.match(/(\r|\n)/)) {
        section = undefined;
        continue;
    }
    if (line.match(/---.*?/)) {
      section = line.replace(/---\s+(.*?)\s+---/, '$1');
      continue;
    }

    var e = line.split(':');
    var k = e.length > 0 ? e[0].toLowerCase().replace(/\s/g, '-') : null;
    var v = e.length > 1 ? e[1].replace(/.*?(\d+)(\.\d{0,1})*.*/, '$1$2') : null;
    var p = e.length > 1 ? e[1].replace(/.*?\s+(\d{1,3})(\.\d{1})?\%.*/, '$1$2') : null;

    if (v === null) {
      continue;
    }
    if (section === 'CPU Stats') {
      o.cpu = o.cpu || {};
      o.cpu[k] = v;
    }
    if (section === 'Fan Stats') {
      o.fan = o.fan || {};
      o.fan[k] = v;
    }
    if (section == 'Battery Stats') {
      o.battery = o.battery || {};
      o.battery[k] = [v];
      if (!Number.isNaN(p)) {
          o.battery[k].push(Number.parseFloat(p));
      }
    }
  }

  return o;
}

,style: "                                                    \n\
  font-family: 'Helvetica Neue'                              \n\
  font-size: 16px                                            \n\
  width: 100%                                                \n\
  height: 100%                                               \n\
  transform: auto;                                           \n\
                                                             \n\
  @font-face                                                 \n\
    font-family: 'Icons';                                    \n\
    src: url('istats.widget/icons.ttf') format('truetype')   \n\
    font-weight: normal;                                     \n\
    font-style: normal;                                      \n\
                                                             \n\
  [class^='icon-'], [class*=' icon-']                        \n\
    font-family: 'Icons';                                    \n\
    background: none;                                        \n\
    width: auto;                                             \n\
    height: auto;                                            \n\
    font-style: normal                                       \n\
                                                             \n\
  #stats                                                     \n\
    position: absolute                                       \n\
    margin: 0 0                                              \n\
    padding: 0 0                                             \n\
                                                             \n\
  #stats .chart                                              \n\
    position: relative                                       \n\
    float: left                                              \n\
    margin: 0rem 0rem 0rem 0rem                              \n\
                                                             \n\
  #stats .chart i                                            \n\
    text-align: center                                       \n\
    position: absolute                                       \n\
    width: 100%                                              \n\
                                                             \n\
  #stats .chart .temp                                        \n\
    text-align: center                                       \n\
    display: block                                           \n\
                                                             \n\
  #stats .chart svg                                          \n\
    transform: rotate(-90deg)                                \n\
                                                             \n\
  #stats .chart circle                                       \n\
    fill: transparent                                        \n\
                                                             \n\
  #stats .chart .icon-cpu:before                             \n\
    content: '\\f002'                                        \n\
                                                             \n\
  #stats .chart .icon-carbattery:before                      \n\
    content: '\\f553'                                        \n\
                                                             \n\
  #stats .chart .icon-fan:before                             \n\
    content: '\\f66f'                                        \n\
"
