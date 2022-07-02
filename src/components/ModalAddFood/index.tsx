import React, { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';



interface IfoodType{
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

interface IModalAddFood{
  setIsOpen: () => void,
  handleAddFood: (data: IfoodType) => void,
  isOpen: boolean
}

export default function ModalAddFood({setIsOpen, handleAddFood, isOpen}: IModalAddFood) {
  const formRef = useRef(null)
  
  const handleSubmit = async (data: IfoodType) =>{
    handleAddFood(data);
    setIsOpen();
  }
  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <Form ref={formRef} onSubmit={handleSubmit}>
      <h1>Novo Prato</h1>
      <Input name="image" placeholder="Cole o link aqui" />

      <Input name="name" placeholder="Ex: Moda Italiana" />
      <Input name="price" placeholder="Ex: 19.90" />

      <Input name="description" placeholder="Descrição" />
      <button type="submit" data-testid="add-food-button">
        <p className="text">Adicionar Prato</p>
        <div className="icon">
          <FiCheckSquare size={24} />
        </div>
      </button>
    </Form>
  </Modal>
    
  )
}
