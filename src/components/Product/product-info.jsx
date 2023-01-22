import React, { useState } from "react";

// packages
import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";

// compnents
import Location from "./location";

const tabArray = ["PRODUCT INFORMATION", "CLASSIFICATION", "AVAILABILITY"];

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

const ProductInfo = ({ product }) => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(tabArray[0]);

  const handleActive = (string) => {
    setActive(string);
  };

  const availabilityRawData = product?.meta_data?.find(
    (ele) => ele?.key === "market_area"
  );
  // const generalArrayRawData = product?.meta_data?.find(
  //   (ele) => ele?.key === "general"
  // );
  // const technicalDetailsRawData = product?.meta_data?.find(
  //   (ele) => ele?.key === "technical_details"
  // );
  // const dimensionsRawData = product?.meta_data?.find(
  //   (ele) => ele?.key === "dimensions"
  // );
  // const classificationsRawData = product?.meta_data?.find(
  //   (ele) => ele?.key === "classification"
  // );

  const generalNew = product?.general;

  const dimensionsNew = product?.dimensions;

  const technicalDetailsNew = product?.technicalDetails;

  const classificationNew = product?.classification;

  const availabilityNew = product?.availability;

  // const general =
  //   generalArrayRawData?.value && JSON?.parse(generalArrayRawData?.value);

  // let generalTable = [];

  // for (let item in general) {
  //     for (let property in general[item]){
  //       if (general[item][property]?.field !== "") {
  //         generalTable.push(general[item][property]);
  //       }
  //     }
  // }

  // const technical =
  //   technicalDetailsRawData?.value &&
  //   JSON?.parse(technicalDetailsRawData?.value);
    
  //   let technicalTable = [];

  //   for (let item in technical) {
  //       for (let property in technical[item]){
  //         if (technical[item][property]?.field !== "") {
  //           technicalTable.push(technical[item][property]);
  //         }
  //       }
  //   }

  // const dimensions =
  //   dimensionsRawData?.value && JSON?.parse(dimensionsRawData?.value);

  //   let dimensionsTable = [];

  //   for (let item in dimensions) {
  //       for (let property in dimensions[item]){
  //         if (dimensions[item][property]?.field !== "") {
  //           dimensionsTable.push(dimensions[item][property]);
  //         }
  //       }
  //   }

  //   const classifications =
  //   classificationsRawData?.value && JSON?.parse(classificationsRawData?.value);

  //   let classificationsTable = [];

  //   for (let item in classifications) {
  //       for (let property in classifications[item]){
  //         if (classifications[item][property]?.field !== "") {
  //           classificationsTable.push(classifications[item][property]);
  //         }
  //       }
  //   }

    const availability =
    availabilityRawData?.value && JSON?.parse(availabilityRawData?.value);

  return (
    <div className="product-info">
      <div className="tab-wrapper">
        {tabArray.map((data, index) => (
          <div
            className={data === active ? "tab active" : "tab"}
            onClick={() => {
              handleActive(data);
            }}
            key={index}
          >
            {t(`catalog.${index + 20}`)}
          </div>
        ))}
      </div>

      <div className="tab-content">
        {active === tabArray[0] && (
          <Table responsive>
            <tbody>
              {/* {generalTable.length !== 0 && (
                  <>
                    <tr>
                      <th className="table_title">General</th>
                      <td className="table_data"></td>
                    </tr>
                  </>
                )
              }
              {generalTable.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td className="table_heading">{item.title}</td>
                      <td className="table_data">{item.field}</td>
                    </tr>
                  </>
                  )
                )
              } */}

              {Object.keys(generalNew).length !== 0 && (
                  <>
                    <tr>
                      <th className="table_title">General</th>
                      <td className="table_data"></td>
                    </tr>
                  </>
                )
              }

              {Object.keys(generalNew).map((key, index) => {
                return (
                  generalNew[key] !== "" && (
                    <>
                      <tr key={index}>
                        <td className="table_heading">{t("general." + key)}</td>
                        <td className="table_data">{generalNew[key]}</td>
                      </tr>
                    </>
                  )
                );
              })}


              {Object.keys(dimensionsNew).length !== 0 && (
                  <>
                    <tr>
                      <th className="table_title">Dimensions</th>
                      <td className="table_data"></td>
                    </tr>
                  </>
                )
              }

              {Object.keys(dimensionsNew).map((key, index) => {
                return (
                  dimensionsNew[key] !== "" && (
                    <>
                      <tr key={index}>
                        <td className="table_heading">{t("dimensions." + key)}</td>
                        <td className="table_data">{dimensionsNew[key]}</td>
                      </tr>
                    </>
                  )
                );
              })}

            {Object.keys(technicalDetailsNew).length !== 0 && (
                  <>
                    <tr>
                      <th className="table_title">Technical Details</th>
                      <td className="table_data"></td>
                    </tr>
                  </>
                )
              }

              {Object.keys(technicalDetailsNew).map((key, index) => {
                return (
                  technicalDetailsNew[key] !== "" && (
                    <>
                      <tr key={index}>
                        {/* <td className="table_heading">{key}</td>*/}
                        <td className="table_heading">{t("technicalDetails." + key)}</td> 
                        <td className="table_data">{technicalDetailsNew[key]}</td>
                      </tr>
                    </>
                  )
                );
              })}
            </tbody>
          </Table>
        )}

        {active === tabArray[1] && (<Table responsive>
            <tbody>
              {Object.keys(classificationNew).length !== 0 && (
                  <>
                    <tr>
                      <th className="table_title">Classification</th>
                      <td className="table_data"></td>
                    </tr>
                  </>
                )
              }

              {Object.keys(classificationNew).map((key, index) => {
                return (
                  classificationNew[key] !== "" && (
                    <>
                      <tr key={index}>
                        <td className="table_heading">{t("classification." + key)}</td>
                        <td className="table_data">{classificationNew[key]}</td>
                      </tr>
                    </>
                  )
                );
              })}
            </tbody>
          </Table>)}

        {active === tabArray[2] && (
          <div>
            <Location data={availabilityNew} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
