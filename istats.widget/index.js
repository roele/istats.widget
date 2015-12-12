/**
 * Stats Widget
 * ____________________________________________________________________________
 *
 * Requires installation of https://github.com/Chris911/iStats.
 *
 */

ui: {
  top: '1rem',
  left: '1rem',
  color: '#fff',
  bgcolor: 'transparent',
  width: 80,
  height: 80,
  radius: 30,
  thickness: 8,
  iconsize: 2,
  iconheight: 4.825,
  displaylabel: 'block',
  fontsize: 0.825
}

,command: '/usr/local/bin/iStats'

,refreshFrequency: 3000

,render: function(output) {
  var data = this.parseOutput(output);
  var html  = '<div id="stats">';
      html += this.renderChart('CPU', 'icon-cpu', 100, 0);
      html += this.renderChart('Battery', 'icon-carbattery', 100, 0);
  for (var i = 0; i < data.fan['total-fans-in-system']; i++) {
      html += this.renderChart('Fan ' + i, 'icon-fan', 100, 0);
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

  $('#stats .cpu circle.bar').css('stroke-dasharray', Math.floor( (data.cpu['cpu-temp'] / MAX_CPU * 100) * c/100) + ' ' + c);
  $('#stats .cpu .temp').text(Math.floor(data.cpu['cpu-temp']) + '°C');
  
  $('#stats .battery circle.bar').css('stroke-dasharray', Math.floor( (data.battery['current-charge'] / data.battery['maximum-charge'] * 100) * c/100) + ' ' + c);
  $('#stats .battery .temp').text(Math.floor((data.battery['current-charge'] / data.battery['maximum-charge'] * 100)) + '%');

  for (var i = 0; i < data.fan['total-fans-in-system']; i++) {
    $('#stats .fan-' + i + ' circle.bar').css('stroke-dasharray', Math.floor( (data.fan['fan-' + i + '-speed'] / MAX_FAN * 100) * c/100) + ' ' + c);
    $('#stats .fan-' + i + ' .temp').text(Math.floor(data.fan['fan-' + i + '-speed']) + ' RPM');
  }
}

,renderChart: function(title, icon, percentage, temp) {
  var r = this.ui.radius;
  var c = Math.floor(2 * Math.PI * this.ui.radius);
  var p = c / 100 * percentage;

  var html  = '<div class="chart ' + title.replace(/\s/g, '-').toLowerCase() + '" ';
      html +=      'style="top:' + this.ui.top + '; left:' + this.ui.left + '; color:' + this.ui.color + '">';
      html +=       '<i class="icon ' + icon + '" style="font-size: ' + this.ui.iconsize + 'rem; line-height:' + this.ui.iconheight + 'rem"></i>';
      html +=       '<svg width="' + this.ui.width + 'px" height="' + this.ui.height + 'px">';
      html +=         '<circle class="bg" r="' + r + '" cx="' + (this.ui.width/2) + '" cy="' + (this.ui.height/2) + '"';
      html +=                ' style="stroke: ' + this.ui.bgcolor + '; stroke-width: ' + this.ui.thickness + '; stroke-dasharray: ' + c + ' ' + c + '"/>';
      html +=         '<circle class="bar" r="' + r + '" cx="' + (this.ui.width/2) + '" cy="' + (this.ui.height/2) + '" '; 
      html +=                ' style="stroke: ' + this.ui.color + '; stroke-width: ' + this.ui.thickness + '; stroke-dasharray: ' + p + ' ' + c + '" />';
      html +=       '</svg>';
      html +=       '<div class="temp" style="display:' + this.ui.displaylabel + '; font-size:' + this.ui.fontsize + 'rem">' + temp + '</div>';
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
      o.battery[k] = v;
    }
  }
  
  return o;
}

,style: "                                                    \n\
  font-family: 'Helvetica Neue'                              \n\
  font-size: 0.75rem                                         \n\
  width: auto;                                               \n\
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
    margin: 0px 0px                                          \n\
    padding: 0px 0px                                         \n\
                                                             \n\
  #stats .chart                                              \n\
    position: relative                                       \n\
    float: left                                              \n\
    margin: 0rem 1rem                                        \n\
                                                             \n\
  #stats .chart i                                            \n\
    font-size: 1rem                                          \n\
    text-align: center                                       \n\
    position: absolute                                       \n\
    line-height: 2.5rem                                      \n\
    width: 100%                                              \n\
                                                             \n\
  #stats .chart .temp                                        \n\
    text-align: center                                       \n\
    font-size: 1rem                                          \n\
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