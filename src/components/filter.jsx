import React from 'react';
import $ from 'jquery'
import Table from '../Table/table'
import styles from './filter.css'
import fa_styles from '../../lib/font-awesome/css/font-awesome.min.css';
import bootstrap_styles from '../../lib/bootstrap/css/bootstrap.min.css';
import {css_module_classes} from "../../lib/utils";


class Filter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: ""
        };

        this.on_option_clicked = this.on_option_clicked.bind(this);
        this.on_query_updated = this.on_query_updated.bind(this);
    }

    on_option_clicked(e) {
        console.log(this.props.options);
        let options = {};
        Object.keys(this.props.options).forEach(option_key => {
            let option_val = this.props.options[option_key];
            if ($(e.currentTarget).text() === option_key) {
                options[option_key] = !option_val;
                // console.log("clicked me");
            }
            else {
                options[option_key] = option_val;
                // console.log("i'm just here");
            }
        });
        // console.log(options);
        if (this.props.on_options_updated) {
            this.props.on_options_updated(options);
        }
        else {
            console.log("Default callback. Updated filter -");
            console.log(options);
        }
    }

    on_apply_all(value) {
        let options = {};
        Object.keys(this.props.options).forEach(option_key => {
            options[option_key] = value;
        });
        if (this.props.on_options_updated) {
            this.props.on_options_updated(options);
        }
        else {
            console.log("Default callback. Updated filter -");
            console.log(options);
        }
    }

    on_invert_selection() {
        let options = {};
        Object.keys(this.props.options).forEach(option_key => {
            options[option_key] = !this.props.options[option_key];
        });
        if (this.props.on_options_updated) {
            this.props.on_options_updated(options);
        }
        else {
            console.log("Default callback. Updated filter -");
            console.log(options);
        }
    }

    on_query_updated(e) {
        this.state.query = e.currentTarget.value;
        this.forceUpdate();
    }

    Header() {
        return [
            <input className={css_module_classes(true, styles, "searchbar")}
                   value={this.state.query}
                   onChange={this.on_query_updated}/>
        ];
    }

    highlight_characters(target, substr) {
        if (substr.length === 0)
            return target;

        let ret = [];

        // let regexp = /2/g;
        let regexp = new RegExp(substr, 'gi');
        let match, matches = [];

        while ((match = regexp.exec(target)) != null) {
            matches.push(match.index);
        }

        // console.log(matches);

        target.split("").forEach(function (char, index) {
            let b_highlight = false;
            // console.log(index);
            // console.log(matches[0]);
            // console.log(substr.length);
            matches.forEach(match => {
                if (index >= match && index < match + substr.length) {
                    b_highlight = true;
                }
            });

            if (b_highlight) {
                ret.push(
                    <span className={css_module_classes(true, styles, "highlighted_character")}>{char}</span>
                );
            }
            else {
                // console.log("normal");
                ret.push(
                    <span>{char}</span>
                );
            }

        });
        return ret;
    }


    Rows() {
        let _this = this;
        let rows = [];

        let sorted_keys = [];
        for (let key in this.props.options) {
            sorted_keys[sorted_keys.length] = key;
        }
        sorted_keys.sort();

        sorted_keys.forEach(function (option_key) {
                let option_val = this.props.options[option_key];
                let option_classes = "option";
                let icon = <div/>;
                if (option_val === true) {
                    icon = <i className={css_module_classes(true, fa_styles, "fa fa-check") + " " + css_module_classes(true, styles, "option_icon")}/>;
                    option_classes += " checked"
                }

                if (option_key.toLowerCase().includes(this.state.query.toLowerCase())) {
                    rows.push([
                        <div className={css_module_classes(true, styles, option_classes)}
                             onClick={_this.on_option_clicked}>
                            {icon}
                            {this.highlight_characters(option_key, this.state.query)}
                        </div>
                    ])
                }
            }.bind(this)
        );
        return rows;
    }

    Footer() {
        return <div className={css_module_classes(true, styles, "filter_footer")}>
            {/*<a className={css_module_classes(true, styles, "btn btn-danger footer_btn")}*/}
            {/*onClick={() => this.on_apply_all(false)}>*/}
            {/*clear all*/}
            {/*</a>*/}
            <button className={css_module_classes(true, bootstrap_styles, "btn btn-primary") + " " + css_module_classes(true, styles, "footer_btn")}
               onClick={() => this.on_apply_all(true)}>
                select all
            </button>
            <button className={css_module_classes(true, bootstrap_styles, "btn btn-info") + " " + css_module_classes(true, styles, "footer_btn")}
               onClick={() => this.on_invert_selection()}>
                invert selection
            </button>
        </div>;
    }

    render() {
        return (
            <Table title={this.props.title}
                   primary_buttons={[]}
                   header={[
                       this.Header()
                   ]}
                   rows={this.Rows()}
                   footer={this.Footer()}/>
        );
    }
}

Filter.defaultProps = {
    title: <div className={css_module_classes(true, styles, "title")}><b>Filter</b></div>,
    primary_buttons: [],
    options: {
        "Row1": true,
        "Row2": false
    },
    on_options_updated: null,
};

export default Filter;
