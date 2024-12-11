import React from 'react'
import { CategoryViewer } from '../../components/CategoryViewer/CategoryViewer'
import { changeCategories, getCategories } from '../../http/rozetkaApi'

export const Rozetka = () => {
  return (
    <CategoryViewer viewer={{title: "Rozetka"}} fetchFunction={getCategories} saveFunction={changeCategories}></CategoryViewer>
  )
}
