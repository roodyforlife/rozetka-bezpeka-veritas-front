import React, { useEffect, useState } from 'react'
import { Loader } from '../../../../components/Loader/Loader'
import cl from './Templates.module.css';
import { Button } from '../../../../components/UI/Button/Button';
import { ITemplate } from '../../../../interfaces/ITemplate';
import { Template } from '../Template/Template';
import { TemplateCreateModal } from '../TemplateCreateModal/TemplateCreateModal';
import { getTemplates } from '../../../../http/templateApi';

interface IProps {
  templates: ITemplate[]
  fetch: () => Promise<void>
}

export const Templates = ({templates, fetch}: IProps) => {
    const [createModal, setCreateModal] = useState<boolean>(false)

    const handleOpenCreateModal = () => setCreateModal(true)
    const handleCloseCreateModal = () => setCreateModal(false)

  
  return (
    <div className={cl.content}>
    <div className={cl.title}>Templates</div>
   <TemplateCreateModal fetch={fetch} show={createModal} onHide={handleCloseCreateModal}></TemplateCreateModal>
   <Button onClick={handleOpenCreateModal}>Add new template</Button>
     <div className={cl.items}>
        <div className={cl.headerText}>Template name</div>
        <div className={cl.headerText}>Items count</div>
        <div></div>
        <div></div>
        {templates.map((template) => 
            <Template fetch={fetch} template={template} />
        )}
    </div>
   </div>
  )
}
