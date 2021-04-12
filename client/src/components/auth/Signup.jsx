import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { signupuserAction } from '../../redux/actions/users/userActions';
const Signup = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [jobtitle, setJobtitle] = useState('');
  const [tech, setTech] = useState('');
  const dispatch = useDispatch();

  //getting user login from store
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  //Redirecting if user is login/authenticated
  useEffect(() => {
    if (userInfo) {
      history.push('/login');
    }
  }, [userInfo])
  const submitHandler = e => {
    e.preventDefault();
    //dispatching action
    dispatch(signupuserAction(name, email, password, bio, jobtitle, tech));
  }
  return (
    <Container className="signup">
      <h2>Sign Up</h2>
      <Form className="form" onSubmit={submitHandler}>
        <Col>
          <FormGroup>
            <Label for="name">Name*</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Full Name"
              onChange={e => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="email">Email*</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="myemail@email.com"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="password">Password*</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Bio*</Label>
            <Input
              type="text"
              name="bio"
              id="bio"
              placeholder="Enter a breif Introduction about Yourself"
              onChange={e => setBio(e.target.value)}
              value={bio}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Job Title*</Label>
            <Input
              type="text"
              name="jobtitle"
              id="jobtitle"
              placeholder="Sotware Developer"
              onChange={e => setJobtitle(e.target.value)}
              value={jobtitle}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Technology*</Label>
            <Input
              type="text"
              name="tech"
              id="tech"
              placeholder="ReactJS, NodeJS, Python "
              onChange={e => setTech(e.target.value)}
              value={tech}
            />
          </FormGroup>
        </Col>
        <Button color="primary" className="btn-submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default Signup;