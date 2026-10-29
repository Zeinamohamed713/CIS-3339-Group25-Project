<template>
  <div class="zip-chart-container">
    <canvas ref="zipChart"></canvas>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch
} from 'vue'

import {
  Chart,
  registerables
} from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  label: {
    type: Array,
    default: () => []
  },

  chartData: {
    type: Array,
    default: () => []
  }
})

const zipChart = ref(null)

let chartInstance = null

const centerTextPlugin = {
  id: 'centerText',

  afterDraw(chart) {
    const {
      ctx,
      chartArea
    } = chart

    if (!chartArea) {
      return
    }

    const total = props.chartData.reduce(
      (sum, value) => sum + Number(value || 0),
      0
    )

    const centerX =
      (chartArea.left + chartArea.right) / 2

    const centerY =
      (chartArea.top + chartArea.bottom) / 2

    ctx.save()

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = '#64748b'
    ctx.font = '600 13px sans-serif'

    ctx.fillText(
      'Total',
      centerX,
      centerY - 22
    )

    ctx.fillStyle = '#0f172a'
    ctx.font = '800 28px sans-serif'

    ctx.fillText(
      total.toString(),
      centerX,
      centerY + 4
    )

    ctx.fillStyle = '#94a3b8'
    ctx.font = '600 11px sans-serif'

    ctx.fillText(
      'Clients',
      centerX,
      centerY + 28
    )

    ctx.restore()
  }
}

function createChart() {
  if (!zipChart.value) {
    return
  }

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(
    zipChart.value,
    {
      type: 'doughnut',

      data: {
        labels: props.label,

        datasets: [
          {
            data: props.chartData,

            backgroundColor: [
              '#7c3aed',
              '#0ea5e9',
              '#f59e0b',
              '#10b981',
              '#ef4444',
              '#6366f1',
              '#14b8a6',
              '#f97316',
              '#ec4899',
              '#84cc16',
              '#06b6d4'
            ],

            borderColor: '#ffffff',

            borderWidth: 4,

            hoverBorderWidth: 4,

            hoverOffset: 6
          }
        ]
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        cutout: '68%',

        layout: {
          padding: 12
        },

        plugins: {
          legend: {
            display: false
          },

          title: {
            display: false
          },

          tooltip: {
            backgroundColor: '#0f172a',

            titleColor: '#ffffff',

            bodyColor: '#ffffff',

            displayColors: true,

            padding: 12,

            cornerRadius: 8,

            callbacks: {
              label(context) {
                const value =
                  context.parsed || 0

                return `${context.label}: ${value} client${
                  value === 1 ? '' : 's'
                }`
              }
            }
          }
        },

        animation: {
          duration: 600
        }
      },

      plugins: [
        centerTextPlugin
      ]
    }
  )
}

onMounted(() => {
  createChart()
})

watch(
  () => [
    props.label,
    props.chartData
  ],
  () => {
    createChart()
  },
  {
    deep: true
  }
)

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.zip-chart-container {
  position: relative;
  width: 100%;
  height: 280px;
}
</style>