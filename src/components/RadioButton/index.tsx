import React from "react";
import classnames from "classnames";

import "./index.scss";

interface RadioButtonProps {
    radioGroupClassName?: string;
    id: string;
    name: string;
    label: string;
    value: string;
    isChecked: boolean;
    disabled?: boolean;
    onChange: (value: string) => void;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = (props) => {
    const { radioGroupClassName = '', id, isChecked, name, label, value, disabled = false, onChange } = props;

    const radioButtonClassnames = classnames("radio-button-wrapper", radioGroupClassName, {
        "disabled": disabled
    });

    return (
        <div className={radioButtonClassnames}>
            <label>
                <input id={id} type="radio" checked={isChecked} disabled={disabled} value={value} onChange={() => onChange(name)} />
                <span className="radio-button-text">{label}</span>
            </label>
        </div>
    );
}

export default RadioButton;