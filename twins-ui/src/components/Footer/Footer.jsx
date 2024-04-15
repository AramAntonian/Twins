import info from '../svg/footerInfo.svg'
import Map from './Map'

function Footer() {
    return (
        <>
            <div style={{
                background: '#101012',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <img src={info} alt='info'  width={'100%'}/>
            </div>
            <div>
              {/* <Map /> */}
            </div>
        </>

    )
}

export default Footer