import React from 'react';
import $ from 'jquery'
import Filter from "./filter";

/*Styles*/
import {css_module_classes} from "../../lib/utils";
import styles from './filter_ghost.css'

let filter_ghost_class = css_module_classes(true, styles, "filter_ghost");

export function hide_all_filters(except=null){

    let filter_ghosts = $("." + filter_ghost_class);
    filter_ghosts.each((key, value) => {
        if(null !== except){
            let this_ghost = $(value);
            // console.log(this_ghost);
            // console.log(except);
            let except_ghost = $(except).find("." + filter_ghost_class)
            // console.log(except_ghost);

            if(this_ghost === except_ghost) {
                // console.log(true);
                return;
            }
        }

        try {
            if ($(value).css("display") !== "none")
                $(value).hide(100);
        }
        catch (err) {
            console.log(err);
        }
    })
}

export function toggle_filter(e) {
    // console.log(e.currentTarget);

    hide_all_filters(e.currentTarget);

    let filter_ghost = $(e.currentTarget).find("." + filter_ghost_class);
    if (filter_ghost.css("display") === "none") {
        setTimeout(function () {
            filter_ghost.show(100);
        }, 100);
    }
    else {
        // filter_ghost.hide(100);
    }

    e.stopPropagation();
}

export function FilterGhost(props) {
    $(window).click(function (e) {
        // console.log(e.currentTarget);
        hide_all_filters();
    });

    return (<div className={filter_ghost_class}>
        <Filter title={props.title}
                options={props.options}
                on_options_updated={
                    function (options) {
                        props.callback(options);
                    }
                }/>
    </div>);
}
