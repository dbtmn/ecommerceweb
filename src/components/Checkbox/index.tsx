import React from "react";
import classnames from "classnames";

import "./index.scss";

interface CheckBoxProps {
    className?: string;
    label: string;
    value: boolean | undefined;
    isDisabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = (props) => {
    const { className = '', label, value, isDisabled = false, onChange } = props;

    const checkboxClassnames = classnames("checkbox-wrapper", className, {
        "disabled": isDisabled
    });

    return (
        <div className={checkboxClassnames}>
            <label>
                <input type="checkbox" disabled={isDisabled} checked={value} onChange={onChange} />
                <span className="checkbox-text">{label}</span>
            </label>
        </div>
    );
}

export default CheckBox;