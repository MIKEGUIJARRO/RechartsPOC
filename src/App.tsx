import { Chart } from "./components/charts/Chart";
import { ChartElements } from "./components/charts/utils/ChartElements"
import { GraphicalElements } from "./constants/GraphicalElements"
import chartData from './data/chartData.json'

function App() {
  const chartElements = new ChartElements(chartData as GraphicalElements);
  console.log(chartElements.charts)
  console.log(chartElements.data)
  return (
    <div className="container m-auto mt-40" >
      <Chart chartElements={chartElements} />
    </div>
  )
}

export default App
