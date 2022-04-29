import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import Graph from "../components/Graph";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";


export default function Dashboard() {
  const graph1 = { name: 'series 1', data: [17, 35, 44, 19, 36, 74] }
  const graph2 = { name: 'series 2', data: [150, 35, 124, 19, 36, 174] }


  //bugFix do chart - overlay do gráfico na width
  const [showChart, setShowChart] = useState(false);

  setTimeout(() => {
    setShowChart(true);
  }, 1);


  return (
    <Flex direction='column' h='100vh' >
      <Header />

      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6' >
        <Sidebar />

        {showChart && (
          <SimpleGrid flex='1' gap='4' minChildWidth={'320px'} overflow='hidden' alignItems='flex-start' >
            <Graph title={"Inscritos da Semana"} series={[graph1]} />
            <Graph title={"Taxa de abertura"} series={[graph2]} />
          </SimpleGrid>
        )}



      </Flex>

    </Flex >
  )
}
