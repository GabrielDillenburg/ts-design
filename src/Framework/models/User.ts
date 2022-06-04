import axios, { AxiosResponse } from 'axios'

interface UserProps {
  id?: number
  name?: string
  age?: number
}

type Callback = () => void

export class User {
  events: {[key: string]: Callback[]} = {}

  constructor (private readonly data: UserProps) {}

  get (propName: string): UserProps {
    return this.data[propName]
  }

  set (update: UserProps): UserProps {
    return Object.assign(this.data, update)
  }

  on (eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  trigger (eventName: string): void {
    const handlers = this.events[eventName]
    if (!handlers || handlers.length === 0) {
      void console.warn(`No handlers for event ${eventName}`)
    }

    handlers.forEach(callback => callback())
  }

  fetch (): void {
    void axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data)
      })
  }

  save (): void {
    const id = this.get('id')
    if (!id) {
      void axios.post('http://localhost:3000/users', this.data)
        .then((response: AxiosResponse): void => {
          this.set(response.data)
        })
    } else {
      void axios.put(`http://localhost:3000/users/${id}`, this.data)
        .then((response: AxiosResponse): void => {
          this.set(response.data)
        })
    }
  }
}
