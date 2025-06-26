import { useState, useEffect } from "react"
import axios from "axios"

const MyApplications = () => {
    const [applications, setApplications] = useState([])

    useEffect(() => {
        const token = localStorage.get('token')
        axios.get('http://localhost:3000/api/applications/my', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) .then(res => setApplications(res.data))
}, [])

return (
    <ul>
        {applications.map(app => (
            <li key={app._id}>{app.projectTitle} - 상태 : {app.status} </li>
        ))}
    </ul>
)
}

export default MyApplications