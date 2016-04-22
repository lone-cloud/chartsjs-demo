import Em from 'ember';

export default Em.Component.extend({
  elementId: 'chartjs-demo',

  chart1Data: function(){
    return {
      labels: ["School A", "School B", "School C", "School D", "School E", "School F", "School G"],
      datasets: [
        {
          label: "Away from school logins",
          backgroundColor: "rgba(74,125,154,0.6)",
          hoverBackgroundColor: "rgba(74,125,154,1.0)",
          borderColor: "rgba(220,220,220,1)",
          borderWidth: 1,
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "In school logins",
          backgroundColor: "rgba(27,55,67,0.6)",
          hoverBackgroundColor: "rgba(27,55,67,1.0)",
          borderColor: "rgba(220,220,220,1)",
          borderWidth: 1,
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }.property(),

  chart2Data: function(){
    return {
      labels: ["Logins","Logins","Logins","Logins","Logins","Logins","Logins"],
      datasets: [
        {
          fill: false,
          label: "Advanced Virtual Academy",
          backgroundColor: "rgba(108,171,29,1)",
          borderColor: "rgba(108,171,29,1)",
          borderWidth: 1,
          data: [65, 59, 80, 81, 56, 55, 40],
          tension: 0
        },
        {
          fill: false,
          label: "Condit Elementary",
          backgroundColor: "rgba(98,181,229,1)",
          borderColor: "rgba(98,181,229,1)",
          borderWidth: 1,
          data: [28, 48, 40, 19, 86, 27, 87],
          tension: 0
        },
        {
          fill: false,
          label: "Elrod Elementary",
          backgroundColor: "rgba(144,85,163,1)",
          borderColor: "rgba(144,85,163,1)",
          borderWidth: 1,
          data: [12, 56, 47, 78, 34, 17, 55],
          tension: 0
        }
      ]
    };
  }.property(),

  // largely taken from line-customTooltips.html
  customTooltip(tooltip){
    var tooltipEl = Em.$('#chartjs-tooltip');

    if (!tooltipEl[0]) {
      Em.$('body').append('<div id="chartjs-tooltip"></div>');
      tooltipEl = Em.$('#chartjs-tooltip');
    }

    // Hide if no tooltip
    if (!tooltip.opacity) {
      tooltipEl.css({
        opacity: 0
      });

      return;
    }

    // Set caret Position
    tooltipEl.removeClass('above below no-transform');
    if (tooltip.yAlign) {
      tooltipEl.addClass(tooltip.yAlign);
    } else {
      tooltipEl.addClass('no-transform');
    }

    // Set Text
    if (tooltip.body) {
      var innerHtml = '';
      this._data.datasets.forEach((item)=>{
        innerHtml += ('<div class="circle" style="background: ' + item.backgroundColor + '"></div>' + item.label + '<br>' + '<div class="logins-row">' + item.data[this._active[0]._index] + ' logins</div>');
      });
      tooltipEl.html(innerHtml);
    }

    // Find Y Location on page
    var top = 0;
    if (tooltip.yAlign) {
      if (tooltip.yAlign === 'above') {
        top = tooltip.y - tooltip.caretHeight - tooltip.caretPadding;
      } else {
        top = tooltip.y + tooltip.caretHeight + tooltip.caretPadding;
      }
    }

    var position = $(this._chart.canvas)[0].getBoundingClientRect();

    tooltipEl.css({
      opacity: 1,
      width: tooltip.width ? (tooltip.width + 'px') : 'auto',
      left: position.left + tooltip.x + 'px',
      top: '50px',
      fontFamily: tooltip._fontFamily,
      fontSize: tooltip.fontSize,
      fontStyle: tooltip._fontStyle,
      padding: '15px'
    });
  },
  
  didInsertElement(){
    let chart1Canvas = this.$("#chart1").get(0),
      chart2Canvas = this.$("#chart2").get(0),
      cursorElem = this.$('#cursor').get(0),
      cursorCanvas = cursorElem.getContext('2d'),
      syncCursorWidths = ()=>{
        this.$('#cursor').prop('height', this.$('#chart2').height());
        this.$('#cursor').prop('width', this.$('#chart2').width());
      };
    
    Chart.Bar(chart1Canvas.getContext("2d"), {
      data: this.get('chart1Data')
    });

    Chart.Line(chart2Canvas.getContext("2d"), {
      data: this.get('chart2Data'),
      options: {
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 4,
            hitRadius: 20
          }
        },
        tooltips: {
          enabled: false,
          custom: this.customTooltip
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    });

    Em.$(window).on('resize', syncCursorWidths);
    syncCursorWidths();

    // http://stackoverflow.com/questions/25735735/html5-canvas-replace-cursor-with-crossing-lines
    this.$('#chart2').on('mousemove', (event)=>{
      let elem = this.$('#cursor'),
        offsetX = elem.offset().left,
        elemRaw = elem.get(0),
        mouseX = parseInt(event.clientX-offsetX);

      cursorCanvas.clearRect(0, 0, elemRaw.width, elemRaw.height);
      cursorCanvas.beginPath();
      cursorCanvas.moveTo(mouseX ,0);
      cursorCanvas.lineTo(mouseX, elemRaw.height);
      cursorCanvas.setLineDash([5, 6]);
      cursorCanvas.strokeStyle = '#D3D3D3';
      cursorCanvas.stroke();
    });
  },

  willDestroyElement(){
    this.$('#cursor').off();
    Em.$(window).off();
  }
});
