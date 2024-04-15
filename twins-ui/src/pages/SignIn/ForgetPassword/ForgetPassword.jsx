import { useState } from "react"
import Footer from "../../../components/Footer/Footer"
import bg from '../../../components/svg/bg_signin.svg'
import Header from "../../../components/Header/Header"
import PhoneNumber from "./PhoneNumber"
import Code from "./Code"
import ResetPassword from "./ResetPassword"

function ForgetPassword() {
    const [page, setPage] = useState('phone')

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header />
            <span style={{
                width: '100%',
                background: 'black',
                position: 'relative'
            }}>
                <img src={bg} alt='bg' style={{
                    width: '100%'
                }} />
                {
                    page === 'phone'
                        ?
                        <PhoneNumber setPage={setPage} />
                        : page === 'code' ?
                            <Code setPage={setPage} />
                            : <ResetPassword setPage={setPage} />
                }
            </span>
            <Footer />
        </div>
    )
}

export default ForgetPassword