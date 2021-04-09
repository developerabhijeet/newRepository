import React, { useState } from 'react'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newPasswordAction } from '../../redux/actions/users/userActions';
const NewPassword = ({ history }) => {
  const { token } = useParams();
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(newPasswordAction(token, password))
    alert("Hurray! Your password reset successfully")
    history.push('/login')
  }
  return (
    <Container className="login">
      <h2>Change Password:</h2>
      <Form className="form" onSubmit={submitHandler}>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Password*</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Enter Your New Password Here"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Button>Change Password</Button>
      </Form>
    </Container>
  )
}
export default NewPassword;
