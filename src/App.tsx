
import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { UsersList } from './components/UsersList';
import { SortBy, type User } from './types.d';


const API = 'https://randomuser.me/api?results=100'

function App() {

  const [users, setUsers] = useState<User[]>([])

  const [showColors, setShowColors] = useState(false)

  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)

  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toogleColors = () => {
    setShowColors(!showColors)
  }

  const toogleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch(API)
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.log(err)
      })
  }, [])



  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country.toLocaleLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {

    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='app'>
      <h1>Mateo Matias resolución Prueba Técnica</h1>
      <header style={{ marginBottom: '20px' }}>
        <div >
          <button onClick={toogleColors} style={{ margin: '5px' }}>Colorear filas</button>
          <button onClick={toogleSortByCountry} style={{ margin: '5px' }}>
            {sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais'} </button>
          <button onClick={handleReset} style={{ margin: '5px' }}>Resetear Estado</button>
          <input onChange={(e) => {
            setFilterCountry(e.target.value)
          }} placeholder='Filtra por pais' style={{ margin: '5px' }} />
        </div>
      </header>
      <main>
        <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
