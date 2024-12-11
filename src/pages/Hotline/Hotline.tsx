import React from 'react'
import { CategoryViewer } from '../../components/CategoryViewer/CategoryViewer'
import { changeCategories, getCategories } from '../../http/hotlineApi'

export const Hotline = () => {
  return (
    <CategoryViewer viewer={{title: "Hotline"}} fetchFunction={getCategories} saveFunction={changeCategories}></CategoryViewer>
  )
}
