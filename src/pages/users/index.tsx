import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from 'react-query'

//components
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { User } from "../../services/mirage";

type UserProps = User & {
  id: string
  createdAt: string
}

export default function UserList() {
  const { data, isLoading, isFetching, error, refetch } = useQuery('users', async () => {
    const { data } = await api.get('users')
    const users = data.users.map((user: UserProps) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })

    return users
  }, {
    staleTime: 5 * 1000 // 5 segundos
  })


  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true
  })


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
            <Link href={'/users/create'} passHref >
              <Button as='a' size='sm' fontSize='sm' colorScheme='pink' leftIcon={<Icon as={RiAddLine} fontSize='20' />} >
                Novo usuário
              </Button>
            </Link>

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
                  {data.map((user: UserProps) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}><Checkbox colorScheme="pink" /></Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold" >{user.name}</Text>
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

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
