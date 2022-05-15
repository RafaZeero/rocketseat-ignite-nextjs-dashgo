import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

//components
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { User } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";


export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isFetching, error, refetch } = useUsers(currentPage)


  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)
      return response.data
    }, {
      staleTime: 60 * 10 * 1000 // 10 minutes
    })
  }

  return (
    <Box>
      <Header />
      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px={['4', '4', '6']} >
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal' >
              Usuários
              {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
            </Heading>

            <Button ml='auto' mr='4' onClick={() => refetch()} size='sm' fontSize='sm' colorScheme='purple' >
              Refresh
            </Button>
            <NextLink href={'/users/create'} passHref >
              <Button as='a' size='sm' fontSize='sm' colorScheme='pink' leftIcon={<Icon as={RiAddLine} fontSize='20' />} >
                Novo usuário
              </Button>
            </NextLink>

          </Flex>

          {isLoading ? (
            <Flex justify={'center'} >
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify={'center'}>
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha"  >
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color='gray.300' width='8' >
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isLargeScreen && <Th>Data de Cadastro</Th>}
                    {isLargeScreen && <Th>Atividades Recentes</Th>}
                    {isLargeScreen && <Th width='8' ></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users.map((user: User) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}><Checkbox colorScheme="pink" /></Td>
                        <Td>
                          <Box>
                            <Link color='purple.400' onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight="bold" >{user.name}</Text>
                            </Link>
                            <Text fontSize='sm' color='gray.300' >{user.email}</Text>
                          </Box>
                        </Td>
                        {isLargeScreen && <Td>{user.createdAt}</Td>}
                        <Td>
                          {isLargeScreen && <Text fontSize='md' color='gray.500' >Comentário</Text>}
                          {isLargeScreen && <Text fontSize='sm' color='gray.300' >Conheci o conteúdo recentemente e estou adorando...</Text>}
                        </Td>
                        {isLargeScreen && <Td>
                          <Button as='a' size='sm' fontSize='sm' colorScheme='purple' leftIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                            Editar
                          </Button>
                        </Td>}
                      </Tr>
                    )
                  })}

                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegister={data!.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
