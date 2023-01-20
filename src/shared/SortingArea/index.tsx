import React, { useState } from 'react';
import { connect } from "react-redux";

import { setOrder, setActivePage } from "../../store/filters/actions";
import { fetchItemsByFilter } from "../../store/items/actions";
import { SortType, OrderType } from "../../store/filters/types";
import AreaTitle from "../../components/AreaTitle";
import RadioButtonGroup from "../../components/RadioButtonGroup";

import './index.scss';

// props from connect mapDispatchToProps
interface DispatchProps {
    fetchItemsByFilter: () => Promise<void>;
    setActivePage: (activePage: number) => void;
    setOrder: (sortType: SortType, orderType: OrderType) => void;
}

const sortingItems = [
    { name: 'lowToHigh', label: 'Price low to high' },
    { name: 'highToLow', label: 'Price high to low' },
    { name: 'newToOld', label: 'New to old' },
    { name: 'oldToNew', label: 'Old to new' },
];

const SortingArea: React.FunctionComponent<DispatchProps> = (props) => {
    const { setActivePage, setOrder, fetchItemsByFilter } = props;
    const [activeValue, setActiveValue] = useState(sortingItems[0].name);

    const handleChange = (sortValue: string) => {

        if ([sortingItems[0].name, sortingItems[1].name].includes(sortValue)) {
            clickPrice(sortValue);
        }
        if ([sortingItems[2].name, sortingItems[3].name].includes(sortValue)) {
            clickDate(sortValue);
        }
        setActiveValue(sortValue);
    };

    const clickPrice = (clickValue: string) => {
        const sortType: OrderType = clickValue === sortingItems[0].name ? OrderType.asc : OrderType.desc;
        handleSortingByPrice(sortType);
    };

    const clickDate = (clickValue: string) => {
        const sortType: OrderType = clickValue === sortingItems[2].name ? OrderType.asc : OrderType.desc;
        handleSortingByDate(sortType);
    }

    const handleSortingByDate = (orderType: OrderType) => {
        setActivePage(1);
        setOrder(SortType.added, orderType);
        fetchItemsByFilter();
    };

    const handleSortingByPrice = (orderType: OrderType) => {
        setActivePage(1);
        setOrder(SortType.price, orderType);
        fetchItemsByFilter();
    }

    return (
        <>
            <AreaTitle>Sorting</AreaTitle>
            <RadioButtonGroup
                radioGroupClassName="sorting-area__radio-group"
                selected={activeValue}
                options={sortingItems}
                onChange={(sortValue: string) => handleChange(sortValue)}
            />
        </>);

};

const mapDispatchToProps = {
    fetchItemsByFilter,
    setActivePage,
    setOrder,
};

export default connect(null, mapDispatchToProps)(SortingArea);