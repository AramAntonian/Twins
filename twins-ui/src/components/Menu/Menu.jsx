import { useEffect, useState } from "react";
import Header from "../Header/Header";
import bg from '../svg/paper_black.svg'
import Footer from "../Footer/Footer";
import add from '../svg/add.svg'
import { useNavigate } from "react-router";
import Product from "./Product";

function Menu() {
    const [choosen, setChoosen] = useState('burgers')
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        (async function () {
            const res = localStorage.getItem('USER')
            if (res) {
                const data = await JSON.parse(res)
                setUser(data)
            }
        })()
    }, [])

    function handleAdd() {
        navigate(`/menu/${choosen}/AddProduct`)
    }

    useEffect(() => {
        (async function () {
            const body = { type: choosen }
            const res = await fetch('http://localhost:3002/menu', {
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
                setList(data.menu)
            }
        })()

    }, [choosen, flag])

    return (
        <div>
            <Header />
            <div style={{
                height: '100px',
                background: 'black',
                width: '100%',
                position: 'relative'
            }} />
            <div style={{
                background: 'black',
                padding: '130px 0',
                backgroundImage: `url(${bg})`
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                    marginBottom: '50px'
                }}>
                    <div
                        onClick={() => { setChoosen('burgers') }}
                        style={{
                            padding: '5px 7px',
                            color: choosen !== 'burgers' ? '#AD1C23' : 'white',
                            fontSize: '24px',
                            background: choosen === 'burgers' ? '#AD1C23' : 'white',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            border: '1px solid #AD1C23'
                        }}>Burgers</div>
                    <div
                        onClick={() => { setChoosen('fries') }}
                        style={{
                            padding: '5px 7px',
                            color: choosen !== 'fries' ? '#AD1C23' : 'white',
                            fontSize: '24px',
                            background: choosen === 'fries' ? '#AD1C23' : 'white',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            border: '1px solid #AD1C23'
                        }}>Fries</div>
                    <div
                        onClick={() => { setChoosen('sauces') }}
                        style={{
                            padding: '5px 7px',
                            color: choosen !== 'sauces' ? '#AD1C23' : 'white',
                            fontSize: '24px',
                            background: choosen === 'sauces' ? '#AD1C23' : 'white',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            border: '1px solid #AD1C23'
                        }}>Sauces</div>
                    <div
                        onClick={() => { setChoosen('drinks') }}
                        style={{
                            padding: '5px 7px',
                            color: choosen !== 'drinks' ? '#AD1C23' : 'white',
                            fontSize: '24px',
                            background: choosen === 'drinks' ? '#AD1C23' : 'white',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            border: '1px solid #AD1C23'
                        }}>Drinks</div>
                </div>
                <div>
                    {
                        choosen === 'burgers' ?
                            <div style={{
                                padding: '0 200px'

                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    gap: '100px',
                                }}>
                                    {
                                        list.map((el, idx) => (
                                            <Product key={idx} name={el.name} price={el.price + 'AMD'} src={el.src} id={el.id} setFlag={setFlag} />
                                        ))
                                    }
                                </div>
                                {/* <div style={{
                                    marginTop: '100px'
                                }}>
                                    <div style={{
                                        fontSize: '48px',
                                        color: '#AD1C23',
                                        marginBottom: '50px'
                                    }}>Double trouble smashburgers</div>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        gap: '100px',
                                    }}>
                                    </div>
                                </div> */}
                            </div>
                            : choosen === 'fries' ?
                                <div style={{
                                    padding: '0 200px'

                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        gap: '100px',
                                    }}>
                                        {
                                            list.map((el, idx) => (
                                                <Product key={idx} name={el.name} price={el.price + 'AMD'} src={el.src} id={el.id} setFlag={setFlag} />
                                            ))
                                        }
                                    </div>
                                </div>
                                : choosen === 'sauces' ?
                                    <div style={{
                                        padding: '0 200px'

                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            gap: '100px',
                                        }}>
                                            {
                                                list.map((el, idx) => (
                                                    <Product key={idx} name={el.name} price={el.price + 'AMD'} src={el.src} id={el.id} setFlag={setFlag} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div style={{
                                        padding: '0 200px'

                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            gap: '100px',
                                        }}>
                                            {
                                                list.map((el, idx) => (
                                                    <Product key={idx} name={el.name} price={el.price + 'AMD'} src={el.src} id={el.id} setFlag={setFlag} />
                                                ))
                                            }
                                        </div>
                                    </div>
                    }
                </div>
                {
                    user.fullName?.includes('ADMIN') ?
                        <img src={add} alt={'add'} style={{ position: 'sticky', bottom: '30px', left: '90%' }} onClick={handleAdd} />
                        : null
                }
            </div>

            <Footer />
        </div >
    )
}

export default Menu