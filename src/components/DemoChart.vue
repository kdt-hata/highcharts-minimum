<!-- src/components/DemoChart.vue -->
<script setup lang="ts">
//
type CustomedAxis = Highcharts.Axis & {
  brokenAxis?: {
    breakArray: Array<{ from: number; to: number }>
  }
  height?: number
}

type CustomedBrokenAxisPath = Highcharts.SVGElement & {
  attr: (options: { d: CustomedSVGPathArray }) => void
}

type CustomedChart = Highcharts.Chart & {
  brokenAxisPath?: CustomedBrokenAxisPath
}

type CustomedSVGPathArray = Array<Highcharts.SVGPathCommand | number>

const chartOptions = {
  chart: {
    type: 'bar',
    events: {
      render(this: CustomedChart) {
        const chart: Highcharts.Chart = this,
          renderer: Highcharts.SVGRenderer = chart.renderer,
          yAxis: CustomedAxis = chart.yAxis[0],
          { from, to } = yAxis.brokenAxis?.breakArray[0] || { from: 0, to: 0 },
          //   Highcharts のtoPixelsメソッドのpaneCoordinatesパラメーターで、チャート全体を基準としたピクセル座標を返すか ( true )、軸/ペイン自体のみを返すか ( false ) を指定する必要があります。
          x = (yAxis.toPixels(from, true) + yAxis.toPixels(to, false)) / 2,
          y = yAxis.height || 0 + chart.plotTop,
          //   w = 40,
          path: CustomedSVGPathArray = ['M', x, y + 50, 'L', x, 0]

        if (!this.brokenAxisPath) {
          this.brokenAxisPath = renderer
            .path(path as any)
            .attr({
              stroke: 'red',
              'stroke-width': 3
            })
            .add() as CustomedBrokenAxisPath
        } else {
          this.brokenAxisPath.attr({
            d: path
          })
        }
      }
    }
  },
  title: {
    text: 'Historic World Population by Region',
    align: 'left'
  },
  subtitle: {
    text:
      'Source: <a ' +
      'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
      'target="_blank">Wikipedia.org</a>',
    align: 'left'
  },
  xAxis: {
    categories: ['Africa', 'America', 'Asia', 'Europe'],
    title: {
      text: null
    },
    gridLineWidth: 1,
    lineWidth: 0
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Population (millions)',
      align: 'high'
    },
    labels: {
      formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
        const label = this.axis.defaultLabelFormatter.call(this)
        const lastCharacter = label.toString().slice(-1)
        let res: string
        if (lastCharacter === 'k') {
          let num = label.slice(0, -1)
          num = num.replace(/\s/g, '')
          res = (Number(num) * 1000).toLocaleString()
        } else {
          res = Number(label).toLocaleString()
        }
        return res
      }
      // demo has the following
      //   overflow: 'justify'
    },
    gridLineWidth: 0,
    breaks: [
      {
        from: 2000,
        to: 3000
      }
    ]
  },
  tooltip: {
    valueSuffix: ' millions'
  },
  plotOptions: {
    bar: {
      borderRadius: '50%',
      dataLabels: {
        enabled: true
      },
      groupPadding: 0.1
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
    x: -20,
    y: -80,
    floating: true,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    shadow: true
  },
  //   The following is from the demo : https://www.highcharts.com/demo/highcharts/bar-basic
  //   legend: {
  //     layout: 'vertical',
  //     align: 'right',
  //     verticalAlign: 'top',
  //     x: -40,
  //     y: 80,
  //     floating: true,
  //     borderWidth: 1,
  //     backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
  //     shadow: true
  //   },
  credits: {
    enabled: false
  },
  series: [
    {
      name: 'Year 1990',
      data: [631, 727, 3202, 721]
    },
    {
      name: 'Year 2000',
      data: [814, 841, 3714, 726]
    },
    {
      name: 'Year 2018',
      data: [1276, 1007, 4561, 746]
    }
  ]
}
</script>

<template>
  <highcharts :options="chartOptions" style="width: 80vw; height: 80vh"></highcharts>
</template>
