import { useLayoutEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ProfileCard from "../../components/Profile/ProfileCard"
import bg from '../../components/svg/bg_signin.svg'
import { useNavigate } from 'react-router-dom'


function ProfilePage() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useLayoutEffect(() => {
        (async function () {
            const res = localStorage.getItem('USER')
            const data = await JSON.parse(res)
            if (data) {
                setUser(data)
                console.log(data)
            } else {
                navigate('/signin')
            }
        })()
    }, [])

    return (

        <>
            <Header />
            <div style={{
                background: 'black'
            }}>
                <img src={bg} alt='bg' style={{
                    width: '100%'
                }} />
                <ProfileCard fullName={user.fullName} phone={user.phone} email={user.email} cards={user.cards}/>
            </div>
            <Footer />
        </>
    )
}

export default ProfilePage