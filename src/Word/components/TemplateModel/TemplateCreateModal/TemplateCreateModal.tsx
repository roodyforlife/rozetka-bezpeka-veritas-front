import React, { MouseEvent, useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { Button } from '../../../../components/UI/Button/Button';
import { ITemplate, ITemplateItem } from '../../../../interfaces/ITemplate';
import { CustomInput } from '../../../../components/UI/CustomInput/CustomInput';
import uuid from 'react-uuid';
import cl from './TemplateCreateModal.module.css';
import { addTemplate } from '../../../../http/templateApi';
import { addIcon, trashIcon } from '../../../../imagesConsts';

interface IProps {
    show: boolean,
    onHide: () => void
    fetch: () => void
}

export const TemplateCreateModal = ({onHide, show, fetch}: IProps) => {
  const defaultValue = {
    id: uuid(),
    name: "",
    items: []
  }
    const [form, setForm] = useState<ITemplate>(defaultValue);

    const handleAddItem = () => {
      const newItem = {
        id: uuid(),
        key: "",
        value: ""
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

      await addTemplate(form);
      onHide();
      fetch();
      setForm(defaultValue)
    }

    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Додавання організації</Modal.Title>
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
                <CustomInput placeholder='Ключ' value={item.key} onChange={(val) => handleItemChange({...item, key: val})}></CustomInput>
                <CustomInput placeholder='Значення' value={item.value} onChange={(val) => handleItemChange({...item, value: val})}></CustomInput>
              </div>
            )}
          </div>
          <Button onClick={handleAddItem} icon={addIcon} styles={{width: "100%"}}>Add item</Button>
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
