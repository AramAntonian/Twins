import IngredientAddCard from "./IngredientAddCard"
import { useEffect, useState } from "react"
import IngredientCard from "./IngredientCard"

function AddIngredients({ setPage, setIngredients }) {
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
                padding: '200px 150px',
                display: 'flex',
                alignItems: 'center',
                gap: '50px',
                position: 'relative',
                flexWrap: 'wrap'
            }}>
                {
                    list.map((el, idx) => (
                        <IngredientCard el={el} key={idx} setFlag={setFlag} setIngredients={setIngredients} />
                    ))
                }
                <IngredientAddCard setFlag={setFlag} />
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
                        position: 'absolute',
                        top: '120px',
                        cursor: 'pointer',
                        fontSize: '24px',
                        right: '10px'
                    }}>Add ingredients</div>
            </div>
        </>
    )
}

export default AddIngredients