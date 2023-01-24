import React from "react";

import "./index.scss";

interface AreaTitleProps {
    className?: string;
    children: string;
}

const AreaTitle: React.FunctionComponent<AreaTitleProps> = (props) => {
    const { className = '', children } = props;

    return <h1 className={`area-title fw-6 ${className}`}>
        {children}
    </h1>
}

export default AreaTitle;