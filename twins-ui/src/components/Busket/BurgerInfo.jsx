import React, { useEffect, useState } from 'react'
import burger from '../svg/cheesburger.svg'


function BurgerInfo({ name, price, setTotalPrice }) {
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        setTotalPrice(prev => prev + price)
    }, [setTotalPrice, price])

    function add() {
        setQuantity(prev => prev + 1)
        setTotalPrice(prev => prev + price)
    }

    function remove() {
        setQuantity(prev => prev === 1 ? prev : prev - 1)
        setTotalPrice(prev => prev - price)
    }

    return (
        <div style={{
            display: 'flex',
            gap: '60px',
            alignItems: 'center',
            borderBottom: '1px solid #E0A24E'
        }}>
            <img src={burger} alt='burger' width={200} />
            <div style={{
                marginTop: '50px',
                fontSize: '24px',
                width: '320px',
                textWrap: 'nowrap',
                whiteSpace: 'nowrap'
            }}>{name}</div>
            <div style={{
                marginTop: '50px',
                fontSize: '24px',
            }}>{price}</div>
            <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                marginTop: '50px'
            }}>
                <div
                    onClick={remove}
                    style={{
                        padding: "5px 0px",
                        width: '25px',
                        border: '1px solid #E0A24E',
                        display: 'flex',
                        borderRadius: '10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}>-</div>
                <div>{quantity}</div>
                <div
                    onClick={add}
                    style={{
                        padding: "5px 0px",
                        width: '25px',
                        border: '1px solid #E0A24E',
                        display: 'flex',
                        borderRadius: '10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}>+</div>
            </div>
            <div style={{
                fontSize: '24px',
                marginTop: '50px'
            }}>{price * quantity}</div>
        </div >
    )
}

export default BurgerInfo