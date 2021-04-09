import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
const Profile = () => {
  const ids = useParams()
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/app/profile/${ids.id}`)
      .then(res => res.json()
        .then(res => {
          setUser(res)
        }).catch(e => {
          console.log(e)
        }))
  }
  );
  return (
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
      <br />
      <center>
        <Link className="link" to='/editprofile'>Edit Profile</Link>
      </center>
    </Table>
  )
}

export default Profile;
