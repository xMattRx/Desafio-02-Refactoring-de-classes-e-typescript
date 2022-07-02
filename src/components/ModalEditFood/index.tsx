import React, { useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import Input from '../Input'
import Modal from '../Modal'
import { Form } from './styles'

interface IfoodType{
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

interface IModalEditFood{
  isOpen: boolean,
  setIsOpen: () => void,
  editingFood: IfoodType,
  handleUpdateFood: (food: IfoodType) => void,
}

export default function ModalEditFood({isOpen, setIsOpen, editingFood, handleUpdateFood}: IModalEditFood) {
  const formRef = useRef(null)

  const handleSubmit = async (data: IfoodType) => {
    handleUpdateFood(data)
    setIsOpen();
  }
  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
      <h1>Editar Prato</h1>
      <Input name="image" placeholder="Cole o link aqui" />

      <Input name="name" placeholder="Ex: Moda Italiana" />
      <Input name="price" placeholder="Ex: 19.90" />

      <Input name="description" placeholder="Descrição" />

      <button type="submit" data-testid="edit-food-button">
        <div className="text">Editar Prato</div>
        <div className="icon">
          <FiCheckSquare size={24} />
        </div>
      </button>
    </Form>
  </Modal>
  )
}
