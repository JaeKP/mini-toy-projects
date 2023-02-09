import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { postQuery } from "../../Queries";
import { PostDetail, UpdatePostForm, DeletePostForm, CommentForm, CommentList } from "./Components";

const el = document.getElementById("modal-root");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "5rem",
  },
}));

const Post = () => {
  const { postId } = useParams();
  const classes = useStyles();
  const { loading, data } = useQuery(postQuery.GET_POSTDETAIL, {
    variables: { postId },
    onCompleted: ({ getPostDetail }) => {
      setPostData(getPostDetail);
    },
    onError: () => {
      navigate("/");
    },
  });
  const [postData, setPostData] = useState({});
  const [updateModalStatus, setUpdateModalStatus] = useState(false);
  const [deleteModalStauts, setDeleteModalStatus] = useState(false);

  const navigate = useNavigate();

  const openUpdateModal = () => {
    setUpdateModalStatus(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalStatus(false);
  };

  const openDeleteModal = () => {
    setDeleteModalStatus(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalStatus(false);
  };

  if (loading) return;

  return (
    <section className={classes.root}>
      <PostDetail postData={postData} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
      {postData.comments && <CommentList commentData={postData.comments} id={postData.id} />}
      <CommentForm id={postData.id} />
      {updateModalStatus &&
        createPortal(
          <UpdatePostForm
            open={updateModalStatus}
            onClose={closeUpdateModal}
            postData={postData}
            setPostData={setPostData}
          />,
          el
        )}
      {deleteModalStauts &&
        createPortal(<DeletePostForm open={deleteModalStauts} onClose={closeDeleteModal} id={postData.id} />, el)}
    </section>
  );
};
export default Post;
