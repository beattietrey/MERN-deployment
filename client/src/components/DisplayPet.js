import { navigate } from '@reach/router'
import axios from 'axios'
import React, {useState, useEffect} from 'react'

const DisplayPet = props => {
    const [pet, setPet] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [clicked, setClicked] = useState(false)
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${props.id}`)
            .then(res => {
                console.log(res)
                setPet(res.data.results)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    },[]) 

    const adoptPet = () => {
        axios.delete(`http://localhost:8000/api/pet/${pet._id}`)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    const likePet = () => {
        setClicked(true)
        setPet({...pet, [pet.likes]:pet.likes++})
        axios.put(`http://localhost:8000/api/pets/${pet._id}`, pet)
    } 
    
    return (
        <div>
            <button onClick={() => navigate("/")}>Home</button>
            { loaded ?
                <div>
                    <h3>Details about {pet.name} </h3>
                    <div>
                        <p>Pet Type: {pet.type}</p>
                        <p>Description: {pet.description}</p>
                        <p>Skills:</p>
                        <ul>
                            <li>{pet.skill_1}</li>
                            <li>{pet.skill_2}</li>
                            <li>{pet.skill_3}</li>
                        </ul>
                        { clicked ? 
                        <p>Likes: {pet.likes+1}</p>
                        :<p>Likes: {pet.likes}</p>
                        }
                        <button style={{color:'red'}} onClick={() => window.confirm(`${pet.name} is being adopted?!`)? adoptPet():""}>Adopt {pet.name}</button>
                        { clicked ?
                            <button disabled >Like {pet.name}</button>
                            :<button onClick={() => likePet()}>Like {pet.name}</button>
                        }   
                        <button onClick={() => navigate(`/pets/${pet._id}/edit`)}>Edit</button>
                    </div>
                </div>
            : ""
            }
        </div>
    )
}

export default DisplayPet
