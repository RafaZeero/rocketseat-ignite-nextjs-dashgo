import { useQuery } from 'react-query'
import { api } from '../api'

export type User = {
  id: string
  createdAt: string
  name: string
  email: string
}

type GetUsersResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user: User) => {
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

  return { users, totalCount }
}

export function useUsers(currentPage: number) {
  return useQuery(['users', currentPage], () => getUsers(currentPage), {
    staleTime: 60 * 10 * 1000 // 10 minutes
  })
}
