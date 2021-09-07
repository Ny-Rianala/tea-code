import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  img {
    border-radius: 50%;
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

  const getContact = async () => {
    const res = await fetch(API)
    const listOfContact = await res.json()
    setContact(listOfContact)
  }

  useEffect(() => {
    getContact()
  }, [])

  return (
    <>
      {contact.map((item) => (
        <ListWrapper key={item.id}>
          <img src={item.avatar} alt='avatar' />
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
