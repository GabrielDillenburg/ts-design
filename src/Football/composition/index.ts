import { MatchReader } from './MatchReader'
import { CsvFileReader } from './CsvFileReader'
// import { ConsoleReport } from './reports/ConsoleReport'
import { WinsAnalysis } from './analyzers/WinsAnalysis'
import { Summary } from './Summary'
import { HtmlReport } from './reports/HtmlReport'

const csvFileReader = new CsvFileReader('../football.csv')
const matchReader = new MatchReader(csvFileReader)
matchReader.load()

const summary = new Summary(
  new WinsAnalysis('Man United'),
  new HtmlReport()
)

summary.buildAndPrintReport(matchReader.matches)
