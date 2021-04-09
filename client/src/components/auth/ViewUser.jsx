import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
const ViewUser = () => {
  const ids = useParams()
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/app/user/${ids.id}`)
      .then(res => res.json()
        .then(res => {
          setUser(res)
        }).catch(e => {
          console.log(e)
        }))
  }
  );
  return (
    <div>
      <Table >
        <center>
          <tbody>
            <th>Email: </th>
            <tr>
              {user.email}
            </tr>
            <th>Name: </th>
            <tr>
              {user.name}
            </tr>
            <th>Technology: </th>
            <tr>
              {user.tech}
            </tr>
            <th>Bio:</th>
            <tr>
              {user.bio}
            </tr>
            <th>JobTitle: </th>
            <tr>
              {user.jobtitle}
            </tr>
          </tbody>
        </center>
      </Table>
    </div>
  )
}

export default ViewUser;
