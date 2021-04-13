import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Col, Label,
  Button, Form, Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './post.css';
import { useSelector, useDispatch } from 'react-redux';
import { commentAction, likePostAction, unlikePostAction } from '../../redux/actions/users/userActions';
const View = (props) => {

  const ids = useParams()
  const [posts, setPosts] = useState([]);
  const state = useSelector(state => {
    return state.userLogin;
  });
  const { userInfo } = state
  const [visible, setVisible] = useState(false)
  const [dislike, setDislike] = useState(false)
  const [comment, setComment] = useState(false)
  const [blankcomment, setBlankcomment] = useState(false)
  const onDismiss = () => {
    setVisible(false);
    setDislike(false);
    setComment(false);
    setBlankcomment(false);
  }
  useEffect(() => {
    fetch(`http://localhost:4000/app/post/${ids.id}`)
      .then(res => res.json()
        .then(res => {
          setPosts(res)
        }).catch(e => {
          console.log(e)
        }))
  }
  );
  const dispatch = useDispatch();
  //likePost API call
  const likePost = (id, user_Id) => {
    console.log(id);
    console.log(user_Id)
    dispatch(likePostAction(id, user_Id))
    setVisible(true);
    setDislike(false);
    setComment(false);
    setBlankcomment(false);

  }
  //DisLike Post API
  const unlikePost = (id, user_Id) => {
    dispatch(unlikePostAction(id, user_Id))
    setVisible(false);
    setDislike(true);
    setComment(false);
    setBlankcomment(false);
  }
  //post comment API
  const makeComment = (texts, post_id, user_Name, user_Id) => {
    if (texts === '') {
      setBlankcomment(true)
    } else {
      dispatch(commentAction(texts, post_id, user_Name, user_Id))
      setVisible(false);
      setDislike(false);
      setComment(true);
      setBlankcomment(false);
    }
  }
  return (
    <Container className="container">
      <Alert color="success" isOpen={visible} toggle={onDismiss}>
        You Liked the Post!
      </Alert>
      <Alert color="danger" isOpen={dislike} toggle={onDismiss}>
        You Disliked the Post!
      </Alert>
      <Col>
        <Label className="font-weight-bold posts" color="#3386FF">{posts.post}</Label>
      </Col>
      <Col>
        <Label className="font-weight-bold details">DOMAIN: </Label><Label className="details">  {posts.domain}</Label>
      </Col>
      <Col>
        <Label className="font-weight-bold details">POSTED BY: </Label><Label className="details">{posts.name}</Label>
      </Col>
      <Col>
        <Label className="font-weight-bold details">POSTED ON: </Label>
        <Label className="details">
          {posts.date}</Label>
      </Col>
      <Col>
        <Label className="font-weight-bold details">LIKES: </Label>
        <Label className="details">{
          posts.likes === undefined ?
            <p>No Likes Yet</p>
            :
            <p>{posts.likes.length}<br /></p>}
        </Label>
      </Col>
      <Col>
        {
          posts.likes === undefined ?
            <p>No likes Yet</p>

            :
            posts.likes.includes(state.userInfo.user._id) ?
              <Button color="danger"
                onClick={() => { unlikePost(posts._id, state.userInfo.user._id) }}>Unlike</Button>
              :
              <Button color="success"
                onClick={() => { likePost(posts._id, state.userInfo.user._id) }}>Like</Button>
        }
      </Col>
      <Col>
        <br />
        <Alert color="success" isOpen={comment} toggle={onDismiss}>
          Your Comment Posted Successfully!
        </Alert>
        <Alert color="danger" isOpen={blankcomment} toggle={onDismiss}>
          OOPS! Comment Cannot Be Blank...
        </Alert>
        <Form className="form formstyle" onSubmit={(e) => {
          e.preventDefault()
          makeComment(e.target[0].value, posts._id, state.userInfo.user.name, state.userInfo.user._id)
        }}>
          <textarea className="comment-area" col="500" rows="10" id="comment-area"></textarea><br />
          <Button color="primary" className="" color="primary"> Comment</Button>
        </Form>
      </Col>
      <Col className="show-comment">
        {posts.comments === undefined || null ? <h3>No Comments Yet</h3>
          :
          posts.comments.map(record => {
            return (
              <h6 key={record._id}>
                <span className="posted-by">
                  <Link to={`/user/${record.userInfo}`}><strong>{record.postedBy}</strong></Link>
                </span>

                <br />

                <p className="comment">{record.text}</p><p className="comment">{record.date}</p></h6>
            )
          })
        }
      </Col>
    </Container>
  )
}
export default View;
