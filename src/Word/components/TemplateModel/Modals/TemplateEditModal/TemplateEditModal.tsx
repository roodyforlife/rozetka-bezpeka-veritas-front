import React, { MouseEvent, useEffect, useState } from 'react'
import { ITemplate, ITemplateItem } from '../../../../../interfaces/ITemplate'
import uuid from 'react-uuid'
import { editTemplate } from '../../../../../http/templateApi'
import { Form, FormCheck, Modal } from 'react-bootstrap'
import { CustomInput } from '../../../../../components/UI/CustomInput/CustomInput'
import { Button } from '../../../../../components/UI/Button/Button'
import cl from '../TemplateCreateModal/TemplateCreateModal.module.css';
import { addIcon, trashIcon } from '../../../../../imagesConsts'

interface IProps {
    show: boolean,
    onHide: () => void
    fetch: () => void
    template: ITemplate
}

export const TemplateEditModal = ({onHide, show, fetch, template}: IProps) => {
       const [form, setForm] = useState<ITemplate>(template);
       const [previewUrl, setPreviewUrl] = useState<string | null>(null);
       useEffect(() => {
        setForm(template)
        var img: any = template.image

        const uint8Array = new Uint8Array(img?.data);
        const blob = new Blob([uint8Array], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
       }, [show, template])

      const handleAddItem = () => {
        const newItem: ITemplateItem = {
          id: uuid(),
          key: "",
          value: "",
          changeable: false
        }
        setForm({...form, items: [...form.items, newItem]})
      }

      const handleDeleteItem = (event: MouseEvent, id: string) => {
        event.preventDefault();
        setForm({...form, items: [...form.items.filter((item) => item.id !== id)]})
      }
  
      const handleItemChange = (item: ITemplateItem) => {
        setForm({
          ...form,
          items: form.items.map((currentItem) => {
            if (item.id === currentItem.id) {
              return item;
            }
  
            return currentItem
          })
        })
      }
  
      const handleSave = async () => {
        const showError = () => alert("Invalid values");
      
        // Проверяем на ошибки
      if (form.name === "") {
        showError();
        return; // Прекращаем выполнение, если имя пустое
      }
    
      if (form.items.some((item) => item.key === "" || item.value === "")) {
        showError();
        return; // Прекращаем выполнение, если есть элементы с пустыми ключом или значением
      }
    
      const hasDuplicateKeys = form.items.some((item) =>
        form.items.some(
          (currentItem) => currentItem.key === item.key && currentItem.id !== item.id
        )
      );
    
      if (hasDuplicateKeys) {
        showError();
        return;
      }

      const formData = new FormData();
      const templateWithoutImages = {
        ...form,
        image: [],
    };
    
    const imageBlob = new Blob([new Uint8Array(form.image)], { type: "image/png" });

    formData.append("template", JSON.stringify(templateWithoutImages));
    formData.append("image", imageBlob);
  
        await editTemplate(formData);
        onHide();
        fetch();
      }

      return (
          <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Редагування організації</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Назва</Form.Label>
              <Form.Control type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            </Form.Group>
            <div className={cl.items}>
            {form.items.map((item) => 
              <div key={item.id} className={cl.item}>
                <button className={cl.deleteButton}><img src={trashIcon} onClick={(e: MouseEvent) => handleDeleteItem(e, item.id)} alt="" /></button>
                    <CustomInput styles={{maxWidth: "100px"}} placeholder='Ключ' value={item.key} onChange={(val) => handleItemChange({...item, key: val})}></CustomInput>
                    <CustomInput placeholder='Значення' value={item.value} onChange={(val) => handleItemChange({...item, value: val})}></CustomInput>
                    <FormCheck checked={item.changeable} onChange={(e) => handleItemChange({...item, changeable: e.target.checked})} label="не змінне" />
              </div>
            )}
          </div>
          <Button onClick={handleAddItem} icon={addIcon} styles={{width: "100%"}}>Додати значення</Button>
          {previewUrl && (
                        <div style={{ marginTop: "10px" }}>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>
                    )}
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>
              Закрити
            </Button>
            <Button type="dark" onClick={handleSave}>
              Зберегти
            </Button>
          </Modal.Footer>
        </Modal>
        );
  }