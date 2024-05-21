import { useEffect, useState } from 'react'
import burger from '../svg/cheesburger.svg'

function CheckedBurger({ name, price, setTotalPrice, last, id, userId, photo, count }) {
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
        setTotalPrice(prev => prev - +price)
    }

    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            width: '100%',
            borderBottom: last ? '1px solid #E0A24E' : ''
        }}>
            <img src={photo} alt='burger' width={150} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                marginTop: '40px'
            }}>
                <div style={{
                    fontSize: '22px',
                    whiteSpace: 'nowrap',
                    width: '300px'
                }}>{name}</div>
                <div style={{
                    fontSize: '22px'
                }}>{price} AMD</div>
            </div>
            <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                marginTop: '40px',
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
        </div >
    )
}

export default CheckedBurger