import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { useMutation } from "react-query";

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'A senha deve conter no mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

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

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData | FieldValues> = async (values) => {
    await createUser.mutateAsync(values)
    router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6' >
        <Sidebar />

        <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6', '8']} onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size='lg' fontWeight='normal' >Criar usuário</Heading>

          <Divider my='6' borderColor='gray.700' />
          <VStack spacing='8' >
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' >
              <Input
                label="Nome completo"
                {...register('name')}
                error={errors.name}
              />
              <Input
                type="email"
                label="E-mail"
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%' >
              <Input
                type='password'
                label="Senha"
                {...register('password')}
                error={errors.password}
              />
              <Input
                type="password_confirmation"
                label="Confirmar senha"
                {...register('password_confirmation')}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt='8' justify='flex-end' >
            <HStack spacing='4'  >
              <Link href={'/users'} passHref >
                <Button as='a' colorScheme='whiteAlpha' >Cancelar</Button>
              </Link>
              <Link href={'/users'} passHref >
                <Button as="button" type='submit' colorScheme='pink' isLoading={isSubmitting} >Salvar</Button>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
