import React, { useState } from 'react';
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'


const LocationForm = ({ user }) => {
    const user_id = user.id
    const [formValues, setFormValues] = useState({
        latitude: '',
        longitude: '',
        level: ''
    })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const CreateCache = async () => {
        // let url = process.env.NODE_ENV === 'local' ? `http://localhost:3001/api//location/create_cache/${user_id}` : `https://token-huntr-server.herokuapp.com/api//location/create_cache/${user_id}`
        let url = process.env.NODE_ENV === `http://localhost:3001/api/location/create_cache/${user_id}`
        await axios({
            url,
            method: 'post',
            data: formValues
        })
    }

    const handleSubmit = async (e) => {
        console.log('button clicked')
        e.preventDefault()
        CreateCache()
        setFormValues({
            latitude: '',
            longitude: '',
            level: ''
        })
        axios.post(`http://localhost:3001/api/location/create_cache/${user_id}`, formValues)
    }

    return (
        <div className='local-form'>
            <h2>Add a New Geocache</h2>
            <h4>Fill out form below!</h4>
            <form onSubmit={handleSubmit}>
                <ul>
                    <ul>
                        <label>Latitude:</label>
                        <input type='text'
                            placeholder={'Latitude'}
                            name='latitude'
                            value={formValues.latitude}
                            onChange={handleChange}
                            required
                        />
                    </ul>
                    <ul>
                        <label>Longitude:</label>
                        <input type='text'
                            placeholder={'Longitude'}
                            name='longitude'
                            value={formValues.longitude}
                            onChange={handleChange}
                        />
                    </ul>
                    <ul>
                        <label>Level:</label>
                        <select
                            name='level'
                            id='selectLvl'
                            value={formValues.level}
                            onChange={handleChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="moderate">Moderate</option>
                            <option value="hard">Hard</option>
                        </select>
                    </ul>
                    <button
                        disabled={
                            !formValues.latitude ||
                            !formValues.longitude
                        }
                    >
                        Add Cache
                    </button>
                </ul>
            </form>
        </div>
    )
}

export default LocationForm