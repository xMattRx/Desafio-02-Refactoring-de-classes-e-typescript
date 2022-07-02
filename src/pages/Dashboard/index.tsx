import React, { useEffect, useState } from 'react';
import Food from '../../components/Food';
import Header from '../../components/Header';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import api from '../../services/api';
import { FoodsContainer } from './styles';

export default function Dashboard() {

  
interface IfoodType{
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}
  

  const [foods, setFoods] = useState<IfoodType[]>([]) 
  const [editingFood, setEditingFood] = useState<IfoodType>({id: NaN, name:"",description:"",price:"",available: false, image: ""}) 
  const [modalOpen, setModalOpen] = useState(false) 
  const [editModalOpen, setEditModalOpen] = useState(false) 

  useEffect(()=>{
    asyncResponse()
  },[])


  const asyncResponse = async () =>{
    const response = await api.get<IfoodType[]>('/foods')
    setFoods(response.data)
  } 

  const handleAddFood = async (food: IfoodType) => {
    try{
      const response = await api.post('/foods',{
        ...food,
        available: true
      })
      setFoods([...foods, response.data])
    } catch(err) {
      console.error(err)
    }
  }

  const handleUpdateFood = async (food: IfoodType) => {

    try{
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        {...editingFood, ...food},
      )
        const foodsUpdated = foods.map(f => f.id !== foodUpdated.data.id ? f : foodUpdated.data)
        setFoods(foodsUpdated)
    }catch(err){
      console.error(err)
    }
  }

  const handleDeleteFood = async (id: number) =>{
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter(food => food.id !== id)

    setFoods(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () =>{
    setEditModalOpen(!editModal)
  }

  const editModal = () =>{
    setEditModalOpen(!editModal)
  }

  const handleEditFood = (food: IfoodType) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }


  
  return (
    <>
    
    <Header openModal={toggleModal} />
    <ModalAddFood
      isOpen={modalOpen}
      setIsOpen={toggleModal}
      handleAddFood={handleAddFood}
    />
    <ModalEditFood
      isOpen={editModalOpen}
      setIsOpen={toggleEditModal}
      editingFood={editingFood}
      handleUpdateFood={handleUpdateFood}
    />

    <FoodsContainer data-testid="foods-list">
      {foods &&
        foods.map(food => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
    </FoodsContainer>
  </>
  )
}
