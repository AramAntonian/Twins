import Header from "../Header/Header"
import bg from '../svg/paper_black.svg'
import busket from '../svg/busket_black.svg'
import bun from '../svg/bun.svg'
import burger from '../svg/cheesburger.svg'
import { useState } from "react"
import { useParams } from "react-router"

function Burger() {
    const { name } = useParams()
    const [quantity, setQuantity] = useState(1)

    function add() {
        setQuantity(prev => prev + 1)
    }

    function remove() {
        setQuantity(prev => prev === 1 ? prev : prev - 1)
    }
    return (
        <div>
            <Header />
            <div
                style={{
                    height: '100px',
                    background: "black"
                }}
            />
            <div style={{
                background: 'black',
                padding: '130px 100px',
                backgroundImage: `url(${bg})`
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #E0A24E',
                    padding: '10px 0 50px 0'
                }}>
                    <img src={burger} alt='burger' style={{
                        width: "30%"
                    }} />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: "30px",
                        width: "70%"
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: "row",
                            justifyContent: 'space-evenly'
                        }}>
                            <div style={{
                                fontSize: "42px",
                                width: '300px',
                                textWrap: 'wrap'
                            }}>{name}</div>
                            <div style={{
                                display: 'flex',
                                gap: '5px',
                                alignItems: 'center'
                            }}>
                                <div
                                    onClick={remove}
                                    style={{
                                        padding: "10px 0px",
                                        width: '40px',
                                        border: '1px solid #E0A24E',
                                        display: 'flex',
                                        borderRadius: '10px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}>-</div>
                                <div style={{
                                    fontSize: '32px'
                                }}>{quantity}</div>
                                <div
                                    onClick={add}
                                    style={{
                                        padding: "10px 0px",
                                        width: '40px',
                                        border: '1px solid #E0A24E',
                                        display: 'flex',
                                        borderRadius: '10px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}>+</div>
                            </div>
                        </div>
                        <div style={{
                            fontSize: "24px",
                            marginLeft: '180px'
                        }}>2300 AMD</div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            gap: '50px'
                        }}>
                            <div style={{
                                padding: "10px 30px",
                                borderRadius: "15px",
                                border: "1px solid #E0A24E",
                                cursor: 'pointer'
                            }}>Buy now</div>
                            <div style={{
                                padding: "10px 30px",
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: "15px",
                                border: "1px solid #E0A24E",
                                cursor: 'pointer'
                            }}>Buy now <img src={busket} alt='busket' /></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{
                        textAlign: 'center',
                        fontSize: '36px',
                        marginTop: '50px'
                    }}>Ingredients</div>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '30px 100px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <img src = {bun} alt = 'bun'/>
                            <div>Bun</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Burger 