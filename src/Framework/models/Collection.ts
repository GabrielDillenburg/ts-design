import { Eventing } from './Eventing'
import axios, { AxiosResponse } from 'axios'

export class Collection<T, K> {
  models: T[] = []
  events: Eventing = new Eventing()

  constructor (
    public rootUrl: string,
    public deserialize: (json: K) => T
  ) {}

  get on (): any {
    return this.events.on
  }

  get trigger (): any {
    return this.events.trigger
  }

  async fetch (): Promise<void> {
    await axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value))
      })
      this.trigger('change')
    })
  }
}
