import React, { useState } from 'react'
import cl from './Templates.module.css';
import { Button } from '../../../../components/UI/Button/Button';
import { ITemplate } from '../../../../interfaces/ITemplate';
import { Template } from '../Template/Template';
import { TemplateCreateModal } from '../TemplateCreateModal/TemplateCreateModal';
import { addIcon, minusCircleIcon } from '../../../../imagesConsts';

interface IProps {
  templates: ITemplate[]
  fetch: () => Promise<void>
  hidden?: boolean
}

export const Templates = ({templates, fetch, hidden = true}: IProps) => {
    const [createModal, setCreateModal] = useState<boolean>(false)
    const [isHidden, setIsHidden] = useState<boolean>(hidden);

    const handleOpenCreateModal = () => setCreateModal(true)
    const handleCloseCreateModal = () => setCreateModal(false)

    const toggleHidden = () => {
      setIsHidden(!isHidden)
    }
  
  return (
    <div className={cl.content}>
      <div className={cl.header}>
        <div className={cl.title}>Організації</div>
        <div><button className={cl.hideButton} onClick={toggleHidden}><img src={isHidden ? addIcon : minusCircleIcon} alt="" /></button></div>
      </div>
   <TemplateCreateModal fetch={fetch} show={createModal} onHide={handleCloseCreateModal}></TemplateCreateModal>
    {!isHidden &&
   <div style={{marginTop: '20px'}}>
   <Button onClick={handleOpenCreateModal} icon={addIcon}>Додати організацію</Button>
     <div className={cl.items}>
     <div className={cl.headerText}>Назва</div>
     <div></div>
     <div></div>
     {templates.map((template) => 
         <Template fetch={fetch} template={template} />
     )}
 </div>
   </div>
    }
   </div>
  )
}
