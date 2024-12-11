import { $host } from ".";
import { ITemplate } from "../interfaces/ITemplate";


export const getTemplates = async (): Promise<ITemplate[]> => {
    const { data } = await $host.get('templates')
    return data as ITemplate[]
}

export const addTemplate = async (template: ITemplate) => {
    const { data } = await $host.post('template', template)
}

export const editTemplate = async (template: ITemplate) => {
    const { data } = await $host.put('template', template)
}

export const removeTemplate = async (id: string) => {
    const { data } = await $host.delete('template/' + id)
}