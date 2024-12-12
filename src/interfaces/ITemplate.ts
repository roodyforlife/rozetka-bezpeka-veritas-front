export interface ITemplate {
    id: string,
    name: string
    items: ITemplateItem[]
    image: number[]
}

export interface ITemplateItem {
    id: string,
    key: string,
    value: string
    changeable: boolean
}