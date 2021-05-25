import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'

const Form = props => {
    const [ initialPet, setInitialPet ] = useState({
        name: "",
        type: "",
        description: "",
        skill_1: "",
        skill_2: "",
        skill_3: "",
        likes: 0
    })
    const[newPet, setNewPet] = useState(initialPet)
    const [nameErr, setNameErr] = useState("")
    const [typeErr, setTypeErr] = useState("")
    const [descErr, setDescErr] = useState("")

    useEffect(() => {
        if(props.id){
            axios.get(`http://localhost:8000/api/pets/${props.id}`)
                .then(res => setNewPet(res.data.results))
                .catch(err => console.log(err))
        }
    },[])

    const changeHandler = e => {
        setNewPet({...newPet, [e.target.name]:e.target.value})
        if(e.target.name === "name" && e.target.value.length < 3){
            setNameErr("Name must be at least 3 characters")
        } else if (e.target.name === "name" && e.target.value.length >= 3) {
            setNameErr("")
        }
        if(e.target.name === "type" && e.target.value.length < 3){
            setTypeErr("Type must be at least 3 characters")
        } else if (e.target.name === "type" && e.target.value.length >= 3) {
            setTypeErr("")
        }
        if(e.target.name === "description" && e.target.value.length < 3){
            setDescErr("Description must be at least 3 characters")
        } else if (e.target.name === "description" && e.target.value.length >= 3) {
            setDescErr("")
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        if(newPet.name.length > 2 &&newPet.type.length >2 && newPet.description.length > 2){
        if(props.id) {
            axios.put(`http://localhost:8000/api/pets/${props.id}`, newPet)
                .then(res => navigate(`/pets/${newPet._id}`))
                .catch(err => console.log(err))
        } else{
        axios.post('http://localhost:8000/api/pets', newPet)
            .then(res => {
                navigate(`/pets/${res.data.results._id}`)
            })
            .catch(err => console.log(err))
        } 
        } else {
            setNameErr("Name must be at least 3 characters")
            setTypeErr("Type must be at least 3 characters")
            setDescErr("Description must be at least 3 characters")
        }
    }

    return (
        <div>
            <form onSubmit={ submitHandler }>
                <div>
                    <label htmlFor="name">Pet Name: </label>
                    <input type="text" onChange={e=> changeHandler(e)} name="name" value={newPet.name} />
                    {nameErr.length > 0 ? <p style={{color:'red'}}>{nameErr}</p>:""}
                </div>
                <div>
                    <label htmlFor="type">Pet Type: </label>
                    <input type="text" onChange={e=> changeHandler(e)} name="type" value={newPet.type} />
                    {typeErr.length > 0 ? <p style={{color:'red'}}>{typeErr}</p>:""}
                </div>
                <div>
                    <label htmlFor="description">Pet Description: </label>
                    <input type="text" onChange={e=> changeHandler(e)} name="description" value={newPet.description} />
                    {descErr.length > 0 ? <p style={{color:'red'}}>{descErr}</p>:""}
                </div>
                <div>
                    <label htmlFor="skill_1">Pet Skill 1: </label>
                    <input type="text" onChange={e=> changeHandler(e)} name="skill_1" value={newPet.skill_1} />
                </div>
                <div>
                    <label htmlFor="skill_2">Pet Skill 2: </label>
                    <input type="text" onChange={e=> changeHandler(e)} name="skill_2" value={newPet.skill_2} />
                </div>
                <div>
                    <label htmlFor="skill_3">Pet Skill 3: </label>
                    <input type="text" onChange={e=> changeHandler(e)} name="skill_3" value={newPet.skill_3} />
                </div>
                <input type="submit" value="Submit" />
            </form>
                <button onClick={()=> navigate("/")}>Cancel</button>
        </div>
    )
}

export default Form
