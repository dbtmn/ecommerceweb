import React from "react";

import "./index.scss";

export enum ErrorSize {
    sm = "small",
    md = "medium",
    lg = "large"
}

interface ErrorProps {
    size?: ErrorSize
}

const Error: React.FunctionComponent<ErrorProps> = (props) => {
    const { size = ErrorSize.sm } = props;

    const getClassName = () => `material-icons error-icon error-icon--${size}`;

    return <div className="error__wrapper">
        <span className={getClassName()}>
            error
        </span>
        <div>There is an error!</div>
    </div>;
}

export default Error;