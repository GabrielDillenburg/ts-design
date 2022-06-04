
interface UserProps {
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
      void 
    }
    handlers.forEach(callback => callback())
  }
}
