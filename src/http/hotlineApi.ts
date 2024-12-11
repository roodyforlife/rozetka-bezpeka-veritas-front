import { ICategoryItem } from "../pages/Epicentr/Epicentr";
import { $host } from ".";


export const getCategories = async (): Promise<ICategoryItem[]> => {
    const { data } = await $host.get('hotline/categories')
    return data as ICategoryItem[];
}

export const changeCategories = async (categories: ICategoryItem[]) => {
     const { data } = await $host.post('hotline/categories', categories)
}