import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link, navigate } from '@reach/router'

const ShelterList = () => {
    const [pets, setPets] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets`)
            .then(res => {
                setPets(res.data.results)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    },[])

    return (
        <div>
            <p><Link to="/pets/new">Add a Pet to the Shelter</Link></p>
            { loaded ?
            <table style= {{margin: 'auto'}} >
                <thead>
                    <th>Pet Name</th>
                    <th>Pet Type</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                        pets.map((pet, key) => {
                            return <tr key={key}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td><button onClick={() => navigate(`/pets/${pet._id}`)}>Details</button> <button onClick={() => navigate(`/pets/${pet._id}/edit`)}>Edit</button> </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            : ""
            }
        </div>
    )
}

export default ShelterList
