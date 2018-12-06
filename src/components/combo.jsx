import React from 'react';
// import styles from './combo.css'
import $ from 'jquery'
import {guid} from '../../lib/utils'
// import Select2 from 'react-select2-wrapper';
// import chroma from 'chroma-js';
import 'react-select2-wrapper/css/select2.css';
import Select from 'react-select'

class Combo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: guid()
        }
    }

    render() {
        return (
            <Select
                label="Single select"
                options={this.props.options.map((item) => {
                    return {value: item, label: item}
                })}
                onChange={(value) => {
                    console.log(value);
                }}
                // onSelect={(e) => {
                //     console.log($(e.currentTarget).find(':selected').text());
                // }}
            />

        );
    }

    componentDidMount() {
        // $("#combo_" + this.state.uid).select2({
        //     theme: "bootstrap"
        // });

        // let select_obj = $("#combo_" + this.state.uid);
        // select_obj.select2()
        //     .on('change', function (e) {
        //         this.props.onChange($(e.currentTarget).find(':selected').text());
        //     }.bind(this))
        //     .on('select', function (e) {
        //         this.props.onSelect($(e.currentTarget).find(':selected').text())
        //     }.bind(this));
        // // .on('select2-loaded', function (e) {
        // //     this.props.onChange($(e.currentTarget).find(':selected').text());
        // // }.bind(this));
        //
        // setTimeout(() => {
        //     this.props.onChange(select_obj.find(':selected').text());
        // }, 1000);
    }
}

Combo.defaultProps = {
    options: [
        "Option 1",
        "Longer option 2",
        "Even longer option 3"
    ],
    onChange: (option) => {
        console.log(option);
    },
    onSelect: (option) => {
        console.log(option);
    },
};

export default Combo;
