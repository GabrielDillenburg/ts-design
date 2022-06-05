
export class Attributes <T> {
  constructor (private readonly data: T) {}

  // arrow function in this case because of "this" keyword context when the function is called
  get = <K extends keyof T> (key: K): T[K] => {
    return this.data[key]
  }

  set (update: T): void {
    Object.assign(this.data, update)
  }

  getall (): T {
    return this.data
  }
}
