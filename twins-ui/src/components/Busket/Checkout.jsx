import { useEffect, useState } from "react"
import CheckedBurger from "./CheckedBurger"
import ThankYou from "./ThankYou"

function Checkout() {
    const [totalPrice, setTotalPrice] = useState(0)
    const [buy, setBuy] = useState(false)

    useEffect(() => {
        if (buy) {
            setTimeout(() => {
                setBuy(false)
            }, 3000)
        }
    }, [buy])

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
                        <input type="radio" name="choice" value="Option1" />
                        Delivery
                    </label>
                    <label style={{
                        fontSize: '20px'
                    }}>
                        <input type="radio" name="choice" value="Option2" />
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
                        style={{
                            width: '250px',
                            height: '80px',
                            padding: '0px',
                            resize: 'none',
                            border: '1px solid #E0A24E',
                            background: '#D9D9D9'
                        }} />
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
                    <textarea
                        style={{
                            width: '250px',
                            height: '30px',
                            padding: '0px',
                            resize: 'none',
                            border: '1px solid #E0A24E',
                            background: '#D9D9D9'
                        }} />
                    <div>change card</div>
                </div>
            </div>
            <div style={{
                width: '50%'
            }}>
                <div style={{
                    textAlign: 'center',
                    fontSize: '30px'
                }}>Order summary</div>
                <div>
                    <CheckedBurger name={'cheesburger'} price={1500} setTotalPrice={setTotalPrice} />
                    <CheckedBurger name={'Chicken Honey Mustard'} price={3500} setTotalPrice={setTotalPrice} />
                    <CheckedBurger name={'Bacon Truffle'} price={2000} setTotalPrice={setTotalPrice} last={true} />
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
                    onClick={() => { setBuy(true) }}
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