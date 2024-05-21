import { useEffect, useState } from 'react';
import '../../../index.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import trash from '../../../components/svg/trash.svg'
import { Modal } from '@mui/material';



const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [usersToDelete, setUsersToDelete] = useState([])
    const [flag, setFlag] = useState(false)
    const [open, setOpen] = useState(false)
    const [deleteUser, setDeleteUser] = useState('')
    const [count, setCount] = useState(1)

    useEffect(() => {
        (async function () {
            const res = await fetch('http://localhost:3002/users', {
                headers: {
                    "Content-Type": 'application/json',
                },
                method: 'GET',
            })
            const data = await res.json()

            if (data.error) {
                alert(data.error)
            } else {
                setUsers(data.users)
            }
        })()
    }, [flag])

    function handleAddDelete(e, id) {
        if (e.target.checked) {
            setUsersToDelete(prev => {
                prev.push(id)
                return [...prev]
            })
        } else {
            setUsersToDelete(prev => prev.filter(el => el !== id))
        }
    }





    const handleDelete = (index) => {
        if (deleteUser !== '') {
            (async function () {
                const body = { id: deleteUser }
                const res = await fetch('http://localhost:3002/users', {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    method: 'DELETE',
                    body: JSON.stringify(body)
                })
                const data = await res.json()
                if (data.error) {
                    alert(data.error)
                } else {
                    setFlag(prev => !prev)
                    setDeleteUser('')
                    setOpen(false)
                }
            })()
        }
        for (let el of usersToDelete) {
            (async function () {
                const body = { id: el }
                const res = await fetch('http://localhost:3002/users', {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    method: 'DELETE',
                    body: JSON.stringify(body)
                })
                const data = await res.json()
                if (data.error) {
                    alert(data.error)
                } else {
                    setFlag(prev => !prev)
                    setUsersToDelete([])
                    setOpen(false)
                }
            })()
        }
    };

    useEffect(() => {
        console.log(usersToDelete);
    }, [usersToDelete])

    function addAll(e) {
        setUsersToDelete([])
        if (e.target.checked) {
            for (let el of users) {
                if (!el.fullName?.includes('ADMIN')) {
                    setUsersToDelete(prev => {
                        prev.push(el.id)
                        return [...prev]
                    })
                }

            }
        }
    }

    return (
        <>
            <Header />
            <div style={{
                background: 'black',
                display: 'flex',
                justifyContent: 'center',
                padding: '130px 50px'
            }}>
                <div className="user-table" style={{
                    minHeight: '300px',
                    minWidth: '500px',
                    position: 'relative',
                    boxShadow: '1px 5px 72px -17px rgba(255,0,0,1)',

                }}>
                    <table >
                        <thead>
                            <tr>
                                <th><input type='checkbox' onClick={(e) => addAll(e)} />Username</th>
                                <th>Role</th>
                                <th>E-mail</th>
                                <th>Phone number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{!user.fullName?.includes('ADMIN') ? <input type='checkbox' checked={usersToDelete.includes(user.id)} onClick={(e) => { handleAddDelete(e, user.id) }} /> : null} {user.fullName}</td>
                                    <td>{user.fullName?.includes('ADMIN') ? 'Administrator' : 'User'}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        {
                                            !user.fullName?.includes('ADMIN') ?
                                                <button onClick={() => {
                                                    setOpen(true)
                                                    setDeleteUser(user.id)
                                                }} className="delete-button">✖</button>
                                                : null
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {usersToDelete.length ? <img src={trash}
                        onClick={handleDelete}
                        alt='trash' style={{
                            position: 'absolute',
                            bottom: '30px',
                            right: '30px',
                            cursor: 'pointer'
                        }} /> : null}
                    <div style={{
                        background: 'white',
                        opacity: '0.9',
                        zIndex: 12,
                        borderRadius: '20px',
                        width: "100%",
                        top: '0px',
                        left: '0px',
                        height: "100%",
                        minHeight: '300px',
                        minWidth: '500px',
                        position: 'absolute',
                        display: open ? 'flex' : 'none',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                        <div style={{
                            zIndex: 13,
                            gap: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div>Are You sure you want to delete {count} users?</div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '30px'
                            }}>
                                <div
                                    onClick={() => { setOpen(false) }}
                                    style={{
                                        width: '100px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        background: "#E0A24E",
                                        borderRadius: '30px',
                                        zIndex: 13
                                    }}>NO</div>
                                <div
                                    onClick={handleDelete}
                                    style={{
                                        width: '100px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        color: 'white',
                                        background: "#AD1C23",
                                        borderRadius: '30px',
                                        zIndex: 13
                                    }}>YES</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UsersPage
