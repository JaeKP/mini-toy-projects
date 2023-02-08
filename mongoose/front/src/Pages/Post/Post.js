import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { postQuery } from "../../Queries";
import { PostDetail, UpdatePostForm, DeletePostForm } from "./Components";

const el = document.getElementById("modal-root");

const Post = () => {
  const { postId } = useParams();
  const { data, loading, error } = useQuery(postQuery.GET_POSTDETAIL, {
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

  return (
    <>
      <PostDetail postData={postData} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
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
    </>
  );
};
export default Post;
