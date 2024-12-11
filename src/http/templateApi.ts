import { $host } from ".";
import { ITemplate } from "../interfaces/ITemplate";


export const getTemplates = async (): Promise<ITemplate[]> => {
    const { data } = await $host.get('templates')
    return data as ITemplate[]
}

export const addTemplate = async (template: ITemplate) => {
    await $host.post('template', template)
}

export const editTemplate = async (template: ITemplate) => {
    await $host.put('template', template)
}

export const removeTemplate = async (id: string) => {
    await $host.delete('template/' + id)
}