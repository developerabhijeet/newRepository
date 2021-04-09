import React, { Component, setState, useState, useEffect } from 'react'
import { MDBCol, MDBInput } from "mdbreact";
import {
  Container, Form,
  Button, Input, Alert
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { postReducer } from '../../redux/reducers/userAuthReducer';
import { postAction } from '../../redux/actions/users/userActions';
const Post = () => {
  const [post, setPost] = useState('');
  const [domain, setDomain] = useState('');
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [successPost, setSuccessPost] = useState(false)
  const [nameError, setNameError] = useState(false);
  const onDismiss = () => {
    setVisible(false);
    setNameError(false);
  }
  const onSuccessDismiss = () => {
    setSuccessPost(false);
    window.location = '/'
  }
  const state = useSelector(state => {
    return state.userLogin;
  });
  const { loading, userInfo, error } = state;
  const username = state.userInfo.user.name;
  const name = username;
  console.log(name)
  const onSubmit = e => {
    e.preventDefault();
    if (name == '' || post == '' || domain == '') {
      setVisible(true);
      setNameError(false);
      setSuccessPost(false);
    } else {
      dispatch(postAction(name, post, domain))
      setVisible(false);
      setNameError(false);
      setSuccessPost(true);
    }
  }
  const popup = () => {
    setNameError(true);
    setVisible(false);
    setSuccessPost(false);
  }
  return (
    <div>
      <Container className="signup">
        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
          Sorry,You cannot keep the fields Empty!
        </Alert>
        <Alert color="success" isOpen={successPost} toggle={onSuccessDismiss}>
          Your Problem Posted Successfully, We hope you will get your solution very soon, (close this to view your posted problem)!
        </Alert>
        <Alert color="danger" isOpen={nameError} toggle={onDismiss}>
          OOPS! You are not allowed to modify this Field
        </Alert>
        <h2>Post Your Problems</h2>
        <Form className="form" onSubmit={onSubmit}>
          <MDBCol md="6" className="post-text-center">
            <MDBInput type="textarea"
              label="Enter Your Errors above"
              rows="10"
              onChange={e => setPost(e.target.value)}
              value={post} />
          </MDBCol>
          <Input className="w-50"
            type="text"
            name="name"
            id="name"
            placeholder="You are not allowed to change name"
            onChange={popup}
            value={state.userInfo.user.name} />
          <Input className="w-50"
            type="text"
            name="domain"
            id="domain"
            placeholder="Enter The Problem Domain"
            onChange={e => setDomain(e.target.value)}
            value={domain} />
          <br />
          <Button color="primary" className="btn-submit primary">Post</Button>
        </Form>
      </Container>
    </div>
  )
}
export default Post;
