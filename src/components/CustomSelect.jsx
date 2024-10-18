import React from 'react';
import { Select } from 'antd';

const CustomSelect = ({placeholder, options, chooseId, setChooseId, setIsLoading, width, setLabelValue}) => {
    const onChange = (value, obj) => {
        if(setIsLoading){
            setIsLoading(true);
            value ? setTimeout(() => setChooseId(value), 1000) : setTimeout(() => setChooseId(""), 1000)
        }
        else if(setLabelValue){
            setLabelValue(obj.label);
            setChooseId(value);
        }
    };

    return (
        <Select
            value={chooseId}
            style={{width: `${width}`}}
            showSearch
            allowClear
            size='large'
            placeholder={placeholder}
            optionFilterProp="label"
            onChange={onChange}
            options={options}
        />
    )
};
export default CustomSelect;