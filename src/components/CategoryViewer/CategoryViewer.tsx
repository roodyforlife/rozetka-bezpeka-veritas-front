import React, { useEffect, useState } from 'react'
import cl from './CategoryViewer.module.css'
import { ICategoryItem, IViewer } from '../../pages/Epicentr/Epicentr'
import { CategoryItem } from '../../pages/Epicentr/components/CategoryItem'
import { Loader } from '../Loader/Loader'
import { Button } from '../UI/Button/Button'

interface IProps {
    fetchFunction: () => Promise<ICategoryItem[]>
    saveFunction: (categories: ICategoryItem[]) => Promise<void>
    viewer: IViewer
}

export const CategoryViewer = ({fetchFunction, saveFunction, viewer}: IProps) => {
    const [categories, setCategories] = useState<ICategoryItem[]>([])
    const [loading, setLaoding] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLaoding(true);
      await fetchFunction()
        .then((data) => setCategories(data))
        .finally(() => setLaoding(false));
    };
  
    fetchCategories();
  }, [viewer, fetchFunction])


  const handleItemChange = (categoryItem: ICategoryItem) => {
    setCategories(categories.map((category) => {
      if (category.id === categoryItem.id) {
        return categoryItem
      }

      return category
    }))
  }

  const handleSave = async () => {
    setLaoding(true);
    await saveFunction(categories).finally(() => setLaoding(false))
  }

  return (
   <>
   <Loader loading={loading}></Loader>
    <div >
    <div className={cl.title}>{viewer.title}</div>
    <Button onClick={handleSave}>Save changes</Button>
    <div className={cl.items}>
      <div className={cl.header}>
        <div>Checked</div>
        <div>Prom name</div>
        <div>Marketpalce name</div>
        <div>Percent</div>
      </div>
      {categories.map((categoryItem) => 
        <CategoryItem categoryItem={categoryItem} handleItemChange={handleItemChange}></CategoryItem>
      )}
    </div>
</div>
   </>
  )
}
