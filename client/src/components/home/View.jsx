import React, { useState, useEffect, Component, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Col, Label,
  Button, Form, Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './post.css';
import { useSelector, useDispatch } from 'react-redux';
const View = (props) => {

  const ids = useParams()
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const state = useSelector(state => {
    return state.userLogin;
  });
  const { loading, userInfo, error } = state
  // console.log(state);
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
  //likePost API call
  const likePost = (id, user_Id) => {
    fetch('http://localhost:4000/app/like', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
        user_id: user_Id
      })
    }).then(res => res.json())
      .then(result => {

        const newData = data.map(post => {
          if (post._id == result._id) {
            return result

          } else {
            return post

          }
        })
        setData(newData)
        setVisible(true)
        setDislike(false)
        setBlankcomment(false);
        setComment(false);

      }).catch(err => {
        console.log(err)
      })
  }
  //DisLike Post API
  const unlikePost = (id, user_Id) => {
    fetch('http://localhost:4000/app/unlike', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
        user_id: user_Id
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result.likes)
        const newData = data.map(posts => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newData)
        setDislike(true)
        setVisible(false)
        setBlankcomment(false);
        setComment(false);
      }).catch(err => {
        console.log(err)
      })
  }
  //post comment API
  const makeComment = (texts, post_id, user_Name, user_Id) => {
    if (texts == '') {
      setBlankcomment(true)
    } else {
      fetch('http://localhost:4000/app/comment', {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          postId: post_id,
          user_name: user_Name,
          text: texts,
          user_id: user_Id
        })
      }).then(res => res.json())
        .then(result => {
          console.log(result)
          const newData = data.map(posts => {
            if (posts._id == result._id) {
              return result
            } else {
              return posts
            }

          })
          setData(newData)
          setComment(true);
          setVisible(false);
          setDislike(false);
          setBlankcomment(false);
        }).catch(err => {
          console.log(err);
        })
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
        <Label className="font-weight-bold posts">{posts.post}</Label>
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
          posts.likes == undefined ?
            <p>No Likes Yet</p>
            :
            <p>{posts.likes.length}<br /></p>}
        </Label>
      </Col>
      <Col>
        {
          posts.likes == undefined ?
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
        {posts.comments == undefined || null ? <h3>No Comments Yet</h3>
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
