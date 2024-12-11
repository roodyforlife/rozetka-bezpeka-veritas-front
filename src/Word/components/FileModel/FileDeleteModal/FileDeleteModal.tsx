import React from 'react'
import { IWordFile } from '../../../../interfaces/IWordFile'
import { Form, Modal } from 'react-bootstrap'
import { Button } from '../../../../components/UI/Button/Button'

interface IProps {
    show: boolean,
    onHide: () => void,
    file: IWordFile,
    remove: (id: string) => void
 }

export const FileDeleteModal = ({show, onHide, remove, file}: IProps) => {
  return (
    <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Deleting  new file</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
      <Form.Group controlId="formFile">
        <Form.Label>Do you really want to delete {file.name}?</Form.Label>
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>
        Close
      </Button>
      <Button onClick={() => remove(file.id)}>
        Remove
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
