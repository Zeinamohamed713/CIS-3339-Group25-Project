<template>
  <div class="attendance-chart-container">
    <canvas ref="attendanceChart"></canvas>
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

const attendanceChart = ref(null)

let chartInstance = null

function createChart() {
  if (!attendanceChart.value) {
    return
  }

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(
    attendanceChart.value,
    {
      type: 'bar',

      data: {
        labels: props.label,

        datasets: [
          {
            label: 'Attendance',
            data: props.chartData,

            backgroundColor: '#b91c1c',
            borderColor: '#991b1b',

            borderWidth: 0,

            borderRadius: 8,
            borderSkipped: false,

            barThickness: 22,
            maxBarThickness: 26
          }
        ]
      },

      options: {
        indexAxis: 'y',

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
          mode: 'nearest',
          intersect: false
        },

        layout: {
          padding: {
            top: 10,
            right: 20,
            bottom: 10,
            left: 10
          }
        },

        scales: {
          x: {
            beginAtZero: true,

            ticks: {
              stepSize: 1,

              precision: 0,

              color: '#64748b',

              font: {
                size: 11,
                weight: '500'
              }
            },

            grid: {
              color: '#e2e8f0',
              drawBorder: false
            },

            border: {
              display: false
            },

            title: {
              display: true,
              text: 'Attendance',
              color: '#94a3b8',

              font: {
                size: 11,
                weight: '600'
              }
            }
          },

          y: {
            grid: {
              display: false
            },

            border: {
              display: false
            },

            ticks: {
              color: '#334155',

              font: {
                size: 12,
                weight: '600'
              },

              padding: 10,

              callback(value) {
                const label =
                  this.getLabelForValue(value)

                if (label.length > 28) {
                  return `${label.substring(0, 28)}...`
                }

                return label
              }
            }
          }
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

            padding: 12,

            displayColors: false,

            cornerRadius: 8,

            callbacks: {
              title(context) {
                return context[0].label
              },

              label(context) {
                const value =
                  context.parsed.x ?? 0

                return `${value} attendee${
                  value === 1 ? '' : 's'
                }`
              }
            }
          }
        },

        animation: {
          duration: 600
        }
      }
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
.attendance-chart-container {
  position: relative;
  width: 100%;
  height: 360px;
}
</style>