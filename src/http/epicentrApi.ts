import { ICategoryItem } from "../pages/Epicentr/Epicentr";
import { $host } from ".";


export const getCategories = async (): Promise<ICategoryItem[]> => {
    const { data } = await $host.get('epicentr/categories')
    return data as ICategoryItem[];
}

export const changeCategories = async (categories: ICategoryItem[]) => {
     await $host.post('epicentr/categories', categories)
}