/* eslint-disable jsx-a11y/iframe-has-title */
import info from '../svg/footerInfo.svg'
import paper from '../svg/h_f_paper.png'

function Footer() {
    return (
        <>
            <div style={{
                width: '100%',
                display: 'inline',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '0',
                boxSizing: "border-box"
            }}>
              
                <img src={info} alt='info' width={'100%'} style={{
                    marginTop: '-30px',
                    zIndex: 4
                }} />
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d762.0457542854365!2d44.5127908!3d40.1827403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd225b6414cb%3A0xfc771d77454afe78!2sTwins.evn%20%7C%20Burgers!5e0!3m2!1sru!2sam!4v1716550441703!5m2!1sru!2sam" width="600" style={{ border: 0, width: '100%' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
        </>

    )
}

export default Footer