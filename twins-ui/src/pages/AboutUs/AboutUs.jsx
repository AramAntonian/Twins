import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import bg_about from '../../components/svg/bg_about.svg'

function AboutUs() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Header />
            <img src={bg_about} alt='about' style={{
                width: '100%',
            }} />
            <Footer />
        </div>
    )
}

export default AboutUs