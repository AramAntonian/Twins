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
            <div style={{
                color: 'white',
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                gap: '30px',
                height: '117vh',
                boxSizing: 'border-box',
                padding: '200px 50px',

            }}>
                <img src={bg_about} alt=' bg' style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: -1,
                    left: 0,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }} />
                <span style={{
                    fontSize: '64px'
                }}>About us<br /></span>
                <span style={{
                    fontSize: '22px',
                }}>Welcome to Twins, where we're passionate about <br />burgers! Our mission is simple: to serve up delicious,<br /> satisfying burgers that keep you coming back for<br /> more. With a focus on quality ingredients and <br />creative flavor combinations, we're here to make<br /> your burger cravings a reality. Come join us and<br /> experience the joy of great food in every bite.
                </span>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs