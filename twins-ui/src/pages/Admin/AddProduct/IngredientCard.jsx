import { useEffect, useState } from 'react'

function IngredientCard({ el, setFlag, setIngredients, hoverEffect }) {
    const [hover, setHover] = useState(false)
    const [quantity, setQuantity] = useState(1)

    function add() {
        setQuantity(prev => prev + 1)
    }

    function remove() {
        setQuantity(prev => prev === 1 ? prev : prev - 1)
    }

    useEffect(() => {
        setIngredients((prev) => {
            prev[el.id + 'q'] = quantity
            return prev
        })
    }, [quantity, el, setIngredients])



    function handleAdd(e) {
        if (e.target.checked) {
            setIngredients((prev) => {
                prev[el.id] = true
                prev[el.id + 'q'] = quantity
                return prev
            })
        } else {
            setIngredients((prev) => {
                prev[el.id] = false
                prev[el.id + 'q'] = quantity
                return prev
            })
        }
    }

    function handleDelete() {
        (async function () {
            const body = { id: el.id }
            const res = await fetch('http://localhost:3002/ingredient', {
                headers: {
                    "Content-Type": 'application/json',
                },
                method: 'DELETE',
                body: JSON.stringify(body)
            })
            const data = await res.json()

            if (data.error) {
                alert(data.error)
            } else {
                setFlag(prev => !prev)
            }
        })()
    }

    return (
        <div
            onMouseEnter={hoverEffect ? () => { setHover(true) } : () => { }}
            onMouseLeave={hoverEffect ? () => { setHover(false) } : () => { }}
            style={{
                width: hover ? '275px' : '250px',
                height: hover ? '325px' : '300px',
                border: "2px solid #E0A24E",
                borderRadius: '50px',
                background: 'white',
                padding: '30px 30px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                boxShadow: hover ? '1px 5px 72px -17px rgba(255,0,0,1)' : '',
                flexDirection: 'column',
                transitionDuration: "0.5s",
                justifyContent: 'space-between'
            }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <input type='checkbox'
                    onClick={(e) => { handleAdd(e) }}
                    style={{
                        width: hover ? '55px' : '50px',
                        height: hover ? '23px' : '20px',
                        transitionDuration: '0.5s',
                    }} />
                <div
                    onClick={handleDelete}
                    style={{
                        fontSize: hover ? '35px' : '32px',
                        color: "#AD1C23",
                        fontWeight: '200',
                        display: hoverEffect ? 'block' : 'none',
                        transitionDuration: '0.5s',
                        cursor: 'pointer',
                        fontFamily: 'Roboto, sans-serif'
                    }}>x</div>
            </div>
            <img src={el.src} alt='pictur' width={hover ? 112 : 100} style={{ backgroundSize: 'cover', transitionDuration: '0.5s', marginBottom: '50px' }} />
            <div style={{
                fontWeight: "600",
                fontSize: hover ? '20px' : '18px',
                background: 'none',
                textAlign: 'center',
                marginBottom: '15px',
                transitionDuration: '0.5s'
            }} >{el.name}</div>
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
        </div>
    )
}

export default IngredientCard