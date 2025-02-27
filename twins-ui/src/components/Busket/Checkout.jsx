import { useEffect, useState } from "react"
import CheckedBurger from "./CheckedBurger"
import ThankYou from "./ThankYou"
import { useNavigate } from "react-router"

function Checkout({ list, userId, username }) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [buy, setBuy] = useState(false)
    const navigate = useNavigate()
    const [card, setCard] = useState('')
    const [type, setType] = useState('d')
    const [address, setAddress] = useState('')


    function handleBuy() {
        (async function () {
            const body = { userId: userId }
            const res = await fetch('http://localhost:3002/busket', {
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
                setBuy(true)
                setTimeout(() => {
                    setBuy(false)
                    navigate('/')
                }, 3000)
            }
        })()
    }

    useEffect(() => {
        (async function () {
            const body = { userId }
            const res = await fetch('http://localhost:3002/cards', {
                headers: {
                    "Content-Type": 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.error) {
                alert(data.error)
            } else {
                for (let el of data.cards) {
                    if (el.selected) {
                        setCard(el.card)
                        break;
                    }
                }
            }
        })()
    }, [userId])

    function cardChange() {
        navigate('/user/' + username + '/addCard', { state: { from: 'checkout' } })
    }

    useEffect(() => {
        if (type === 'p') {
            setAddress('')
        }
    }, [type])

    return (
        <div style={{
            display: 'flex',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                width: '50%'
            }}>
                <div style={{
                    fontSize: '30px'
                }}>Order type</div>
                <form action="/submit-your-choice" method="post" style={{
                    display: 'flex',
                    gap: '20px',
                    marginLeft: '10px'
                }}>
                    <label style={{
                        fontSize: '20px'
                    }}>
                        <input type="radio" name="choice" value="Option1" onChange={(e) => { setType(e.target.value ? 'd' : '') }} checked={type === 'd' ? true : false} />
                        Delivery
                    </label>
                    <label style={{
                        fontSize: '20px'
                    }}>
                        <input type="radio" name="choice" value="Option2" onChange={(e) => { setType(e.target.value ? 'p' : '') }} checked={type === 'p' ? true : false} />
                        Pick up
                    </label>
                </form>
                <div style={{
                    display: 'flex',
                    flexDirection: "column",
                    gap: '10px'
                }}>
                    <div style={{
                        fontSize: '30px'
                    }}>Address</div>
                    <textarea
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        style={{
                            width: '250px',
                            height: '80px',
                            padding: '0px',
                            resize: 'none',
                            border: '1px solid #E0A24E',
                            background: '#D9D9D9'
                        }}
                        readOnly={type === 'p'}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: "column",
                    gap: '10px'
                }}>
                    <div style={{
                        fontSize: '30px'
                    }}>Payment method</div>
                    <div style={{
                        fontSize: '20px'
                    }}>Card number</div>
                    <input
                        value={card}
                        onChange={(e) => { }}
                        style={{
                            width: '250px',
                            height: '30px',
                            padding: '0px',
                            resize: 'none',
                            border: '1px solid #E0A24E',
                            background: '#D9D9D9'
                        }} />
                    <div
                        onClick={cardChange}
                        style={{
                            display: 'flex',
                            justifyContent: "flex-end",
                            width: '250px',
                            color: '#AD1C23',
                            cursor: 'pointer'
                        }}>change card</div>
                </div>
            </div>
            <div style={{
                width: '50%'
            }}>
                <div style={{
                    textAlign: 'center',
                    fontSize: '30px',
                    marginLeft: '25px'
                }}>Order summary</div>
                <div>
                    {
                        list.map((el, idx) => (
                            <CheckedBurger name={el.name} photo={el.src} price={el.price} setTotalPrice={setTotalPrice} key={idx} id={el.id} userId={userId} count={el.count} />
                        ))
                    }
                </div>
            </div>
            <div style={{
                width: '100%',
                background: 'white',
                padding: '20px 50px 10px 50px',
                display: 'flex',
                position: 'absolute',
                bottom: 0,
                left: 0,
                boxSizing: 'border-box',
                alignItems: 'center',
                justifyContent: "space-between",
                borderRadius: '20px'
            }}>

                <div
                    onClick={handleBuy}
                    style={{
                        fontSize: '24px',
                        padding: '5px 30px',
                        cursor: 'pointer',
                        background: '#AD1C23',
                        color: 'white',
                        borderRadius: '15px'
                    }}>Buy Now</div>
                <div style={{ fontSize: '24px' }}>Total: {totalPrice} AMD</div>
            </div>
            {
                buy ?
                    <ThankYou />
                    : null
            }
        </div>
    )
}

export default Checkout