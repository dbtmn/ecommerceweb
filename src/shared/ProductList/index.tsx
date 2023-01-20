import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ProductListItem from "../../components/ProductListItem";
import Error, { ErrorSize } from "../../shared/Error";
import Loading from "../../shared/Loading";
import ItemTypeArea from "../ItemTypeArea";
import { fetchItemsByFilter } from "../../store/items/actions";
import { setItemType, setActivePage } from "../../store/filters/actions";
import { addToBasket } from "../../store/shopping-basket/actions";
import { Item, ItemState } from "../../store/items/types";

import "./index.scss";

// props from connect mapDispatchToProps
interface DispatchProps {
    fetchItemsByFilter: () => Promise<void>;
    addToBasket: (product: Item, slug: string) => void;
    setActivePage: (activePage: number) => void;
    setItemType: (itemType: string) => void;
}

// props from connect mapStateToProps
interface StateProps {
    itemsState: ItemState;
    activePage: number;
    totalPage: number;
}

type ProductListProps = DispatchProps & StateProps;

class ProductList extends React.Component<ProductListProps> {

    handleChangedActivePage = (pageNumber: number) => {
        const { setActivePage, fetchItemsByFilter } = this.props;

        setActivePage(pageNumber);
        fetchItemsByFilter();
    };

    handleSelectedItemType = (itemType: string) => {
        const { setActivePage, setItemType, fetchItemsByFilter } = this.props;

        setActivePage(1);
        setItemType(itemType);
        fetchItemsByFilter();
    }

    handleAddProductToBasket = (product: Item, slug: string) => {
        const { addToBasket } = this.props;

        addToBasket(product, slug);
    };

    render() {
        const { itemsState, activePage, totalPage } = this.props;
        const { items: products, pending: isItemsPending, error: isItemsError } = itemsState;

        return <>
            <div className="product-list__title">Products</div>
            <ItemTypeArea selectItemType={this.handleSelectedItemType} />
            {isItemsPending && <Loading />}
            {isItemsError && <Error size={ErrorSize.lg} />}
            {products.length > 0 && !isItemsPending &&
                <>
                    <Grid container className="product-list__container">
                        {products.map((product) => <Grid key={`product-list-item-${uuidv4()}`} item sx={{ px: 1, pb: 2, display: 'flex', justifyContent: 'center' }} xs={3} sm={3} md={3} lg={3}>
                            <ProductListItem product={product} addProductToBasket={this.handleAddProductToBasket} />
                        </Grid>
                        )}
                    </Grid>
                    <Stack spacing={6}>
                        <Pagination
                            sx={{
                                justifyContent: 'center',
                                display: 'flex',
                                '&.Mui-selected': {
                                    backgroundColor: '#1ea4ce'
                                }
                            }}
                            page={activePage}
                            count={totalPage}
                            shape="rounded"
                            renderItem={(item) => (
                                <PaginationItem
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: '#1ea4ce',
                                            color: '#fff'
                                        }
                                    }}
                                    components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                    {...item}
                                />
                            )}
                            onChange={(e, value) => this.handleChangedActivePage(value)}
                        />
                    </Stack>
                </>
            }
        </>
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        itemsState: state.items,
        activePage: state.filters.activePage,
        totalPage: state.filters.totalPage,
    }
}

const mapDispatchToProps = {
    fetchItemsByFilter,
    addToBasket,
    setActivePage,
    setItemType,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);