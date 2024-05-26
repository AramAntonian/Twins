import IngredientAddCard from "./IngredientAddCard"
import { useEffect, useState } from "react"
import IngredientCard from "./IngredientCard"

function AddIngredients({ setPage, setIngredients, addBoo }) {
    const [flag, setFlag] = useState(false)
    const [list, setList] = useState([])

    useEffect(() => {
        (async function () {
            const res = await fetch('http://localhost:3002/ingredients', {
                headers: {
                    "Content-Type": 'application/json',
                },
                method: 'GET',
            })
            const data = await res.json()

            if (data.error) {
                alert(data.error)
            } else {
                setList(data.ingredients)
            }
        })()
    }, [flag])



    return (
        <>
            <div style={{
                padding: '10px 0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                gap: '50px',
                position: addBoo ? 'unset' : 'relative',
                flexWrap: 'wrap'
            }}>
                <div
                    onClick={() => {
                        setIngredients(prev => ({ ...prev }))
                        setPage('burger')
                    }}
                    style={{
                        width: '200px',
                        padding: '10px',
                        textAlign: 'center',
                        color: 'white',
                        background: '#AD1C23',
                        borderRadius: '30px',
                        position: addBoo ? 'absolute' :  'sticky',
                        top: addBoo ? '10px' : '20px',
                        cursor: 'pointer',
                        fontSize: '24px',
                        left: addBoo ? '10%' : '99%'
                    }}>Add ingredients</div>
                {
                    list.map((el, idx) => (
                        <IngredientCard el={el} key={idx} setFlag={setFlag} setIngredients={setIngredients} hoverEffect = {!addBoo} />
                    ))
                }
                <IngredientAddCard setFlag={setFlag} />

            </div>
        </>
    )
}

export default AddIngredients