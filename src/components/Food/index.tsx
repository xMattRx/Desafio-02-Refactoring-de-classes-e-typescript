import React, { useEffect, useState } from 'react'
import { FiEdit3, FiTrash } from 'react-icons/fi'
import api from '../../services/api'
import { Container } from './styles'


interface IfoodType{
    id: number,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
}

interface Ifood {
  key: number
  food: {
    id: number,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
  }
  handleDelete: (id: number) => void
  handleEditFood: (food:IfoodType) => void
}


function Food(props: Ifood) {

  const [food, setFood] = useState<IfoodType>({id: NaN,name: "", description: "", price: "", available: false, image:""})
  const [available, setAvailable] = useState(false)

  useEffect(()=>{
    setFood(props.food)
    setAvailable(props.food.available)
  },[props.food])

  const toggleAvailable = async() =>{
    await api.put(`/foods/${food.id}`,{
      ...food,
      available: !available
    })
    setAvailable(props.food.available)
  }

  const setEditingFood = () => {
    props.handleEditFood(food)
  }

  return (
    <Container available={available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button 
          type="button" 
          className="icon"
          onClick={setEditingFood}
          data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20}/>
          </button>
          <button 
          type="button" 
          className="icon"
          onClick={()=>{props.handleDelete(food.id)}}
          data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20}/>
          </button>
        </div>
        <div className="availability-container">
          <p>{available ? 'Dispon??vel' : 'Indispon??vel'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input 
            id={`available-switch-${food.id}`}
            type="checkbox" 
            checked={available}
            onChange={toggleAvailable}
            data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider"/>
          </label>
        </div>
      </section>
    </Container>
  )
}

export default Food