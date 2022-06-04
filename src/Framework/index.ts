import { User } from './models/User'

const user = new User({ id: 2, name: 'John', age: 30 })

user.set({ name: 'New Name', age: 40 })

user.save()
