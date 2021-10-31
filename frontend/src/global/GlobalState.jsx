import React, { useState, useEffect } from "react";
import { GlobalStateContext } from "./GlobalStateContext";

const GlobalState = (props) => {
    const[cart, setCart] = useState([])
    const [quantidade, setQuantidade] = useState(0)

    const onClickSendPizzaToCart = (pizza) => {
        const newCart = cart
        newCart.push(pizza)
        setCart(newCart)
    }

    const onClickRemovePizzaToCart = (pizzaId) => {
        const newCart = cart
        newCart.forEach((pizza, index) => {
            if(pizza.id === pizzaId ){
                newCart.slice(index, 1)
            }
        })
        setCart(newCart)
    }

    const addPizzaToCard = () => {
        let quant = quantidade
        quant++
        setQuantidade(quant)
    }

    const removePizzaToCard = (pizzaId) => {
        let quant = quantidade
        if(quant > 0){
            quant--
        }else{
            onClickRemovePizzaToCart(pizzaId)
        }
        
        setQuantidade(quant)
    }

    useEffect(() => {
        onClickSendPizzaToCart()
    }, [cart])

    const getCart = () => {
        return cart
    }

    return(
        <GlobalStateContext.Provider value={{cart, setCart, onClickSendPizzaToCart,
        onClickRemovePizzaToCart, getCart, quantidade, addPizzaToCard, removePizzaToCard}}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState