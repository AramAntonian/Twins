import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import burger from '../svg/cheesburger.svg'

function Busket() {

    return (
        <>
            <Header />
            <div style={{
                background: 'black',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '50px 0'
            }}>
                <div style={{
                    width: '80%',
                    height: '600px',
                    background: 'white',
                    borderRadius: 'black',
                    padding: '20px 40px',
                    boxSizing: 'border-box',
                    boxShadow: '1px 5px 72px -17px rgba(255,0,0,1)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div>Product</div>
                        <div style={{
                        display: 'flex',
                        gap: '20px'
                    }}>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Total Price</div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Busket