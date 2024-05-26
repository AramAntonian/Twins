import { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import BurgerInfo from './BurgerInfo'
import Checkout from './Checkout'
import { useLocation } from 'react-router'

function Busket() {
    const [totalPrice, setTotalPrice] = useState(0)
    const [checkout, setCheckout] = useState(false)
    const [busket, setBusket] = useState([])
    const [user, setUser] = useState({})
    const location = useLocation()
    const { from } = location.state || {}

    useEffect(() => {
        if (from === 'card') {
            setCheckout(true)
        }
    }, [from])

    useEffect(() => {
        const r = localStorage.getItem('USER')
        if (r) {
            (async function () {
                const d = JSON.parse(r)
                setUser(d)
                const body = { userId: d.id }
                const res = await fetch('http://localhost:3002/busket', {
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
                    console.log(data.busket);
                    setBusket(data.busket)
                }
            })()
        } else {
            alert('register to add products')
        }

    }, [checkout])

    return (
        <>
            <Header />
            <div style={{
                background: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '100px 0',
            }}>
                <div style={{
                    width: '80%',
                    minHeight: '600px',
                    background: 'white',
                    borderRadius: '20px',
                    padding: '40px 100px',
                    boxSizing: 'border-box',
                    boxShadow: '1px 5px 72px -17px rgba(255,0,0,1)',
                    position: 'relative'
                }}>
                    {
                        !checkout ?
                            <>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{
                                        marginLeft: '60px',
                                        fontSize: "28px"
                                    }}>Product</div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '40px'
                                    }}>
                                        <div style={{
                                            fontSize: "28px"
                                        }}>Price</div>
                                        <div style={{
                                            fontSize: "28px"
                                        }}>Quantity</div>
                                        <div style={{
                                            fontSize: "28px"
                                        }}>Total Price</div>
                                    </div>
                                </div>
                                {
                                    busket?.map(el => (
                                        <BurgerInfo name={el.name} price={el.price} setTotalPrice={setTotalPrice} id={el.id} userId={user.id} count={el.count} photo={el.src} />
                                    ))
                                }
                                <div style={{
                                    width: '100%',
                                    position: 'absolute',
                                    bottom: '0',
                                    background: 'white',
                                    padding: '20px 50px 10px 50px',
                                    display: 'flex',
                                    boxSizing: 'border-box',
                                    left: 0,
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    borderRadius: '20px',
                                }}>

                                    <div
                                        onClick={() => { setCheckout(true) }}
                                        style={{
                                            fontSize: '24px',
                                            padding: '5px 30px',
                                            cursor: 'pointer',
                                            background: '#AD1C23',
                                            color: 'white',
                                            borderRadius: '15px'
                                        }}>Checkout</div>
                                    <div style={{ fontSize: '24px' }}>Total: {totalPrice} AMD</div>
                                </div>
                            </>
                            : <Checkout list={busket} userId={user.id} username={user.fullName} />
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Busket