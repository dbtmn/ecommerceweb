import React from "react";

import RadioButton from "../RadioButton";

interface RadioButtonOption {
    name: string;
    label: string;
    disabled?: boolean;
}

interface RadioButtonGroupProps {
    radioGroupClassName?: string;
    selected: string;
    options: RadioButtonOption[];
    onChange: (value: string) => void;
}

const RadioButtonGroup: React.FunctionComponent<RadioButtonGroupProps> = (props) => {
    const { radioGroupClassName = "", selected, options, onChange }: RadioButtonGroupProps = props;

    function renderOptions() {
        return options.map(({ name, label, disabled }: RadioButtonOption, index) => {
            const optionId = `radio-option-${name}`;

            return (
                <RadioButton
                    key={optionId}
                    id={optionId}
                    label={label}
                    value={label}
                    name={name}
                    isChecked={name === selected}
                    disabled={disabled}
                    onChange={onChange}
                />
            );
        });
    }

    return (
        <div className={`radio-button-group ${radioGroupClassName}`}>
            {renderOptions()}
        </div>
    );
};
export default RadioButtonGroup;