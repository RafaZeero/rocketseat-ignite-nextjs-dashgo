import { createServer, Factory, Model } from 'miragejs'
import faker from '@faker-js/faker'

export type User = {
  name: string
  email: string
  created_at: string
}

export function makeServer() {
  const server = createServer({
    models: {
      users: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(idx: number) {
          return `User ${idx + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        }
      })
    },

    seeds(server) {
      server.createList('user', 30)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750 //ms

      this.get('/users')
      this.post('/users')

      this.namespace = ''
      this.passthrough()
    }
  })
  return server
}