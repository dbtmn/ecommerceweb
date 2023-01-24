import React from "react";
import Button from "@mui/material/Button";
import { ShoppingBasketItem } from "../../store/shopping-basket/types";

import "./index.scss";

interface ShoppingBasketSubItemProps {
    shoppingBasketProduct: ShoppingBasketItem;
    addQuantity(slug: string): void;
    subtractQuantity(slug: string): void;
}

const ShoppingBasketSubItem: React.FunctionComponent<ShoppingBasketSubItemProps> = (props) => {
    const { shoppingBasketProduct, addQuantity, subtractQuantity } = props;
    const { name, subPrice, slug, quantity } = shoppingBasketProduct

    return <div className="shopping-basket__wrapper">
        <div className="shopping-basket__information">
            <div className="shopping-basket__name">{name}</div>
            <div className="shopping-basket__price fw-6">{`₺${subPrice}`}</div>
        </div>
        <div className="shopping-basket__controls">
            <Button className="product-list-item__decrement" variant="text" sx={{
                height: '2.08vw',
                color: '#1ea4ce',
                fontFamily: 'Open Sans',
                fontWeight: '600',
                fontSize: '16px',
                textTransform: 'none',
                marginRight: '0.5vw'
            }}
                onClick={() => subtractQuantity(slug)}>
                -
            </Button>
            <div className="shopping-basket__quantity">
                {quantity}
            </div>
            <Button className="product-list-item__increment" variant="text" sx={{
                height: '2.08vw',
                color: '#1ea4ce',
                fontFamily: 'Open Sans',
                fontWeight: '600',
                fontSize: '16px',
                textTransform: 'none',
                marginRight: '0.5vw'
            }}
                onClick={() => addQuantity(slug)}>
                +
            </Button>
        </div>
    </div>
};

export default ShoppingBasketSubItem;