import React from 'react';
import Menu from '../../components/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ShoppingBasketItem } from "../../store/shopping-basket/types";
import ShoppingBasketSubItem from "./ShoppingBasketItem";

import "./index.scss";

interface ShoppingBasketProps {
    shoppingBasketTotal: number;
    shoppingBasketProducts: ShoppingBasketItem[];
    addQuantity(slug: string): void;
    subtractQuantity(slug: string): void;
}

const ShoppingBasket: React.FunctionComponent<ShoppingBasketProps> = (props) => {
    const { shoppingBasketTotal, shoppingBasketProducts, addQuantity, subtractQuantity } = props;

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return <>
        <Tooltip title="Open Basket">
            <div className="shopping-basket__header-area">
                <div className="material-icons shopping-basket__header-area-icon" onClick={handleOpenUserMenu}>
                    {"shopping_basket"}
                </div>
                <div className="shopping-basket__header-area-cost">
                    {`₺ ${shoppingBasketTotal}`}
                </div>
            </div>
        </Tooltip>
        <Menu
            id="menu-appbar"
            anchorElUser={anchorElUser}
            closeUserMenu={handleCloseUserMenu}
        >
            {shoppingBasketTotal === 0 && <div className="shopping-basket--empty">Begin to add products!</div>}
            {shoppingBasketTotal !== 0 && <div>
                {shoppingBasketProducts.map((product, index) => (
                    <MenuItem key={`shopping-basket-product-${index}`} onClick={handleCloseUserMenu}>
                        <ShoppingBasketSubItem shoppingBasketProduct={product} addQuantity={addQuantity} subtractQuantity={subtractQuantity} />
                    </MenuItem>
                ))}
                <div className="shopping-basket__total-wrapper">
                    <div className="shopping-basket__total">{shoppingBasketTotal}</div>
                </div>
            </div>
            }
        </Menu>
    </>
}

export default ShoppingBasket;