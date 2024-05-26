import React, { useEffect, useState } from 'react'
import burger from '../svg/cheesburger.svg'


function BurgerInfo({ name, price, setTotalPrice, id, userId, photo, count }) {
    const [quantity, setQuantity] = useState(count)

    useEffect(() => {
        setTotalPrice(prev => prev + +price)
    }, [setTotalPrice, price])

    function add() {
        setQuantity(prev => {
            (async function () {
                const body = { productId: id, userId: userId, count: prev + 1 }
                const res = await fetch('http://localhost:3002/busket/edit', {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(body)
                })
                const data = await res.json()
                if (data.error) {
                    alert(data.error)
                }
            })()

            return prev + 1
        })
        setTotalPrice(prev => prev + +price)

    }

    function remove() {
        setQuantity(prev => {
            (async function () {
                const body = { productId: id, userId: userId, count: prev === 1 ? prev : prev - 1 }
                const res = await fetch('http://localhost:3002/busket/edit', {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(body)
                })
                const data = await res.json()
                if (data.error) {
                    alert(data.error)
                }
            })()
            return prev === 1 ? prev : prev - 1
        })
        if (quantity !== 1) {
            setTotalPrice(prev => prev - +price)

        }
    }

    return (
        <div style={{
            display: 'flex',
            gap: '60px',
            alignItems: 'center',
            borderBottom: '1px solid #E0A24E'
        }}>
            <div style={{
                width: '180px',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img src={photo} alt='burger' width={150} height={150} />
            </div>
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
            }}>{+price * quantity}</div>
        </div >
    )
}

export default BurgerInfo