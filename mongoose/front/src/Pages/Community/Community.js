import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@apollo/client";
import { postQuery } from "../../Queries";
import { Button } from "@mui/material";
import { CommunityItemList, CreatePostForm } from "./Components";

const el = document.getElementById("modal-root");

const Community = () => {
  const [listData, setListData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const { data } = useQuery(postQuery.GET_POST, {
    onCompleted: ({ getPost }) => {
      setListData(getPost);
    },
  });

  const openModal = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  return (
    <>
      <Button variant="contained" onClick={openModal}>
        Create Post
      </Button>
      <CommunityItemList listData={listData} />
      {modalStatus && createPortal(<CreatePostForm open={modalStatus} onClose={closeModal} />, el)}
    </>
  );
};
export default Community;
