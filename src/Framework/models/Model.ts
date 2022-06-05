import { AxiosPromise, AxiosResponse } from 'axios'

interface ModelAttributes<T> {
  get: <K extends keyof T>(key: K) => T[K]
  set: (update: T) => void
  getall: () => T
}

interface Sync<T> {
  save: (data: T) => Promise<AxiosPromise>
  fetch: (id: number) => Promise<AxiosPromise>
}

interface Events {
  on: (eventName: string, callback: () => void) => void
  trigger: (eventName: string) => void
}

interface HasId {
  id?: number
}

export class Model<T extends HasId> {
  constructor (
    public attributes: ModelAttributes<T>,
    public events: Events,
    public sync: Sync<T>
  ) {}

  get on (): any {
    return this.events.on
  }

  get trigger (): any {
    return this.events.trigger
  }

  get get (): any {
    return this.attributes.get
  }

  set (update: T): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  async fetch (): Promise<void> {
    const id = this.get('id')

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch user without an id')
    }

    await this.sync.fetch(id).then(async (res: Promise<AxiosResponse>): Promise<void> => {
      this.set((await (res)).data)
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
