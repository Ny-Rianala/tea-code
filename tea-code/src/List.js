import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'

const API =
  'https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json'

function List() {
  const [contact, setContact] = useState([])
  const [searchByName, setSearchByName] = useState('')

  const getContact = async () => {
    const res = await fetch(API)
    const listOfContact = await res.json()
    setContact(listOfContact)
  }

  useEffect(() => {
    getContact()
  }, [])

  const filteredByContact = contact.filter(
    (contact) =>
      contact.first_name.includes(searchByName) ||
      contact.last_name.includes(searchByName)
  )

  console.log(filteredByContact)

  return (
    <>
      <form>
        <h1>Contacts</h1>
        <input
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
          name='search'
        />
      </form>
      {filteredByContact
        .sort((a, b) => a.last_name.localeCompare(b.last_name))
        .map((item) => (
          <div className='listWrapper' key={item.id}>
            {item.avatar ? (
              <img src={item.avatar} alt='avatar' />
            ) : (
              <Avatar
                className='avatar'
                name={item.first_name + ' ' + item.last_name}
                maxInitials={2}
              />
            )}
            <div className='nameAndEmail'>
              <div className='nameWrapper'>
                <p>{item.first_name}</p>
                <p>{item.last_name}</p>
              </div>
              <div>
                <p>{item.email}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default List
