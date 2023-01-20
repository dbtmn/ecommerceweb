import React from 'react';
import Button from "@mui/material/Button";

import { Item } from "../../store/items/types";

import "./index.scss";

interface ProductListItemProps {
    product: Item;
    addProductToBasket(product: Item, slug: string): void;
}

const ProductListItem: React.FunctionComponent<ProductListItemProps> = (props) => {
    const { product, addProductToBasket } = props;

    return <div className="product-list-item">
        <div className="product-list-item__container">
            <div className="product-list-item__image-wrapper">
                <div className="product-list-item__image" />
            </div>
            <div className="product-list-item__details-wrapper">
                <div className="product-list-item__text">
                    <div className="product-list-item__price">{`₺ ${product.price}`}</div>
                    <div className="product-list-item__name">{product.name}</div>
                </div>
                <div className="product-list-item__add">
                    <Button variant="contained" sx={{
                        width: '100%',
                        height: '1.5vw',
                        backgroundColor: '#1ea4ce',
                        fontFamily: 'Open Sans',
                        fontWeight: '600',
                        fontSize: '12px',
                        textTransform: 'none'
                    }}
                        onClick={() => addProductToBasket(product, product.slug)}>Add</Button></div>
            </div>
        </div>
    </div>

}

export default ProductListItem;
