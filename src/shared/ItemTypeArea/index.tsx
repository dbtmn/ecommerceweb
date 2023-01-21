import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import Button from "@mui/material/Button";
import Error, { ErrorSize } from "../../shared/Error";
import Loading from "../../shared/Loading";
import { setItemType, setActivePage, deleteItemType } from "../../store/filters/actions";
import { fetchItemsByFilter } from "../../store/items/actions";
import { ItemTypesState } from "../../store/item-types/types";

import "./index.scss";

// props from connect mapStateToProps
interface StateProps {
    activeItemTypes: string[];
    itemTypesState: ItemTypesState;
    fetchItemsByFilter: () => Promise<void>;
    setActivePage: (activePage: number) => void;
    setItemType: (itemType: string) => void;
    deleteItemType: (itemType: string) => void;
}

const ItemTypeArea: React.FunctionComponent<StateProps> = (props) => {
    const { itemTypesState, activeItemTypes, fetchItemsByFilter, setActivePage, setItemType, deleteItemType } = props;
    const { itemTypes, pending: isItemTypesPending, error: isItemTypesError } = itemTypesState;

    const [selectedItemTypes, setSelectedItemTypes] = useState<string[]>([]);

    const handleSelectedItemType = (itemType: string) => {
        const isSelectedItemType = selectedItemTypes.includes(itemType);

        if (!isSelectedItemType) {
            setSelectedItemTypes([...selectedItemTypes, itemType]);

            setActivePage(1);
            setItemType(itemType);
            fetchItemsByFilter();
        } else {
            const indexItemType = selectedItemTypes.indexOf(itemType);
            selectedItemTypes.splice(indexItemType, 1);

            const copyItemTypes = selectedItemTypes;
            setSelectedItemTypes([...copyItemTypes]);

            setActivePage(1);
            deleteItemType(itemType);
            fetchItemsByFilter();
        }
    }

    const setItemColour = (itemType: string) => {
        return activeItemTypes.includes(itemType) ? '#1ea4ce' : '#c4c4c4';
    }

    return <div className="item-type-area__wrapper">
        {isItemTypesError && <Error size={ErrorSize.lg} />}
        {isItemTypesPending && <Loading />}
        {itemTypes.length > 0 && itemTypes.map(itemType =>
            <Button key={`item-type-area-button-${uuidv4()}`} className="product-list-item__toggle" variant="contained" sx={{
                height: '2.08vw',
                backgroundColor: `${setItemColour(itemType)}`,
                fontFamily: 'Open Sans',
                fontWeight: '600',
                fontSize: '12px',
                textTransform: 'none',
                marginRight: '0.5vw'
            }}
                onClick={() => handleSelectedItemType(itemType)}>
                {itemType}
            </Button>)}
    </div>
};

const mapStateToProps = (state: AppState) => {
    return {
        itemTypesState: state.itemTypes,
        activeItemTypes: state.filters.itemType
    }
}

const mapDispatchToProps = {
    fetchItemsByFilter,
    setActivePage,
    setItemType,
    deleteItemType
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemTypeArea);