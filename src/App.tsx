import React from 'react';
import { connect } from "react-redux";

import Grid from '@mui/material/Grid';

import { fetchCompanies } from "./store/companies/actions";
import { fetchItemTypes } from "./store/item-types/actions";
import { fetchItems } from "./store/items/actions";
import { fetchTags } from "./store/tags/actions";

import BrandArea from "./shared/BrandArea";
import Header from "./shared/Header";
import ItemTypeArea from "./shared/ItemTypeArea";
import ProductList from "./shared/ProductList";
import SortingArea from "./shared/SortingArea";
import TagArea from "./shared/TagArea";

import './App.scss';

// props from connect mapDispatchToProps
interface DispatchProps {
  fetchCompanies: () => Promise<void>;
  fetchItems: () => Promise<void>;
  fetchItemTypes: () => Promise<void>;
  fetchTags: () => Promise<void>;
}

class App extends React.Component<DispatchProps> {

  componentDidMount() {
    const { fetchCompanies, fetchItems, fetchItemTypes, fetchTags } = this.props;
    fetchCompanies();
    fetchItems();
    fetchItemTypes();
    fetchTags();
  }

  render() {
    return (
      <>
        <Header />
        <Grid container className="home__container">
          <Grid item xs={1} sm={1} md={1} lg={1} sx={{ maxWidth: { lg: '7.5%' } }} className="home__spacer" />
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <SortingArea />
            <BrandArea />
            <TagArea />
          </Grid>
          <Grid item xs={7} sm={6} md={6} lg={6}>
            <ItemTypeArea />
            <ProductList />
          </Grid>
          <Grid item xs={1} sm={2} md={2} lg={2} />
          <Grid item xs={1} sm={1} md={1} lg={1} sx={{ maxWidth: { lg: '7.5%' } }} className="home__spacer" />
        </Grid>
      </>
    )
  };
}

const mapDispatchToProps = {
  fetchCompanies,
  fetchItemTypes,
  fetchItems,
  fetchTags,
};

export default connect(null, mapDispatchToProps)(App);
