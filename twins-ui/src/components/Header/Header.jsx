import logo from '../svg/logo.svg'
import busket from '../svg/busket.svg'
import busket_yellow from '../svg/busket_yellow.svg'
import profile from '../svg/profile.svg'
import profile_yellow from '../svg/profile_yellow.svg'

function Header() {
    function handleRouting(route) {
        if(route !== '/profile') {
            window.location.href = route
        } else {
            const res = localStorage.getItem('USER')
            if(res){
                const data = JSON.parse(res)
                window.location.href = '/user/' + data.fullName
            } else {
                window.location.href = '/signin'
            }
        }
    }
    console.log(window.location.href);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 50px',
            alignItems: 'center',
            background: 'none',
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
            boxSizing: 'border-box',
            zIndex: 100

        }}>
            <img src={logo} alt='logo' onClick={() => handleRouting('/')} style={{
                cursor: 'pointer'
            }}/>
            <div style={{
                display: 'flex',
                gap: '20px'
            }}>
                <div
                    onClick={() => handleRouting('/about')}
                    style={{
                        fontSize: '32px',
                        color: window.location.href.includes('about') ? '#E0A24E' : 'white',
                        cursor: 'pointer'
                    }}>About us</div>
                <div
                    onClick={() => handleRouting('/menu')}
                    style={{
                        fontSize: '32px',
                        color: window.location.href.includes('menu') ? '#E0A24E' : 'white',
                        cursor: 'pointer'
                    }}>Menu</div>
                <div
                    onClick={() => handleRouting('/contact')}
                    style={{
                        color: window.location.href.includes('contact') ? '#E0A24E' : 'white',
                        fontSize: '32px',
                        cursor: 'pointer'
                    }}>Contact us</div>
                <div
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={() => handleRouting('/profile')}
                ><img src={window.location.href.includes('profile') ? profile_yellow : profile} alt='profile' /></div>
                <div
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={() => handleRouting('/busket')}
                ><img src={ window.location.href.includes('busket') ? busket_yellow : busket } alt='busket' /></div>
            </div>
            <div style={{
                background: 'black',
                opacity: '0.25',
                width: '100%',
                height: '100%',
                zIndex: -1,
                top: 0,
                left: 0,
                position: 'absolute'
            }}></div>
        </div>
    )
}

export default Header