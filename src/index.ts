import { Sorter } from './Sorter'
import { NumberCollection } from './NumbersCollection'

const numbersCollection = new NumberCollection([10, 9, 35, -1])
const sorter = new Sorter(numbersCollection)
sorter.sort()
console.log(numbersCollection.data)
