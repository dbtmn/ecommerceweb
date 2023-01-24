import React from "react";

const NoContent: React.FunctionComponent = () => {
    return <div className="product-list__no-content fw-4">
        <span className="material-icons product-list__result-icon">
            {"search_off"}
        </span>
        <div>
            Sorry! No result found :(
        </div>
    </div>
};

export default NoContent;