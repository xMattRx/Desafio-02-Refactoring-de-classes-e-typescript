import React from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import Logo from '../../assets/logo.svg'
import { Container } from './styles'

interface IHeader{
  openModal: () => void
}

export default function Header(props: IHeader) {
  
  return (
    <Container>
      <header>
          <img src={Logo} alt="" />
          <nav>
            <div>
              <button
                type="button"
                onClick={props.openModal}
              >
                 <div className="text">Novo Prato</div>
                <div className="icon">
                  <FiPlusSquare size={24}/>
                </div>
              </button>
            </div>
          </nav>
      </header>
    </Container>
  )
}
