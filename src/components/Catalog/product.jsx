import React from "react";
import Card from "./card";
import ToggleSwitch from "./toggleswitch";
import { Hits, Stats, HitsPerPage } from "react-instantsearch-dom";

import {
  PaginationAlgolia,
  NoResults,
  CustomCurrentRefinements,
} from "../Widget";

import Select from 'react-select';

import { useTranslation } from "react-i18next";

const Product = () => {
  const { t, i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = React.useState();
  const options = [
    { value: t("product.12"), label:t("product.12") },
    { value: t("product.13"), label: t("product.13") },
    { value: t("product.14"), label: t("product.14") },
  ];

  const options2 = [
    { value: t("product.33"), label: t("product.33")},
  ];

  const options3 = [
    { value: "render", label: "Rendered images"},
    { value: "product", label: "Product images"},
  ];

  return (
    <div className="product-section">
      <div className="sort-section-wrapper">
        <div className="sort-section">
          <ToggleSwitch />
          <Select
            defaultValue={selectedOption ? selectedOption : {label: "Default Sorting", value: "Default Sorting"} }
            onChange={setSelectedOption}
            options={options}
            className="select"
            isSearchable={false}
          />
          <Select
            defaultValue={selectedOption ? selectedOption : {label: "Show 20", value: "Show 20"} }
            onChange={setSelectedOption}
            options={options2}
            className="show20"  isSearchable={false}
          />
          </div>
        <div className="pagination-wrapper">
          <div className="pagination">
            <PaginationAlgolia />
          </div>
          <div className="result">
            <Stats />
          </div>
        </div>
      </div>
      <Hits hitComponent={Card} />
      <NoResults />
      
      <div className="sort-section-wrapper">
        <div className="sort-section">
        </div>
        <div className="pagination-wrapper">
          <div className="pagination">
            <PaginationAlgolia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
