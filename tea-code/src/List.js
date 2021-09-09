import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'

const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  img {
    border-radius: 50%;
    max-width: 50px;
    height: 20%;
  }
  .avatar {
    max-width: 50px;
    height: 50px;
    font-size: 20px;
    height: 47%;
    border-radius: 50%;
    background: grey;
    width: 23px;
  }
`
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  p:last-child {
    margin-left: 10px;
  }
`
const NameAndEmail = styled.div`
  display: flex;
  flex-direction: column;
`

const API =
  'https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json'

function List() {
  const [contact, setContact] = useState([])
  const [searchByName, setSearchByName] = useState('search')

  const getContact = async () => {
    const res = await fetch(API)
    const listOfContact = await res.json()
    setContact(listOfContact)
  }

  useEffect(() => {
    getContact()
    setSearchByName()
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
        <input type='text' name='search' />
      </form>
      {contact
        .sort((a, b) => a.first_name - b.last_name)
        .map((item) => (
          <ListWrapper key={item.id}>
            {item.avatar ? (
              <img src={item.avatar} alt='avatar' />
            ) : (
              <Avatar
                className='avatar'
                name={item.first_name + ' ' + item.last_name}
                maxInitials={2}
              />
            )}
            <NameAndEmail>
              <NameWrapper>
                <p>{item.first_name}</p>
                <p>{item.last_name}</p>
              </NameWrapper>
              <div>
                <p>{item.email}</p>
              </div>
            </NameAndEmail>
          </ListWrapper>
        ))}
    </>
  )
}

export default List
