/* eslint-disable complexity */

import React, { Component } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const updateAfter = 700;

const routeStateDefaultValues = {
  query: '',
  page: '1',
  brands: undefined,
  countries: undefined,
  category: '',
  rating: '',
  price: '',
  free_shipping: 'false',
  sortBy: 'instant_search',
  hitsPerPage: '20',
};

const encodedCategories = {
  Cameras: 'Cameras & Camcorders',
  Cars: 'Car Electronics & GPS',
  Phones: 'Cell Phones',
  TV: 'TV & Home Theater',
};

const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
  const newKey = encodedCategories[key];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {});

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name) {
  const encodedName = decodedCategories[name] || name;

  return encodedName
    .replace(/ > /g, '/')
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}


// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
  const decodedSlug = encodedCategories[slug] || slug;

  return decodedSlug
    .split('+')
    .map(decodeURIComponent)
    .join(' ')
    .replace(/\//g, ' > ');
}

const searchStateToURL = (searchState) => {
  const routeState = {
    query: searchState.query,
    page: String(searchState.page),
    //brands: searchState.refinementList && searchState.refinementList.brand,
    // brands: searchState.refinementList && searchState.refinementList['taxonomies.yith_product_brand'],
    brands: searchState.refinementList && searchState.refinementList['brandName'],
    countries: searchState.refinementList && searchState.refinementList['countries'],
    // filetype: searchState.refinementList && searchState.refinementList['taxonomies.pa_filetype'],
    filetype: searchState.refinementList && searchState.refinementList['attributes.filetype'],
    category:
      searchState.hierarchicalMenu &&
      // searchState.hierarchicalMenu['taxonomies_hierarchical.product_cat.lvl0'],
      searchState.hierarchicalMenu['categories.lvl0'],
    rating:
      searchState.range &&
      searchState.range.rating &&
      String(searchState.range.rating.min),
    price:
      searchState.range &&
      searchState.range.price &&
      `${searchState.range.price.min || ''}:${
        searchState.range.price.max || ''
      }`,
    free_shipping:
      (searchState.toggle && String(searchState.toggle.free_shipping)) ||
      undefined,
    sortBy: searchState.sortBy,
    hitsPerPage:
      (searchState.hitsPerPage && String(searchState.hitsPerPage)) || undefined,
  };

  const { protocol, hostname, port = '', pathname, hash } = window.location;
  const portWithPrefix = port === '' ? '' : `:${port}`;
  const urlParts = window.location.href.match(/^(.*?)\/search/);
  let fixedPath = pathname;

  const lastCharPath = pathname.substr(-1); // Selects the last character
  
  if (lastCharPath != '/') {         // If the last character is not a slash
    fixedPath = fixedPath + '/';            // Append a slash to it.
  }
  
  const baseUrl =
    (urlParts && urlParts[0]) ||
    `${protocol}//${hostname}${portWithPrefix}${fixedPath}search`;

  const categoryPath = routeState.category
    ? `${getCategorySlug(routeState.category)}/`
    : '';
  const queryParameters = {};

  if (routeState.query && routeState.query !== routeStateDefaultValues.query) {
    queryParameters.query = encodeURIComponent(routeState.query);
  }
  if (routeState.page && routeState.page !== routeStateDefaultValues.page) {
    queryParameters.page = routeState.page;
  }
  if (
    routeState.brands &&
    routeState.brands !== routeStateDefaultValues.brands
  ) {
    queryParameters.brands = routeState.brands.map(encodeURIComponent);
  }
  if (
    routeState.countries &&
    routeState.countries !== routeStateDefaultValues.countries
  ) {
    queryParameters.countries = routeState.countries.map(encodeURIComponent);
  }
  if (
    routeState.filetype &&
    routeState.filetype !== routeStateDefaultValues.filetype
  ) {
    queryParameters.filetype = routeState.filetype.map(encodeURIComponent);
  }
  if (
    routeState.rating &&
    routeState.rating !== routeStateDefaultValues.rating
  ) {
    queryParameters.rating = routeState.rating;
  }
  if (routeState.price && routeState.price !== routeStateDefaultValues.price) {
    queryParameters.price = routeState.price;
  }
  if (
    routeState.free_shipping &&
    routeState.free_shipping !== routeStateDefaultValues.free_shipping
  ) {
    queryParameters.free_shipping = routeState.free_shipping;
  }
  if (
    routeState.sortBy &&
    routeState.sortBy !== routeStateDefaultValues.sortBy
  ) {
    queryParameters.sortBy = routeState.sortBy;
  }
  if (
    routeState.hitsPerPage &&
    routeState.hitsPerPage !== routeStateDefaultValues.hitsPerPage
  ) {
    queryParameters.hitsPerPage = routeState.hitsPerPage;
  }

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: 'repeat',
  });

  const outputURL = `${baseUrl}/${categoryPath}${queryString}${hash}`;
  //return `${baseUrl}/${categoryPath}${queryString}${hash}`;
  //console.log(outputURL);
  return outputURL;

};


const urlToSearchState = (location) => {
  const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
  //console.log(pathnameMatches);
  const category = getCategoryName(
    (pathnameMatches && pathnameMatches[1]) || ''
  );
  const queryParameters = qs.parse(location.search.slice(1));
  const {
    query = '',
    page = 1,
    brands = [],
    countries = [],
    filetype = [],
    price,
    free_shipping,
    hitsPerPage,
    sortBy,
    rating,
  } = queryParameters;
  // `qs` does not return an array when there's a single value.
  const allBrands = Array.isArray(brands) ? brands : [brands].filter(Boolean);
  const allCountries = Array.isArray(countries) ? countries : [countries].filter(Boolean);
  const allFiletypes = Array.isArray(filetype) ? filetype : [filetype].filter(Boolean);

  const searchState = { range: {} };

  if (query) {
    searchState.query = decodeURIComponent(query);
  }
  if (page) {
    searchState.page = page;
  }
  if (category) {
    searchState.hierarchicalMenu = {
      // 'taxonomies_hierarchical.product_cat.lvl0': category,
      'categories.lvl0': category,
    };
  }
  if (allBrands.length) {
    searchState.refinementList = {
      //brand: allBrands.map(decodeURIComponent),
      // 'taxonomies.yith_product_brand': allBrands.map(decodeURIComponent),
      'brandName': allBrands.map(decodeURIComponent),
    };
  }
  if (allCountries.length) {
    searchState.refinementList = {
      //brand: allBrands.map(decodeURIComponent),
      // 'taxonomies.yith_product_brand': allBrands.map(decodeURIComponent),
      'countries': allCountries.map(decodeURIComponent),
    };
  }
  if (allFiletypes.length) {
    searchState.refinementList = {
      // 'taxonomies.pa_filetype': allFiletypes.map(decodeURIComponent),
      'attributes.filetype': allFiletypes.map(decodeURIComponent),
    };
  }
  if (rating) {
    searchState.range.rating = {
      min: Number(rating),
    };
  }
  if (price) {
    const [min, max = undefined] = price.split(':');
    searchState.range.price = {
      min: min || undefined,
      max: max || undefined,
    };
  }
  if (free_shipping) {
    searchState.toggle = {
      free_shipping: Boolean(free_shipping),
    };
  }
  if (sortBy) {
    searchState.sortBy = sortBy;
  }

  if (hitsPerPage) {
    searchState.hitsPerPage = hitsPerPage;
  }

  return searchState;
};

const withURLSync = (App) =>
  class WithURLSync extends Component {
    state = {
      searchState: urlToSearchState(window.location),
    };
    
    componentDidMount() {
      window.addEventListener('popstate', this.onPopState);
    }

    componentWillUnmount() {
      clearTimeout(this.debouncedSetState);
      window.removeEventListener('popstate', this.onPopState);
    }

    onPopState = ({ state }) =>
      this.setState({
        searchState: state || {},
      });

    onSearchStateChange = (searchState) => {
      clearTimeout(this.debouncedSetState);



      this.debouncedSetState = setTimeout(() => {
        window.history.pushState(
          searchState,
          null,
          searchStateToURL(searchState)
        );
      }, updateAfter);

      this.setState({ searchState });
    };

    render() {
      const { searchState } = this.state;

      return (
        <App
          {...this.props}
          searchState={searchState}
          onSearchStateChange={this.onSearchStateChange}
          createURL={searchStateToURL}
        />
      );
    }
  };

export default withURLSync;
