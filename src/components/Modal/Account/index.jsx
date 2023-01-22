import React from "react";
import "./style.scss";

import { Modal } from "react-bootstrap";
import Avatar from "react-avatar";

// image's & icons
import { MdOutlineClose } from "react-icons/md";

const TableData = ({ heading, text }) => {
  return (
    <div className="table-data">
      <div className="heading">{heading}</div>
      <div className="text">{text}</div>
    </div>
  );
};

const AccountModal = ({ account, showModal, closeModal }) => {
  const {
    username,
    idTokenClaims: {
      name,
      emails: email,
      extension_Company: company,
      extension_Occupation: occupation,
    },
  } = account;

  
  // const editProfile = (string) => {
  //   window.location.href =
  //     "https://bimform123.b2clogin.com/bimform123.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_portaledit1&client_id=cfe6e535-2e20-49b8-b772-b9ae73c86c18&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=openid&response_type=id_token&prompt=login";
  // };

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        className="account-modal-component"
      >
        <div className="close-modal">
          <MdOutlineClose onClick={closeModal} className="icon" />
        </div>

        <div className="main-wrapper">
          <div className="tabs-wrapper">
            <div className="tab tab-active">
              <span>Profile</span>
            </div>

            <div className="tab">
              <span>Subscription</span>
            </div>
          </div>

          <div className="tab-content-wrapper">
            <div className="left">
              <div className="profile">
                {/* <img src={image} alt="" /> */}
                <Avatar name={username + " D"} size="300" textSizeRatio="4" />
              </div>
            </div>

            <div className="right">
              <TableData heading={"Display name"} text={username} />
              <TableData heading={"Name"} text={name} />
              {/* <TableData heading={"Email"} text={email[0]} /> */}
              <TableData heading={"Occupation"} text={occupation} />
              <TableData heading={"Company"} text={company} />
              <TableData heading={"Subscription"} text={"Premium"} />

              <div className="account-edit-buttons">
                {/* </div><div className="button" onClick={editProfile}> */}
                <div className="button">
                  Edit profile
                </div>
                <div className="button">Change password</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountModal;
