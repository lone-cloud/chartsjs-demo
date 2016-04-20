import Em from 'ember';

export default Em.Component.extend({
  elementId: 'chartjs-demo',

  chart1Data: function(){
    return {
      labels: ["School A", "School B", "School C", "School D", "School E", "School F", "School G"],
      datasets: [
        {
          label: "Away from school logins",
          backgroundColor: "rgba(74,125,154,1)",
          borderColor: "rgba(220,220,220,1)",
          borderWidth: 1,
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "In school logins",
          backgroundColor: "rgba(27,55,67,1)",
          borderColor: "rgba(220,220,220,1)",
          borderWidth: 1,
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }.property(),

  chart2Data: function(){
    return {
      labels: ["School A", "School B", "School C", "School D", "School E", "School F", "School G"],
      datasets: [
        {
          label: "Away from school logins",
          backgroundColor: "rgba(74,125,154,0.4)",
          hoverBackgroundColor: "rgba(74,125,154,1.0)",
          borderColor: "rgba(220,220,220,1)",
          borderWidth: 1,
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "In school logins",
          backgroundColor: "rgba(27,55,67,0.4)",
          hoverBackgroundColor: "rgba(27,55,67,1.0)",
          borderColor: "rgba(220,220,220,1)",
          borderWidth: 1,
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }.property(),

  chart3Data: function(){
    return {
      labels: ["Logins","Logins","Logins","Logins","Logins","Logins","Logins"],
      datasets: [
        {
          fill: false,
          label: "Advanced Virtual Academy",
          backgroundColor: "rgba(98,181,229,1)",
          borderColor: "rgba(98,181,229,1)",
          borderWidth: 1,
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          fill: false,
          label: "Condit Elementary",
          backgroundColor: "rgba(160,94,181,1)",
          borderColor: "rgba(160,94,181,1)",
          borderWidth: 1,
          data: [28, 48, 40, 19, 86, 27, 87]
        },
        {
          fill: false,
          label: "Elrod Elementary",
          backgroundColor: "rgba(242,124,48,1)",
          borderColor: "rgba(242,124,48,1)",
          borderWidth: 1,
          data: [12, 56, 47, 78, 34, 17, 55]
        }
      ]
    };
  }.property(),

  didInsertElement(){
    var chart1 = Chart.Bar(this.$("#chart1").get(0).getContext("2d"), {
      data: this.get('chart1Data'),
      options: {
        responsive: false,
        scales: {
          xAxes: [
            {
              display: false
            }
          ]
        }
      }
    }),
      chart2 = Chart.Bar(this.$("#chart2").get(0).getContext("2d"), {
        data: this.get('chart2Data'),
        options: {
          responsive: false,
          scales: {
            xAxes: [
              {
                display: false
              }
            ]
          }
        }
      }),
      chart3 = Chart.Line(this.$("#chart3").get(0).getContext("2d"), {
        data: this.get('chart3Data'),
        options: {
          responsive: false,
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false
                }
              }
            ]
          }
        }
      });
  }
});
