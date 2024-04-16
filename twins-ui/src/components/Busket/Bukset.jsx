import { useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import BurgerInfo from './BurgerInfo'
import Checkout from './Checkout'

function Busket() {
    const [totalPrice, setTotalPrice] = useState(0)
    const [checkout, setCheckout] = useState(false)



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

                                <BurgerInfo name="cheesburger" price={2000} setTotalPrice={setTotalPrice} />
                                <BurgerInfo name="Chicken Honey Mustard" price={1500} setTotalPrice={setTotalPrice} />
                                <BurgerInfo name="Bacon Truffle" price={3000} setTotalPrice={setTotalPrice} />
                                <div style={{
                                    width: '100%',
                                    background: 'white',
                                    padding: '20px 50px 10px 50px',
                                    display: 'flex',
                                    bottom: 0,
                                    boxSizing: 'border-box',
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
                            : <Checkout />
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Busket