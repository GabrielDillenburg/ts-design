import { AxiosResponse } from 'axios'
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

  set (update: UserProps): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  async fetch (): Promise<void> {
    const id = this.get('id')

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch user without an id')
    }

    await this.sync.fetch(id).then(async (res: Promise<AxiosResponse>): Promise<void> => {
      this.set((await res).data)
    })
  }

  async save (): Promise<void> {
    void this.sync.save(this.attributes.getall())
      .then(async (res: Promise<AxiosResponse>): Promise<void> => {
        this.trigger('save')
      })
      .catch(() => {
        this.trigger('error')
      })
  }
}
