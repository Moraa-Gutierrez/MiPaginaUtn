import { useEffect, useState } from "react"
import { ROUTES } from "../../config" 
import { api } from "../../utils/api"
import { userAdapter } from "../../utils/adapters"

function useGetUsers() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const getUsers = async () => {
        try {
            setLoading(true)
            setError(null)

        
            const data = await api("GET", ROUTES.users, { 
                porDefecto: "Error fetching users list" 
            })

            setUsers(data.map((usuario) => userAdapter(usuario)))
        } catch (err) {
            console.error("Error fetching users:", err)
            setError(err)
            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return { users, error, loading, refetch: getUsers }
}

export default useGetUsers