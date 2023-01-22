import React from "react";
import { ImCross } from "react-icons/im";
import { connectCurrentRefinements } from "react-instantsearch-dom";

const CustomCurrentRefinements = connectCurrentRefinements(
  ({ items, refine }) => {
    let list = [];
    
    items?.map((item) => {
      if (
        // item?.attribute === "taxonomies_hierarchical.product_cat.lvl0" ||
        // item?.attribute === "taxonomies_hierarchical.product_cat.lvl1" ||
        // item?.attribute === "taxonomies_hierarchical.product_cat.lvl2"
        item?.attribute === "categories.lvl0" ||
        item?.attribute === "categories.lvl1" ||
        item?.attribute === "categories.lvl2"
      ) {
        list = [
          ...list,
          { label: item?.currentRefinement, cancel: item?.value },
        ];
      }
        

      if (
        // item?.attribute === "taxonomies.yith_product_brand" ||
        // item?.attribute === "taxonomies.pa_filetype"
        item?.attribute === "brandName" ||
        item?.attribute === "countries" ||
        item?.attribute === "attributes.filetype"
      ) {
        item?.items?.map((data) => {
          list = [...list, { label: data?.label, cancel: data?.value }];
        });
      }

      if (item.attribute === "attributes.height") {
        list = [
          ...list,
          {
            label: `Height: ${item?.currentRefinement?.min}mm - ${item?.currentRefinement?.max}mm`,
            cancel: item?.value,
          },
        ];
      }

      if (item.attribute === "attributes.width") {
        list = [
          ...list,
          {
            label: `Width: ${item?.currentRefinement?.min}mm - ${item?.currentRefinement?.max}mm`,
            cancel: item?.value,
          },
        ];
      }

      if (item.attribute === "attributes.length") {
        list = [
          ...list,
          {
            label: `Length: ${item?.currentRefinement?.min}mm - ${item?.currentRefinement?.max}mm`,
            cancel: item?.value,
          },
        ];
      }

      // if (item.attribute === "pa_depth_num") {
      if (item.attribute === "attributes.depth") {
        list = [
          ...list,
          {
            label: `Depth: ${item?.currentRefinement?.min}mm - ${item?.currentRefinement?.max}mm`,
            cancel: item?.value,
          },
        ];
      }
    });

    return (
      <>
        {list?.length > 0 && <div className="filters-title">Active Filters</div>}
        {list?.length > 0 && 
          list?.map((data, idx) => (
            // <div className="tags" key={idx} style={{marginLeft: idx > 0 && "10px"}}>
            <div className="tags" key={idx}>
              <div className="label">{data?.label}</div>
              <ImCross
                className="cancel"
                onClick={() => {
                  refine(data.cancel);
                }}
              />
            </div>
          ))}
      </>
    );
  }
);

export default CustomCurrentRefinements;
