const chartData1 = JSON.parse(document.getElementById('chartData1').getAttribute('data-chart'));

const chartData2 = JSON.parse(document.getElementById('chartData2').getAttribute('data-chart'));

const ctx1 = document.getElementById('myChart1').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');

const config1 = {
  type: 'line',
  data: {
    labels: chartData1.labels,
    datasets: [{
      label: 'Penjualan Barang',
      data: chartData1.values,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};
const config2 = {
  type: 'bar',
  data: {
    labels: chartData2.labels,
    datasets: [{
      label: 'Barang Masuk',
      data: chartData2.values,
      backgroundColor: 'rgba(75, 192, 1, 0.2)',
      borderColor: 'rgba(75, 192, 1, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

new Chart(ctx1, config1);
new Chart(ctx2, config2);