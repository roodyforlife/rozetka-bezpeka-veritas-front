import React from 'react'
import { ITemplate } from '../../../../../interfaces/ITemplate'
import { Form, Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/UI/Button/Button'


interface IProps {
    show: boolean,
    onHide: () => void,
    template: ITemplate,
    remove: (id: string) => void
 }

export const TemplateDeleteModal = ({show, onHide, remove, template}: IProps) => {
    return (
      <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Видалення організації</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group controlId="formFile">
          <Form.Label>Ви дійсно хочете видалити організацію: {template.name}?</Form.Label>
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>
          Закрити
        </Button>
        <Button type="dark" onClick={() => remove(template.id)}>
          Видалити
        </Button>
      </Modal.Footer>
    </Modal>
    )
  }
  