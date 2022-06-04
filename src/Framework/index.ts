import { User } from './models/User'

const user = new User({ name: 'John', age: 30 })

user.set({ name: 'New Name', age: 40 })

user.save()
