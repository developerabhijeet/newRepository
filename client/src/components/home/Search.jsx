import React, { useState } from 'react'
import {
  Col, Form, Input, Alert, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './post.css';
const Search = (props) => {
  const [search, setSearch] = useState('')
  const [postDetails, setPostDetails] = useState([])
  const [visible, setVisible] = useState(false);
  const onDismiss = () => {
    setVisible(false);
    setPostDetails([])
    setSearch('')
    
  }
  const fetchPost = (postName) => {
    setSearch(postName)
    setVisible(true)
    fetch('http://localhost:4000/app/search', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      boyd: JSON.stringify({
        postname: postName
      })
    }).then(res => res.json())
      .then(result => {
        setPostDetails(result.post)
      })
  }
  return (
    <div>
      <Form>
        <Col>
          <Input type="text" className="w-25 searchfield" name="search" placeholder="search problem here"
            value={search} onChange={e => fetchPost(e.target.value)} />
        </Col>
        <Alert color="info" isOpen={visible} toggle={onDismiss}>
          Results for Your Search Result are shown below!
        </Alert>
      </Form>
      <ul>
        {postDetails.map(post => {
          return <Link to={`/post/${post._id}`}><Button color="danger">{post.post}</Button><br/><br/></Link>
        })}
      </ul>
    </div>
  )
}

export default Search;
