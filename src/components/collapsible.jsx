import $ from "jquery";
import {css_module_classes} from "../../lib/utils";
import styles from "./collapsible.css";
import * as React from "react";

export function toggle_collapse(selector) {
    // $("#ir_description")
    $(selector).toggleClass(css_module_classes(true, styles, "show"));
    $(selector).toggleClass(css_module_classes(true, styles, "collapse"));
}

class Collapsible extends React.Component {
    render() {
        // console.log(this.props.className);
        return (
            <div id={this.props.id}
                 className={this.props.className + " " + css_module_classes(true, styles, "collapse")}>
                {this.props.children}
            </div>
        );
    }
}

export default Collapsible;
