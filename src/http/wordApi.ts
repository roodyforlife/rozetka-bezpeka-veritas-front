import { $host } from ".";
import { IResultDto } from "../interfaces/IResultDto";
import { IWordFile } from "../interfaces/IWordFile";

export const uploadWordFile = async (formData: FormData) => {
     await $host.post('word/upload', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
     })
}

export const downloadWordFile = async (id: string): Promise<Blob> => {
    const response = await $host.get('word/download/' + id, {
        responseType: "blob",
      })
    return response.data  as Blob;
}

export const downloadWordResult = async (resultDto: IResultDto): Promise<Blob> => {
    const response = await $host.post('word/download', resultDto, {
        responseType: "blob",
      })
    return response.data  as Blob;
}

export const getWordFiles = async (): Promise<IWordFile[]> => {
    const { data } = await $host.get('word/files')
    return data as IWordFile[]
}

export const removeWordFile = async (id: string) => {
    await $host.delete('word/file/' + id)
}