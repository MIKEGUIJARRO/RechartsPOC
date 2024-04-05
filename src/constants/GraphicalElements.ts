/* 
    This is the object that defines the chart data in our codebase
*/

export interface BaseGraphicalElement {
    xLabel: string
    yLabel: string
    type: string
    alwaysOnTop?: boolean
    visible?: boolean
    "stroke-width"?: number
    points: Point[]
    color?: string
    opacity?: number
}

export interface Point {
    x: number
    y: number
    y0?: number // Specific to area points
    visible?: boolean
    attributes?: PointAttributes
}

export interface PointAttributes {
    ensemble_mean?: number
}

export interface GraphicalElements extends Array<BaseGraphicalElement> { }

export enum GraphicalElementTypes {
    Line = 'line',
    Area = 'area'
}