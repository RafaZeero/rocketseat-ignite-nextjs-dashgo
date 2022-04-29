import { Box, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react'
import { options } from './GraphOptions';

// const series = [
//   { name: 'series 1', data: [17, 35, 44, 19, 36, 74, 54, 62] }
// ]

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

interface GraphProps {
  title: string
  series: [{
    name: string,
    data: number[]
  }]
}

export default function Graph({ title, series }: GraphProps) {
  return (
    <Box p={['6', '8']} bg='gray.800' borderRadius={8} pb='4'>
      <Text fontSize='lg' mb='4' >{title}</Text>
      <Chart options={options} series={series} type='area' height={160} />
    </Box>
  )
}
