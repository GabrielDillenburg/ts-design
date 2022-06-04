import { User } from './models/User'

const user = new User({ id: 2 })

user.on('change', () => {
  console.log('User changed 2')
})

void user.fetch()
