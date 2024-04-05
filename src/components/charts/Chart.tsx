import { Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend, ComposedChart, Area } from 'recharts';
import { Formatter } from 'recharts/types/component/DefaultLegendContent';
import { BaseGraphicalElement, GraphicalElementTypes, GraphicalElements } from '../../constants/GraphicalElements';
import { FC } from 'react';
import { BaseChartElement, ChartElements, Dictionary } from './utils/ChartElements';

const renderColorfulLegendText: Formatter = (value: string, entry) => {
  return (
    <span className='text-black mt-8'>{value}</span>
  )
}


const renderChartElement = (chartElement: BaseChartElement) => {
  if (chartElement.chart.type === GraphicalElementTypes.Line) {
    return (
      <Line
        type="linear"
        dataKey={chartElement.chart.yLabel}
        dot={false}
        opacity={chartElement.config.opacity}
        stroke={chartElement.config.strokeColor}
        strokeWidth={chartElement.config.strokeWidth} />
    )
  } else if (chartElement.chart.type === GraphicalElementTypes.Area) {
    return (
      <Area
        dataKey={chartElement.chart.yLabel}
        fill={chartElement.config.strokeColor}
        strokeWidth={0} />
    )
  }

  return <></>
}

interface ChartProps {
  chartElements: ChartElements
}

export const Chart: FC<ChartProps> = ({ chartElements }) => {
  const { charts, data } = chartElements

  return (
    <ComposedChart width={730} height={250} data={data}>
      <XAxis />
      <YAxis />
      <Tooltip />
      <Legend formatter={renderColorfulLegendText} />
      <CartesianGrid stroke="#f5f5f5" />
      {Array.from(charts.values()).map((chart) => {
        return renderChartElement(chart)
      })}
    </ComposedChart>

  )
}

/* 

    <LineChart width={800} height={400} data={data} layout='horizontal'
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <Customized component={CustomizedPolygonArea} />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="linear" dataKey="pv" stroke="#8884d8" dot={false} strokeWidth={3} />
    </LineChart>
*/

{/* <ResponsiveContainer height='100%' width='100%' className={'bg-gray-50 py-12'}>
      <BarChart data={data} margin={{ left: 0, right: 0, bottom: 0 }} >
        <XAxis dataKey="name" padding={{ left: 20, right: 20 }} height={40} dy={10}/>
        <YAxis  />

        <CartesianGrid />
        <Tooltip />
        <Bar type="monotone" dataKey="pv" stackId={'a'} fill="#F9BF99" />
        <Bar type="monotone" dataKey="uv" stackId={'a'} fill="#F06000" />
        <Legend formatter={renderColorfulLegendText} layout='horizontal' verticalAlign='bottom' align='center' />
      </BarChart>
    </ResponsiveContainer> */}
