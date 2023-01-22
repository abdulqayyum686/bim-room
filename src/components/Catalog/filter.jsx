import React, {useState, useEffect} from "react";
import ToggleSwitch from "./toggleswitch";
import {
  ClearRefinements,
  RefinementList,
  Panel,
  HierarchicalMenu,
} from "react-instantsearch-dom";
import {
  CustomAlgoliaSearch,
  NavbarAlgoliaSearch,
  NumSlider,
  Ratings,
  CustomCurrentRefinements,
} from "../Widget";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Section from "./Section";

import { FaSearch } from "react-icons/fa";

const Filter = ({searchState}) => {
  const { t, i18n } = useTranslation();
  const searched = useSelector((store) => store.product.search);
  const selectedCategory = useSelector((store) => store.product.category);
  const selectedBrand = useSelector((store) => store.product.brand);
  //console.log(searchState?.hierarchicalMenu["taxonomies_hierarchical.product_cat.lvl0"]);
  const [category, setCategory] = useState("");

  useEffect(() => {

    if (typeof searchState?.hierarchicalMenu != "undefined") {
      if ("categories.lvl0" in searchState?.hierarchicalMenu) {
        setCategory(searchState?.hierarchicalMenu["categories.lvl0"]);
      }
    }
  }, [searchState])

  return (
    <div className="filter-wrapper">

      <div className="filters-section">
        <div className="refine-tag-wrapper">
          <CustomCurrentRefinements />
        </div>
      </div>
      <div className="text mt-2">{t("product.34")}</div>
      <div className="search-filter">
        <NavbarAlgoliaSearch />
        <div className="icon" onClick={() => {}}>
          <FaSearch />
        </div>
      </div>

      <div className="category-search">
        <Section title="Category" defaultExpanded={true}>
          <Panel>
            <HierarchicalMenu
              limit={100}
              attributes={[
                "categories.lvl0",
                "categories.lvl1",
                "categories.lvl2",
              ]}
            />
          </Panel>
        </Section>
      </div>

      <div className="brand-search">
        <Section title="Brands" defaultExpanded={false}>
          <Panel>
            <RefinementList
              attribute="brandName"
              limit={2000}
              searchable={true}
              translations={{
                placeholder: "Search for brands…",
                resetTitle: "",
              }}
            />
          </Panel>
        </Section>
      </div>

      <div className="brand-search">
        <Section title="Market availability" defaultExpanded={false}>
          <Panel>
            <RefinementList
              attribute="countries"
              limit={2000}
              searchable={true}
              translations={{
                placeholder: "Product available in...",
                resetTitle: "",
              }}
            />
          </Panel>
        </Section>
      </div>

      <div className="file-type">
        <Section title="Filetype" defaultExpanded={false}>
          <Panel>
            <RefinementList attribute="attributes.filetype" limit={2000} />
          </Panel>
        </Section>
      </div>

      <div className="dimensions">
        <Section title="Dimensions" defaultExpanded={false}>
          <Panel className="slim-panel" >
            <NumSlider attribute="attributes.height" unit="mm" header="Height"  />
          </Panel>
          <Panel className="slim-panel">
            <NumSlider attribute="attributes.width" unit="mm" header="Width"  />
          </Panel>
          <Panel className="slim-panel">
            <NumSlider attribute="attributes.length" unit="mm" header="Length"  />
          </Panel>
          <Panel className="slim-panel">
            <NumSlider attribute="attributes.depth" unit="mm" header="Depth" />
          </Panel>
        </Section>
      </div>
      
      {category !== "" &&
        <div className="file-type">
          <Section title="Fire rating" defaultExpanded={false}>
            <Panel>
              <RefinementList attribute="attributes.fireRating" limit={2000} />
            </Panel>
          </Section>
        </div>
      }

      {category !== "" &&
        <div className="dimensions">
          <Section title="Sound reduction index" defaultExpanded={false}>
            <Panel className="slim-panel" collapsed="true">
              <NumSlider attribute="attributes.soundReductionIndex" unit="dB" />
            </Panel>
          </Section>
        </div>
      }
    
      {category !== "" &&
        <div className="dimensions">
          <Section title="Thermal transmittance" defaultExpanded={false}>
            <Panel className="slim-panel" collapsed="true">
              <NumSlider attribute="attributes.thermalTransmittance" unit="W/m²K"/>
            </Panel>
          </Section>
        </div>
      }

      <div className="rating">
        <Section title="Ratings">
          <Panel>
            <Ratings attribute="demo_rating" />
          </Panel>
        </Section>
      </div>
      <div className="rest-filters-button">
        <ClearRefinements
          clearsQuery
          translations={{
            reset: "Reset all filters",
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
