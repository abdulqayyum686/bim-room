import React from "react";
import "./style.scss";

import { Modal } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

// image's & icons
import { MdOutlineClose } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import brand from "../../../assets/images/modal/brand.png";
import logo from "../../../assets/images/modal/object.png";

import Brand from "./brand";

const DownloadModal = ({ name, brandName, data, showModal, modalClose, downloadObject }) => {
  //console.log(brandName);
  //console.log(data);

  let downloadData = [];
  let rvtData = [];
  let ifcData = [];


  if (data?.rfa) {
    const rfaFiles = data?.rfa;
    for (let i = 0; i < rfaFiles.length; i++) {
      if (typeof(rfaFiles[i]) === "object") {
        if(Object.keys(rfaFiles[0]).length !== 0) {
          downloadData.push(rfaFiles[i]);
        }
      }
    }
  }

  if (data?.rvt) {
    const rvtFiles = data?.rvt;
    for (let i = 0; i < rvtFiles.length; i++) {
      if (typeof(rvtFiles[i]) === "object") {
        if(Object.keys(rvtFiles[0]).length !== 0) {
          downloadData.push(rvtFiles[i]);
        }
      }
    }
  }

  if (data?.ifc) {
    const ifcFiles = data?.ifc;
    for (let i = 0; i < ifcFiles.length; i++) {
      if (typeof(ifcFiles[i]) === "object") {
        if(Object.keys(ifcFiles[0]).length !== 0) {
          downloadData.push(ifcFiles[i]);
        }
      }
    }
  }


  return (
    <>
      <Modal
        show={showModal}
        onHide={modalClose}
        className="download-modal-component"
      >
        <div className="close-modal">
          <MdOutlineClose onClick={modalClose} className="icon" />
        </div>

        <div className="main-wrapper">
          <div className="header">
            <div className="title">{name}</div>

            <div className="brand">
              {/* <img src={brand} alt="" /> */}
              <Brand brand={brandName} />
            </div>
          </div>

          <div className="download-text">Downloads</div>

          <div className="download-table">
            <table>
              <tbody>
                {downloadData.map((data, index) => (
                  <tr key={index}>
                    <td className="td1">
                      <img src={logo} alt="" />
                    </td>
                    <td>{data?.name}</td>
                    <td className="td3">
                      <div
                        className="download"
                       // style = {{pointerEvents: "none"}}
                        data-tip 
                        data-for='noDemoAccess'
                        onClick={() => {
                          // window.open(
                          //   `https://platformdev123.blob.core.windows.net/testing/${downloadObject}`
                          // );
                        }}
                      >
                        <FaCloudDownloadAlt className="icon" />
                        <span>Download</span>
                      </div>
                      <ReactTooltip id='noDemoAccess' type='light'>
                        <span>File downloads not available in demo mode</span>
                      </ReactTooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DownloadModal;
