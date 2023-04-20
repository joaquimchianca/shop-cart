import React, {createContext, useState} from 'react'
import { PRODUCTS } from '../data'

export const CartContext = createContext(null)

const carrinhoVazio = () => {
    let carrinho = {}
    for (let i = 1; i < PRODUCTS.length + 1; i++) {
        carrinho[i] = 1
    }
    return carrinho
}

export const CartContextProvider = (props) => {
    const [cartItens, setCartItens] = useState(carrinhoVazio())

    const adiciona = (itemId) => {
        setCartItens((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
    }

    const remove = (itemId) => {
        setCartItens((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
    }

    const deleta = (itemId) => {
        setCartItens((prev) => ({...prev, [itemId]: 0}))
    }

    const somaQtd = (itemId) => {
        let soma = 0
        for( let i = 1; i < 4; i++ ) {
            soma += cartItens[i]
        }
        return soma
    }

    const somaPrecoProduto = (itemId) => {
        let subtotal = 0
        if( cartItens[itemId] > 0 ) {
            let itemInfo = PRODUCTS.find((p) => p.id === itemId)
            subtotal = Number(cartItens[itemId]) * itemInfo.preco
        }
        return subtotal
    }

    const somaPrecoTotal = () => {
        let total = 0
        for(const item in cartItens) {
            if(cartItens[item] > 0) {
                let itemInfo = PRODUCTS.find((p) => p.id === Number(item))
                let subtotal = Number(cartItens[item]) * itemInfo.preco
                total += subtotal
            }
        }
        return total
    }

    const somaVenda = (frete) => {
        const venda = somaPrecoTotal()
        return venda + Number(frete)
    }

    const contextValue = { cartItens, adiciona, remove, deleta, somaQtd, somaPrecoProduto, somaPrecoTotal, somaVenda }
    return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>
}
