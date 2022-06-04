import axios, { AxiosResponse } from 'axios'

interface UserProps {
  id?: number
  name?: string
  age?: number
}

export class User {
  constructor (private readonly data: UserProps) {}

  get (propName: string): UserProps {
    return this.data[propName]
  }

  set (update: UserProps): UserProps {
    return Object.assign(this.data, update)
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
