import React, { useState } from 'react'
import { ITemplate } from '../../../../interfaces/ITemplate'
import { Button } from '../../../../components/UI/Button/Button'
import { TemplateEditModal } from '../TemplateEditModal/TemplateEditModal'
import { TemplateDeleteModal } from '../TemplateDeleteModal/TemplateDeleteModal'
import { removeTemplate } from '../../../../http/templateApi'

interface IProps {
    template: ITemplate,
    fetch: () => void
}

export const Template = ({template, fetch}: IProps) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleOpenEditModal = () => setShowEditModal(true)
  const handleCloseEditModal = () => setShowEditModal(false)
  
  const handleOpenDeleteModal = () => setShowDeleteModal(true)
  const handleCloseDeleteModal = () => setShowDeleteModal(false)

  const remove = async (id: string) => {
    await removeTemplate(id).then(() => {
      handleCloseDeleteModal()
      fetch();
    });
  }

  return (
    <>
    <TemplateEditModal template={template} fetch={fetch} show={showEditModal} onHide={handleCloseEditModal}></TemplateEditModal>
    <TemplateDeleteModal remove={remove} template={template} onHide={handleCloseDeleteModal} show={showDeleteModal}></TemplateDeleteModal>
    <div>{template.name}</div>
    <div>{template.items.length}</div>
    <Button onClick={handleOpenEditModal}>Edit</Button>
    <Button onClick={handleOpenDeleteModal}>Remove</Button>
    </>
  )
}
