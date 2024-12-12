import { $host } from ".";
import { ITemplate } from "../interfaces/ITemplate";


export const getTemplates = async (): Promise<ITemplate[]> => {
    const { data } = await $host.get('templates')
    return data as ITemplate[]
}

export const addTemplate = async (data: FormData) => {
    await $host.post('template', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export const editTemplate = async (data: FormData) => {
    await $host.put('template', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export const removeTemplate = async (id: string) => {
    await $host.delete('template/' + id)
}