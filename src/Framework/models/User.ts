import { Model } from './Model'
import { Eventing } from './Eventing'
import { Attributes } from './Attributes'
import { ApiSync } from './ApiSync'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
  static buildUser (attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    )
  }

  static buildUserCollection (): User[] {
    return []
  }

  setRandomAge (): void {
    const age = Math.round(Math.random() * 100)
    this.set({ age })
  }
}
