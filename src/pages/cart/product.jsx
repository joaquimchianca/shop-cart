import React, { useContext } from 'react'
import './product.css'
import { CartContext } from '../../context/cart-context'
import { Trash } from 'phosphor-react'
import { ArrowCircleUp } from 'phosphor-react'
import { ArrowCircleDown } from 'phosphor-react'

const Produto = (props) => {
  const { id, nome, descricao, preco, imagem } = props.data
  const { adiciona, cartItens, remove, deleta, somaPrecoProduto } = useContext(CartContext)

  const cartItensQtnd = cartItens[id]
  return (
    <div className='produto'>
      <img src={imagem} />
      <div className='produto__info'>
        <p className='produto__nome'>{nome}</p>
        <p className='produto__descricao'>{descricao}</p>
        <p>R$ {preco.toFixed(2)}</p>
      </div>
      <div className='produto__quantidade'>
        <p>{cartItensQtnd}</p>
        <div>
          <button onClick={() => adiciona(id)}> <ArrowCircleUp size={22} weight="light" /> </button>
          <button onClick={() => remove(id)}> <ArrowCircleDown size={22} weight="light" /> </button>
        </div>
      </div>
      <p><b>R$ {somaPrecoProduto(id).toFixed(2)}</b></p>
      <button onClick={() => deleta(id)}><Trash size={32} weight="light" /></button>

    </div>
  )
}

export default Produto