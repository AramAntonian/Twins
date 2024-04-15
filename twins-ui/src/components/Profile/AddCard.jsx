import { useState } from 'react'
import bg from '../../components/svg/bg_signin.svg'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import CardInput from './CardInput'


function AddCard() {
    const [cardList, setCardList] = useState([1])
    return (
        <div>
            <Header />
            <div style={{
                background: 'black'
            }}>
                <img src={bg} alt='bg' style={{
                    width: '100%'
                }} />
                <div
                    style={{
                        position: 'absolute',
                        width: '450px',
                        border: '2px solid #E0A24E',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        top: '150px',
                        left: '100px',
                        padding: '20px 35px',
                        gap: '25px'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        top: 0,
                        left: 0,
                        background: 'grey',
                        borderRadius: '20px',
                        opacity: 0.4
                    }} />
                    <div style={{
                        color: 'white',
                        fontSize: '32px',
                        textAlign: 'center',
                        zIndex: 2
                    }}>Payment Method</div>
                    <div style={{
                        color: 'white',
                        fontSize: "24px",
                        zIndex: 2
                    }}>Card number</div>
                    <div style={{
                        width: '100%',
                        zIndex: 2,
                    }}>
                        {
                            cardList.map(el => (
                                <CardInput idx={el} />
                            ))
                        }
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div
                            onClick={() => {
                                setCardList(prev => {
                                    if (prev[prev.length - 1] <= 3) {
                                        prev.push(prev[prev.length - 1] + 1)
                                        return [...prev]
                                    } else {
                                        return prev
                                    }
                                })
                            }}
                            style={{
                                padding: '5px 20px',
                                background: "#E0A24E",
                                zIndex: 2,
                                color: 'white',
                                borderRadius: '15px'
                            }}>Add Card</div>
                        <div style={{
                            padding: '5px 20px',
                            background: "#E0A24E",
                            zIndex: 2,
                            color: 'white',
                            borderRadius: '15px'
                        }}>Save Card</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddCard