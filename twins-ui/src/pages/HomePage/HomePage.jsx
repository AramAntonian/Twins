import Header from "../../components/Header/Header"
import bg from '../../components/svg/burger_background.svg'
import chees from '../../components/svg/cheesburger.svg'
import bacon from '../../components/svg/bacon.svg'
import chicken from '../../components/svg/chiken.svg'
import arrowL from '../../components/svg/arrowL.svg'
import delivery from '../../components/svg/delivery.svg'
import { useState } from "react"
import Footer from "../../components/Footer/Footer"

function HomePage() {
    const [burger, setBurger] = useState(0)
    const [anim, setAnim] = useState(0)

    function handleArrowClick(direction) {
        if (direction === 'left') {
            setTimeout(() => {
                setAnim(prev => {
                    if (prev === 0) {
                        return 2
                    } else {
                        return prev - 1
                    }
                })
            }, 100)
            setBurger(prev => {
                if (prev === 0) {
                    return 2
                } else {
                    return prev - 1
                }
            })
        } else {
            setTimeout(() => {
                setAnim(prev => {
                    if (prev === 2) {
                        return 0
                    } else {
                        return prev + 1
                    }
                })
            }, 100)
            setBurger(prev => {
                if (prev === 2) {
                    return 0
                } else {
                    return prev + 1
                }
            })
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}>
            <Header />
            <div style={{
                display: 'flex',
            }}>
                <div style={{
                    color: 'white',
                    width: '100%',
                    height: '90vh',
                    padding: '150px 50px',
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover'

                }}>
                    <span style={{
                        fontSize: '64px'
                    }}>Our<br /> Story<br /></span>
                    <span style={{
                        fontSize: '22px'
                    }}>Nestled in a bustling corner, our burger shop isn't<br /> just about food: it's a haven of sizzling patties,<br /> creative toppings, and warm smiles. Beyond the<br /> delicious aroma, it's the sense of community that<br /> keeps our customers coming back for more</span>
                </div>
            </div>
            <div style={{
                width: '100%',
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '100px',
                padding: '10px 0'
            }}>
                <div style={{
                    color: '#E8B754',
                    fontSize: '40px',
                    fontWeight: 'bolder'
                }}>Best sellers</div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        display: 'flex',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        justifyContent: 'space-evenly',
                        transitionDuration: '1s'
                    }}>
                        <img src={arrowL}
                            onClick={() => handleArrowClick('left')}
                            alt='arrowL' style={{
                                cursor: 'pointer'
                            }} />
                        <img src={arrowL}
                            onClick={handleArrowClick}
                            alt='arrowL' style={{
                                cursor: 'pointer',
                                rotate: '180deg'
                            }} />
                    </div>
                    <div style={{
                        display: 'flex',
                        transitionDuration: '0.5s',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '400px',
                        marginLeft: !burger ? '400px' : burger === 1 ? '0' : '-450px'
                    }}>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <img src={chees} alt='cheesburger' style={{
                                width: anim ? 180 : 360,
                                transitionDuration: '0.5s'
                            }} />
                            <div style={{
                                fontSize: burger ? '24px' : '32px',
                            }}>Original Cheeseburger</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <img src={bacon} alt='bacon' style={{
                                width: anim !== 1 ? 180 : 360,
                                transitionDuration: '0.5s'
                            }} />
                            <div style={{
                                fontSize: anim !== 1 ? '24px' : '32px',
                                transitionDuration: '0.5s'
                            }}>Bacon Truffle</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <img src={chicken} alt='chicken' style={{
                                width: anim !== 2 ? 180 : 360,
                                transitionDuration: '0.5s'
                            }} />
                            <div style={{
                                fontSize: anim !== 2 ? '24px' : '32px'
                            }}>Crispy Chicken Royale</div>
                        </div>
                    </div>

                </div>
                <div><button style={{
                    color: 'white',
                    fontSize: '40px',
                    textAlign: 'center',
                    padding: '10px 80px',
                    borderRadius: '50px',
                    background: '#AD1C23',
                    border: '0px',
                    cursor: 'pointer'
                }}>Menu</button></div>
            </div>
            <div style={{
                backgroundImage: `url(${delivery})`,
                backgroundSize: 'cover',
                height: '770px'
            }}>

            </div>
            <Footer />
        </div>
    )
}

export default HomePage