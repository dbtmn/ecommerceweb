import React from 'react';
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import Button from "@mui/material/Button";
import Error, { ErrorSize } from "../../shared/Error";
import Loading from "../../shared/Loading";

import { ItemTypesState } from "../../store/item-types/types";

import "./index.scss";

// props from connect mapStateToProps
interface StateProps {
    activeItemType: string;
    itemTypesState: ItemTypesState;
}

interface ItemTypeAreaProps {
    selectItemType(itemType: string): void;
}

const ItemTypeArea: React.FunctionComponent<StateProps & ItemTypeAreaProps> = (props) => {
    const { itemTypesState, activeItemType, selectItemType } = props;
    const { itemTypes, pending: isItemTypesPending, error: isItemTypesError } = itemTypesState;

    return <div className="item-type-area__wrapper">
        {isItemTypesError && <Error size={ErrorSize.lg} />}
        {isItemTypesPending && <Loading />}
        {itemTypes.length > 0 && !isItemTypesPending && itemTypes.map(itemType => <Button key={`item-type-area-button-${uuidv4()}`} className="product-list-item__toggle" variant="contained" disabled={itemType === activeItemType} sx={{
            height: '2.08vw',
            backgroundColor: '#1ea4ce',
            fontFamily: 'Open Sans',
            fontWeight: '600',
            fontSize: '12px',
            textTransform: 'none',
            marginRight: '0.5vw'
        }}
            onClick={() => selectItemType(itemType)}>
            {itemType}
        </Button>)}
    </div>
};

const mapStateToProps = (state: AppState) => {
    return {
        itemTypesState: state.itemTypes,
        activeItemType: state.filters.itemType
    }
}

export default connect(mapStateToProps, null)(ItemTypeArea);