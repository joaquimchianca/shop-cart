import React, { useState, useContext } from 'react'
import { PRODUCTS } from '../../data'
import Produto from './product'
import { CartContext } from '../../context/cart-context'
import './cart.css'
import { MagnifyingGlass } from 'phosphor-react'

async function request(cep) {
    try {
        const consulta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaJson = await consulta.json()
        if (consultaJson.erro) {
            alert("CEP não existe")
        } else {
            if (consultaJson.uf == 'RN') {
                return 0
            } else {
                return 25
            }
        }
    } catch (erro) {
        alert("CEP Inválido")
    }
    return -1
}

function Cart() {
    const { cartItens, somaQtd, somaPrecoTotal, somaVenda } = useContext(CartContext)

    const [frete, setFrete] = useState(0)
    const [disponivel, setDisponivel] = useState(true)

    async function handleClick() {
        const cep = document.querySelector('[data-cep]').value
        const valorFrete = await request(cep)
        if (valorFrete !== -1) {
            setFrete(valorFrete)
            setDisponivel(!disponivel)
        }

    }

    function fechaVenda() {
        const resposta = {
            produtos: cartItens,
            cep: document.querySelector('[data-cep]').value,
            frete: frete
        }

        console.log(resposta)
    }

    return (
        <div className='container'>
            <div className='carrinho'>
                <div className='carrinho__itens'>
                    <h1 className='carrinho__titulo'>
                        Carrinho de compras
                    </h1>
                    <p className='carrinho__subtitulo'>
                        Seu carrinho está com {somaQtd()} itens
                    </p>
                    {PRODUCTS.map((p) => {
                        if (cartItens[p.id] !== 0) {
                            return <Produto data={p} />
                        }
                    })}
                </div>

                <div className='carrinho__resumo'>
                    <span><h2>Resumo</h2></span>
                    <h3>Frete</h3>
                    <span className='carrinho__resumo__frete'>
                        <h3>CEP (apenas números)</h3>
                        <input type="text" placeholder='59000-000' required data-cep />
                        <button onClick={() => handleClick()}><MagnifyingGlass size={32} weight="light" /></button>
                        <p data-frete>R$ {frete.toFixed(2)}</p>
                    </span>
                    <span className='carrinho__resumo__valor'>
                        <p>Itens ({somaQtd()})</p>
                        <p>R$ {somaPrecoTotal().toFixed(2)}</p>
                    </span>
                    <span className='carrinho__resumo__valor'>
                        <p>Frete</p>
                        <p>R$ {frete.toFixed(2)}</p>
                    </span>
                    <span className='carrinho__resumo__valor'>
                        <p>Total</p>
                        <p>R$ {somaVenda(frete).toFixed(2)}</p>
                    </span>
                    <button disabled={disponivel} onClick={() => fechaVenda()}>Concluir pedido</button>
                </div>
            </div>
        </div>
    )
}

export default Cart