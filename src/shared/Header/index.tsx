import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { ShoppingBasketState } from "../../store/shopping-basket/types";
import { addQuantity, subtractQuantity } from "../../store/shopping-basket/actions";
import ShoppingBasket from "../ShoppingBasket";

import './index.scss';

// props from connect mapDispatchToProps
interface DispatchProps {
    addQuantity: (slug: string) => void;
    subtractQuantity: (slug: string) => void;
}

// props from connect mapStateToProps
interface StateProps {
    shoppingBasket: ShoppingBasketState;
}

const Header: React.FunctionComponent<DispatchProps & StateProps> = (props) => {
    const { shoppingBasket, addQuantity, subtractQuantity } = props;
    const { total: shoppingBasketTotal, addedProducts: shoppingBasketProducts } = shoppingBasket;

    const handleAddQuantity = (slug: string) => {
        addQuantity(slug);
    };

    const handleSubtractQuantity = (slug: string) => {
        subtractQuantity(slug);
    };

    return (
        <AppBar position="static" className="header" sx={{ backgroundColor: "#1ea4ce" }}>
            <Container maxWidth="xl" className="header__container">
                <Toolbar disableGutters>
                    <div className="header__logo">
                        <img src="./logo.png" alt="Logo" />
                    </div>
                    <ShoppingBasket shoppingBasketTotal={shoppingBasketTotal}
                        shoppingBasketProducts={shoppingBasketProducts}
                        addQuantity={handleAddQuantity}
                        subtractQuantity={handleSubtractQuantity} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};


const mapStateToProps = (state: AppState) => {
    return {
        shoppingBasket: state.shoppingBasket,
    }
}

const mapDispatchToProps = {
    addQuantity,
    subtractQuantity
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);