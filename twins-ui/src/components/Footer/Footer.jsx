/* eslint-disable jsx-a11y/iframe-has-title */
import info from '../svg/footerInfo.svg'

function Footer() {
    return (
        <>
            <div style={{
                background: '#101012',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <img src={info} alt='info' width={'100%'} />
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1290.5535548746516!2d44.512293671674286!3d40.18262714132255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abdadb8a18697%3A0x517baa0680dfee51!2sYANG%20Izakaya!5e0!3m2!1sru!2sam!4v1716060042068!5m2!1sru!2sam" width="600" style={{ border: 0, width: '100%' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
        </>

    )
}

export default Footer