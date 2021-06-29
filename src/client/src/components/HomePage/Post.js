import post from "../stylesheets/post.css";

import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { editPost, deletePost, addComment } from "../../actions/postAction";

const Post = (props) => {
  const [comment, setComment] = useState({
    textComment: "",
  });

  const { textComment } = comment;

  const onChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const onComment = (e) => {
    e.preventDefault();

    const commentInfo = {
      comment: textComment,
      commenter: props.currentUser.id,
      post: props.post._id,
    };

    comment.textComment = "";

    props.addComment(commentInfo, props.history);

    window.location.reload();
  };

  const onDelete = (e) => {
    e.preventDefault();

    props.deletePost(props.post._id, props.history);
    window.location.reload();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-2">
      <div className="row mt-5">
        <div className="card col-lg-12" style={{ width: "46rem" }}>
          <div className="mb-1">
            <div className="top-row mt-3">
              <div className="text-left ms-2 mb-2 d-flex justify-content-between">
                <h2 className="d-inline">
                  {props.post ? props.post.title : "Generic Title"}
                </h2>
                {props.post &&
                props.currentUser &&
                props.post.poster._id === props.currentUser.id ? (
                  <form onSubmit={onDelete}>
                    <button
                      type="submit"
                      className="btn btn-danger btn-md mt-0 my-auto me-3"
                    >
                      Delete
                    </button>
                  </form>
                ) : (
                  ""
                )}
              </div>
              <div className="bg-light mx-3 py-2 px-2 align-items-center title mt-3">
                <img
                  src="https://thispersondoesnotexist.com/image"
                  width="75"
                  height="75"
                  className="d-inline"
                ></img>
                <div className="d-inline">
                  <h4 className="d-inline ms-3">
                    {props.post.poster
                      ? props.post.poster.username
                      : "PineappleEat43"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-1 mt-0">
            <div className="centre-row">
              <div className="col-12">
                <div className="card-body">
                  <h6 className="bg-light textP px-2 py-2">
                    {" "}
                    {props.post
                      ? props.post.text
                      : "This is an auto-generated text"}{" "}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 mx-3 justify-content-center">
            <div className="last-row">
              <form onSubmit={onComment}>
                <label htmlFor="textComment" className="d-inline"></label>
                <div className="col-lg-12">
                  <textarea
                    className="form-control"
                    id="textComment"
                    name="textComment"
                    placeholder="Write your comment here!"
                    rows="2"
                    value={textComment}
                    onChange={onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-light btn-md mt-3 d-block mx-auto"
                >
                  Comment
                </button>
              </form>
            </div>
          </div>

          {props.post && props.post.comments && props.post.comments.length > 0
            ? props.post.comments.map((comment) => (
                <div className="bg-light my-3 comments textP mx-3">
                  <img
                    src="https://thispersondoesnotexist.com/image"
                    width="50"
                    height="50"
                    className="d-inline mx-2 my-2"
                  ></img>
                  <h4 className="d-inline">
                    {comment.user ? comment.user.username : "PineappleEat43"}{" "}
                  </h4>
                  <p className="mx-3" style={{ color: "black" }}>
                    {comment.comment
                      ? comment.comment
                      : "This is an autogenerated paragraph"}
                  </p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(null, {
  editPost,
  deletePost,
  addComment,
})(Post);