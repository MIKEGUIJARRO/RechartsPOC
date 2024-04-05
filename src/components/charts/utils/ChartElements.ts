import { GraphicalElementTypes, GraphicalElements } from "../../../constants/GraphicalElements"

export interface CommonChartElement {
    xLabel: string
    yLabel: string
    x: string[]
}

export interface LineChartElement extends CommonChartElement {
    type: 'line'
    y: number[]
}

export interface AreaChartElement extends CommonChartElement {
    type: 'area'
    y: {
        y0: number
        y1: number
    }[]
}

export interface ConfigChartElement {
    visible?: boolean
    strokeWidth?: number
    strokeFill?: string
    strokeColor?: string
    opacity?: number
}

export interface BaseChartElement {

    config: ConfigChartElement
    chart: LineChartElement | AreaChartElement,
}

export interface Dictionary {
    [key: string]: string | number | number[];
}


export interface ChartElements {
    charts: Map<string, BaseChartElement>
    data: Dictionary[]
}

export class ChartElements implements ChartElements {

    constructor(graphicalElements: GraphicalElements) {
        this.charts = loadChartFromGraphicalElements(graphicalElements)
        this.data = loadDataFromCharts(this.charts)
    }
}

export function loadChartFromGraphicalElements(graphicalElements: GraphicalElements): Map<string, BaseChartElement> {
    const chartsMap = new Map<string, BaseChartElement>()

    for (let i = 0; i < graphicalElements.length; i++) {
        const graphicalElement = graphicalElements[i]
        if (graphicalElement.type === GraphicalElementTypes.Line) {
            const baseChartElement: BaseChartElement = {
                chart: {
                    type: 'line',
                    x: [],
                    y: [],
                    xLabel: graphicalElement.xLabel,
                    yLabel: graphicalElement.yLabel
                },
                config: {
                    opacity: graphicalElement.opacity,
                    strokeColor: graphicalElement.color,
                    strokeFill: '', // Not available in current config
                    strokeWidth: graphicalElement["stroke-width"],
                    visible: graphicalElement.visible
                },
            }

            for (let j = 0; j < graphicalElement.points.length; j++) {
                baseChartElement.chart.x.push(graphicalElement.points[j].x.toString())
                if (isLineChartElement(baseChartElement.chart)) {
                    baseChartElement.chart.y.push(graphicalElement.points[j].y)
                }
            }

            if (!chartsMap.has(baseChartElement.chart.yLabel)) {
                chartsMap.set(baseChartElement.chart.yLabel, baseChartElement)
            }
        } else if (graphicalElement.type === GraphicalElementTypes.Area) {
            const baseChartElement: BaseChartElement = {
                chart: {
                    type: 'area',
                    x: [],
                    y: [],
                    xLabel: graphicalElement.xLabel,
                    yLabel: graphicalElement.yLabel
                },
                config: {
                    opacity: graphicalElement.opacity,
                    strokeColor: graphicalElement.color,
                    strokeFill: '', // Not available in current config
                    strokeWidth: graphicalElement["stroke-width"],
                    visible: graphicalElement.visible
                },
            }
            for (let j = 0; j < graphicalElement.points.length; j++) {
                baseChartElement.chart.x.push(graphicalElement.points[j].x.toString())
                if (isAreaChartElement(baseChartElement.chart)) {
                    const y = graphicalElement.points[j].y
                    const y0 = graphicalElement.points[j].y0
                    if (y0 === undefined) {
                        throw new Error('yo undefined')
                    }
                    baseChartElement.chart.y.push({
                        y0: y0,
                        y1: y
                    })
                }
            }
            if (!chartsMap.has(baseChartElement.chart.yLabel)) {
                chartsMap.set(baseChartElement.chart.yLabel, baseChartElement)
            }
        }
    }

    return chartsMap
}

export function isLineChartElement(element: LineChartElement | AreaChartElement): element is LineChartElement {
    return element.type === 'line';
}

export function isAreaChartElement(element: LineChartElement | AreaChartElement): element is AreaChartElement {
    return element.type === 'area';
}

export function loadDataFromCharts(charts: Map<string, BaseChartElement>) {
    const data: Dictionary[] = []

    charts.forEach((value) => {
        const xLabel = value.chart.xLabel
        const yLabel = value.chart.yLabel
        if (value.chart.type === 'line') {
            for (let i = 0; i < value.chart.x.length; i++) {
                const x = value.chart.x[i]
                const y = value.chart.y[i]

                if (!data[i]) {
                    data[i] = {};
                }

                data[i][xLabel] = x
                if (data[i][yLabel] === undefined) {
                    data[i][yLabel] = y
                }
            }
        } else if (value.chart.type === 'area') {
            for (let i = 0; i < value.chart.x.length; i++) {
                const x = value.chart.x[i]
                const y = {
                    y0: value.chart.y[i].y0,
                    y1: value.chart.y[i].y1,
                }

                if (!data[i]) {
                    data[i] = {};
                }

                data[i][xLabel] = x
                if (data[i][yLabel] === undefined) {
                    data[i][yLabel] = [y.y0, y.y1]
                }
            }
        }
    })

    return data
}