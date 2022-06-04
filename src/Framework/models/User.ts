import { Attributes } from './Attibutes'
import { Eventing } from './Eventing'
import { Sync } from './Sync'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootUrl = 'http://localhost:3000/users'
export class User {
  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)
  public attributes: Attributes<UserProps>

  constructor (attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }

  get on (): any {
    return this.events.on
  }

  get trigger (): any {
    return this.events.trigger
  }

  get get (): any {
    return this.attributes.get
  }
}
