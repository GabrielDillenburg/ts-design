import { User } from './models/User'

const user = User.buildUser({ id: 1 })

user.on('change', () => {
  console.log('User changed 2')
})

void user.fetch()
