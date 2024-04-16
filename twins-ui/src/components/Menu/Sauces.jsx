import { useState } from 'react'
import sauces from '../svg/sauces.svg'
import busket from '../svg/red_busket.svg'

function Sauces({ name, price }) {
    const [quantity, setQuantity] = useState(1)
    const [hover, setHover] = useState(false)
    function add() {
        setQuantity(prev => prev + 1)
    }

    function remove() {
        setQuantity(prev => prev === 1 ? prev : prev - 1)
    }

    return (
        <div
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #E0A24E',
                borderRadius: '50px',
                width: 'fit-content',
                padding: '15px',
                gap: '10px',
                boxShadow: hover ? '1px 5px 72px -17px rgba(255,0,0,1)' : '',
                transitionDuration: '0.5s',
                alignItems: 'center'
            }}>
            <img src={sauces} alt='burger' width={200} />
            <div style={{
                fontSize: '22px'
            }}>{name}</div>
            <div style={{
                fontSize: '18px'
            }}>{price}</div>
            <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center'
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
                <img src={busket} alt='busket' />
            </div>
        </div>
    )
}

export default Sauces