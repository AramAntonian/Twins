import { useParams } from 'react-router'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import AddBurger from './AddBurger'
import paper from '../../../components/svg/h_f_paper.png'

function AddProdcutPage() {
    const { product } = useParams()

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            background: 'white'
        }}>
            <div style={{
                background: 'black',
                height: '50px'
            }}></div>
            <Header />

            <img src={paper} alt='paper' style={{
                width: '100%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }} />


            <AddBurger product={product} />
            <img src={paper} alt='paper' style={{
                width: '100%',
                rotate: '180deg',
                height: '100px'
            }} />

            <Footer />

        </div>
    )
}

export default AddProdcutPage