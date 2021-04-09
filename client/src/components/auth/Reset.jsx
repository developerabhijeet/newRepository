import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { resetPasswordAction } from '../../redux/actions/users/userActions';
const Reset = () => {
  const [email, setEmail] = useState("")
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPasswordAction(email));
    alert("Great! Please check your Inbox!")
  }
  return (
    <Container className="login">
      <h2>Reset Password:</h2>
      <Form className="form" onSubmit={submitHandler}>
        <Col>
          <FormGroup>
            <Label>Email*</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="myemail@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Button>Send Email</Button>
      </Form>
    </Container>
  )
}

export default Reset;
