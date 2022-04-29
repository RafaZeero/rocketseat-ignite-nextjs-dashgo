import { theme } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';


export const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-04-23T00:00:00.000Z',
      '2022-04-24T00:00:00.000Z',
      '2022-04-25T00:00:00.000Z',
      '2022-04-26T00:00:00.000Z',
      '2022-04-27T00:00:00.000Z',
      '2022-04-28T00:00:00.000Z'
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }, plotOptions: {

  }
};