import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { useMutation } from "react-query";

//components
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function CreateUser() {
  const router = useRouter()
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })
    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  // const {register,handleSubmit,formState:{errors,isSubmitting}} = useForms({
  //   resolve: yupResolver(createUserFormSchema)
  // })

  // const handleCreateUser: SubmitHandler<CreateUserFormData> = async(values) =>{
  //   await createUser.mutateAsync(values)
  // router.push('/users')
  // }

  return (
    <Box>
      <Header />
      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6' >
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p={['6', '8']}>
          <Heading size='lg' fontWeight='normal' >Criar usuário</Heading>

          <Divider my='6' borderColor='gray.700' />
          <VStack spacing='8' >
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' >
              <Input name='name' label="Nome completo" />
              <Input name='email' type="email" label="E-mail" />
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' >
              <Input name='password' type='password' label="Senha" />
              <Input name='password' type="password" label="Confirmar senha" />
            </SimpleGrid>
          </VStack>
          <Flex mt='8' justify='flex-end' >
            <HStack spacing='4'  >
              <Link href={'/users'} passHref >
                <Button as='a' colorScheme='whiteAlpha' >Cancelar</Button>
              </Link>
              <Link href={'/users'} passHref >
                <Button as='a' colorScheme='pink' >Salvar</Button>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
