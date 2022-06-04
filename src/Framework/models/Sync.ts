import axios, { AxiosPromise } from 'axios'
import { UserProps } from './User'
export class Sync {
  constructor (public rootUrl: string) {}

  async fetch (id: number): Promise<AxiosPromise> {
    return await axios.get(`${this.rootUrl}/${id}`)
  }

  async save (data: UserProps): Promise<AxiosPromise> {
    const { id } = data
    if (!id) {
      return await axios.post(this.rootUrl, data)
    } else {
      return await axios.put(`${this.rootUrl}/${id}`, data)
    }
  }
}
