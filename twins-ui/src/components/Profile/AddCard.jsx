import { useEffect, useState } from 'react'
import bg from '../../components/svg/bg_signin.svg'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import CardInput from './CardInput'
import { useNavigate } from 'react-router-dom'

function AddCard() {
    const [side, setSide] = useState(false)
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [cards, setCards] = useState([])
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        (async function () {
            const res = localStorage.getItem('USER')
            if (res) {
                const data = JSON.parse(res)
                setUser(data)
            } else {
                navigate('/signin')
            }
        })()
    }, [])

    useEffect(() => {
        if (!side) {
            (async function () {
                const body = { userId: user.id }
                const res = await fetch('http://localhost:3002/cards', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'POST',
                    body: JSON.stringify(body)
                });
                const data = await res.json()
                if (data.error) {
                    alert(data.error)
                } else {
                    setCards(data.cards)
                }
            })()
        }
    }, [side, user, deleted])


    useEffect(() => {
        console.log(side);
    }, [side])

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
                        <CardInput side={side} userId={user?.id} setSide={setSide} cardList={cards} setDeleted={setDeleted} />
                    </div>

                    {
                        !side ?
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div
                                    onClick={() => { setSide(true) }}
                                    style={{
                                        padding: '5px 20px',
                                        background: "#E0A24E",
                                        zIndex: 2,
                                        color: 'white',
                                        borderRadius: '15px'
                                    }}>Add Card</div>
                                <div 
                                    onClick = {() => { navigate(`/user/${user?.fullname}`) }}
                                style={{
                                    padding: side ? '10px 0' : '5px 20px',
                                    background: "#E0A24E",
                                    zIndex: 2,
                                    color: 'white',
                                    borderRadius: '15px',
                                    width: side ? '100%' : '',
                                    textAlign: 'center'
                                }}>Save Card</div>
                            </div>
                            : null
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddCard