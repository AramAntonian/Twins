import { useParams } from 'react-router'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import AddBurger from './AddBurger'
import bg_paper from '../../../components/svg/bg_paper.svg'

function AddProdcutPage() {
    const { product } = useParams()

    return (
        <div style={{
            background: 'black'
        }}>
            {/* <img src={bg_paper} alt='bg' style={{
                position: 'absolute',
                top: 100,
                left: 0,
                width: '100%',
            }} /> */}
            <Header />
            <div style={{
                background: 'black',
                padding: '100px 0'
            }}>
                <div style={{
                    background: 'black',
                    backgroundImage: `url(${bg_paper})`
                }}>
                    <AddBurger product={product} />
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default AddProdcutPage