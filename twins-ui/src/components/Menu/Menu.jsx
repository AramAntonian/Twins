import { useState } from "react";
import Header from "../Header/Header";
import bg from '../svg/paper_black.svg'
import Burgers from "./Burgers";
import Footer from "../Footer/Footer";
import Fries from "./Fries";
import Sauces from "./Sauces";
import Drinks from "./Drinks";


function Menu() {
    const [choosen, setChoosen] = useState('burgers')

    return (
        <div>
            <Header />
            <div style={{
                height: '100px',
                background: 'black',
                width: '100%',
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
                                    <Burgers name={'Original Cheeseburger'} price={'23000AMD'} />
                                    <Burgers name={'Original Cheeseburger'} price={'23000AMD'} />
                                    <Burgers name={'Creamy Smash'} price={'13000AMD'} />
                                    <Burgers name={'Royal Cheese'} price={'23000AMD'} />
                                    <Burgers name={'Original Cheeseburger'} price={'23000AMD'} />
                                </div>
                                <div style={{
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
                                        <Burgers name={'Original Cheeseburger'} price={'23000AMD'} />
                                        <Burgers name={'Original Cheeseburger'} price={'23000AMD'} />
                                        <Burgers name={'Creamy Smash'} price={'13000AMD'} />
                                        <Burgers name={'Royal Cheese'} price={'23000AMD'} />
                                        <Burgers name={'Original Cheeseburger'} price={'23000AMD'} />
                                    </div>
                                </div>
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
                                        <Fries name={'Original Cheeseburger'} price={'23000AMD'} />
                                        <Fries name={'Original Cheeseburger'} price={'23000AMD'} />
                                        <Fries name={'Creamy Smash'} price={'13000AMD'} />
                                        <Fries name={'Royal Cheese'} price={'23000AMD'} />
                                        <Fries name={'Original Cheeseburger'} price={'23000AMD'} />
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
                                            <Sauces name={'sauces'} price={'23000AMD'} />
                                            <Sauces name={'sauces'} price={'23000AMD'} />
                                            <Sauces name={'sauces'} price={'13000AMD'} />
                                            <Sauces name={'sauces'} price={'23000AMD'} />
                                            <Sauces name={'sauces'} price={'23000AMD'} />
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
                                            <Drinks name={'drinks'} price={'23000AMD'} />
                                            <Drinks name={'drinks'} price={'23000AMD'} />
                                            <Drinks name={'drinks'} price={'13000AMD'} />
                                            <Drinks name={'drinks'} price={'23000AMD'} />
                                            <Drinks name={'drinks'} price={'23000AMD'} />
                                        </div>
                                    </div>
                    }
                </div>
            </div>

            <Footer />
        </div >
    )
}

export default Menu