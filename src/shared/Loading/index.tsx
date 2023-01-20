import React from "react";

import "./index.scss";

const Loading: React.FunctionComponent = () => {

    return <div className="loading__wrapper">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>;
};

export default Loading;