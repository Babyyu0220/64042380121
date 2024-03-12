import React, {useState, useEffect} from 'react'

export default function App() {
  const [user, setUsers] = useState([])
  useEffect(() => {
    fetch(import.meta.env.VITE_API + '/user')
    .then(res => res.json())
    .then(result => {
      setUsers(result)
      console.log(result)
    })
  }, [])
  return(
    <div>
      <ul>
        {user.map(user => (
          <li>{user.ID} {user.name} {user.subjectID}</li>
        ))}
      </ul>
    </div>
  )
}