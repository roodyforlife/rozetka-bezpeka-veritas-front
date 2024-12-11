export interface ITemplate {
    id: string,
    name: string
    items: ITemplateItem[]
}

export interface ITemplateItem {
    id: string,
    key: string,
    value: string
}