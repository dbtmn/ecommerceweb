import React, { useState } from 'react';
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import TextField from '@mui/material/TextField';
import AreaTitle from "../../components/AreaTitle";
import Checkbox from "../../components/Checkbox";
import Error, { ErrorSize } from "../../shared/Error";
import Loading from "../../shared/Loading";

import { Company, CompanyState } from "../../store/companies/types";
import { fetchItemsByFilter } from "../../store/items/actions";
import { setBrand, setActivePage, deleteBrand, clearBrand } from "../../store/filters/actions";

import "./index.scss";

// props from connect mapDispatchToProps
interface DispatchProps {
    fetchItemsByFilter: () => Promise<void>;
    deleteBrand: (brand: string) => void;
    setActivePage: (activePage: number) => void;
    setBrand: (brand: string) => void;
    clearBrand: () => void;
}

// props from connect mapStateToProps
interface StateProps {
    companiesState: CompanyState;
}

const BrandArea: React.FunctionComponent<DispatchProps & StateProps> = (props) => {
    const { companiesState, fetchItemsByFilter, deleteBrand, setActivePage, setBrand, clearBrand } = props;
    const { companies: brands, pending: isCompaniesPending, error: isCompaniesError } = companiesState;

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [searchedBrands, setSearchedBrands] = useState<Company[]>([]);

    const handleSelectedBrands = (brand: string) => {
        const isSelectedBrand = selectedBrands.includes(brand);

        if (!isSelectedBrand) {
            setSelectedBrands([...selectedBrands, brand]);
            handleSortingByBrand(brand);
        } else {
            const indexBrand = selectedBrands.indexOf(brand);
            selectedBrands.splice(indexBrand, 1);

            const copySelectedBrands = selectedBrands;
            setSelectedBrands([...copySelectedBrands]);
            handleRemovalBrand(brand);
        }
    };

    const handleSearchBrands = (searchText: string) => {
        const results = brands.filter(brand => {
            return brand.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        });
        setSearchedBrands(results);
    }

    const handleRemovalBrand = (companySlug: string) => {
        setActivePage(1);
        deleteBrand(companySlug);
        fetchItemsByFilter();
    };

    const handleSortingByBrand = (companySlug: string) => {
        setActivePage(1);
        setBrand(companySlug);
        fetchItemsByFilter();
    };

    const resetBrands = () => {
        setSelectedBrands([]);
        clearBrand();
        fetchItemsByFilter();
    }

    return <>
        <AreaTitle>Brands</AreaTitle>
        <div className="brand-area__wrapper">
            {isCompaniesPending && <Loading />}
            {isCompaniesError && <Error size={ErrorSize.lg} />}
            {brands.length > 0 && !isCompaniesPending &&
                <div className="brand-area__checkbox-group">
                    <TextField sx={{
                        marginTop: "1.6vw",
                        marginBottom: "0.8vw"
                    }}
                        id="outlined-basic"
                        variant="outlined" size="small"
                        placeholder="Search brand"
                        onChange={(e) => handleSearchBrands(e.target.value)} />
                    <div className={`brand-area__clear-wrapper ${selectedBrands.length > 0 ? "clickable" : "disabled"}`}
                        onClick={resetBrands}>
                        <span className="material-icons brand-area__clear-icon">
                            {"clear"}
                        </span>
                        <div className="brand-area__clear-text">
                            Clear
                        </div>
                    </div>
                    <div className="brand-area__checkbox-wrapper">
                        {(searchedBrands.length > 0 ? searchedBrands : brands).map((brand, index) =>
                            <Checkbox
                                key={`brand-area__checkbox-${index}`}
                                onChange={() => handleSelectedBrands(brand.slug)}
                                label={brand.name}
                                value={selectedBrands.includes(brand.slug)} />
                        )}
                    </div>
                </div>}
        </div>
    </>
}


const mapStateToProps = (state: AppState) => {
    return {
        companiesState: state.companies,
    }
}

const mapDispatchToProps = {
    fetchItemsByFilter,
    deleteBrand,
    setActivePage,
    setBrand,
    clearBrand
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandArea);