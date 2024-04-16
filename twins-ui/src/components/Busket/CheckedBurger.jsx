import { useEffect, useState } from 'react'
import burger from '../svg/cheesburger.svg'

function CheckedBurger({ name, price, setTotalPrice, last}) {
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
            gap: '10px',
            alignItems: 'center',
            width: '100%',
            borderBottom: last ? '1px solid #E0A24E' : ''
        }}>
            <img src={burger} alt='burger' width={150} />
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