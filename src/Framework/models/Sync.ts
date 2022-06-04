import axios, { AxiosPromise } from 'axios'

interface HasId {
  id?: number
}
export class Sync<T extends HasId> {
  constructor (public rootUrl: string) {}

  async fetch (id: number): Promise<AxiosPromise> {
    return await axios.get(`${this.rootUrl}/${id}`)
  }

  async save (data: T): Promise<AxiosPromise> {
    const { id } = data
    if (!id) {
      return await axios.post(this.rootUrl, data)
    } else {
      return await axios.put(`${this.rootUrl}/${id}`, data)
    }
  }
}
