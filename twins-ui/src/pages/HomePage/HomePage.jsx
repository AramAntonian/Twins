import Header from "../../components/Header/Header"
import bg from '../../components/svg/burger_background.svg'
import bg_paper from '../../components/svg/bg_paper.svg'
import chees from '../../components/svg/cheesburger.svg'
import bacon from '../../components/svg/bacon.svg'
import chicken from '../../components/svg/chiken.svg'
import arrowL from '../../components/svg/arrowL.svg'
import delivery from '../../components/svg/delivery.svg'
import { useState } from "react"
import Footer from "../../components/Footer/Footer"

function HomePage() {
    const [burger, setBurger] = useState(0)

    function handleArrowClick(direction) {
        if (direction === 'left') {
            setBurger(prev => prev - 1)
        } else {
            setBurger(prev => prev + 1)
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
                        fontSize: '98px'
                    }}>Our<br /> Story<br /></span>
                    <span style={{
                        fontSize: '24px'
                    }}>Nestled in a bustling corner, our burger shop isn't<br /> just about food: it's a haven of sizzling patties,<br /> creative toppings, and warm smiles. Beyond the<br /> delicious aroma, it's the sense of community that<br /> keeps our customers coming back for more</span>
                </div>
            </div>
            <div style={{
                backgroundImage: `url(${bg_paper})`,
                width: '100%',
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '100px',
                padding: '200px 0'
            }}>
                <div style={{
                    color: '#E8B754',
                    fontSize: '48px',
                    fontWeight: 'bolder'
                }}>Best sellers</div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        position: 'absolute',
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        transitionDuration: '1s'
                    }}>
                        <img src={arrowL}
                            onClick={() => handleArrowClick('left')}
                            alt='arrowL' style={{
                                visibility: burger ? 'visible' : 'hidden',
                                cursor: 'pointer'
                            }} />
                        <img src={arrowL}
                            onClick={handleArrowClick}
                            alt='arrowL' style={{
                                visibility: burger !== 2 ? 'visible' : 'hidden',
                                cursor: 'pointer',
                                rotate: '180deg'
                            }} />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        order: !burger ? 1 : 0
                    }}>
                        <img src={chees} alt='cheesburger' width={burger ? 360 : 480} />
                        <div style={{
                            fontSize: burger ? '30px' : '48px',
                        }}>Original Cheeseburger</div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        order: burger === 1 ? 1 : !burger ? 0 : 2
                    }}>
                        <img src={bacon} alt='bacon' width={burger !== 1 ? 360 : 480} />
                        <div style={{
                            fontSize: burger !== 1 ? '30px' : '48px'
                        }}>Bacon Truffle</div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        order: burger === 2 ? 1 : 2
                    }}>
                        <img src={chicken} alt='chicken' width={burger !== 2 ? 360 : 480} />
                        <div style={{
                            fontSize: burger !== 2 ? '30px' : '48px'
                        }}>Crispy Chicken Royale</div>
                    </div>
                </div>
                <div><button style={{
                    color: 'white',
                    fontSize: '40px',
                    textAlign: 'center',
                    padding: '40px 120px',
                    borderRadius: '50px',
                    background: '#AD1C23',
                    border: '0px',
                    cursor: 'pointer'
                }}>Menu</button></div>
            </div>
            <div style={{
                backgroundImage: `url(${delivery})`,
                padding: '150px',
                backgroundSize: 'cover',
                height: '500px'
            }}>
                <div style={{
                    color: 'white',
                    fontSize: '64px'
                }}>Delivery <br />11:00-01:00</div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage