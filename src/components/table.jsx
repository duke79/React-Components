import React from 'react';

import styles from './table.css'
import {css_module_classes} from '../../lib/utils'
import bootstrap_styles from '../../lib/bootstrap/css/bootstrap.min.css';
import fa_styles from '../../lib/font-awesome/css/font-awesome.min.css';

class Table extends React.Component {
    title() {
        return (
            <div className={css_module_classes(true, bootstrap_styles, "col col-12") + " " + css_module_classes(true, styles,"col")}>
                {this.props.title}
            </div>
        )
    }

    primary_buttons() {
        let buttons = [];
        this.props.primary_buttons.forEach((element, idx) => {
            buttons.push(
                <button key={idx} type="button"
                        className={css_module_classes(true, bootstrap_styles, "btn btn-sm btn-primary btn-create")}>{element}</button>
            )
        });


        return (
            <div className={css_module_classes(true, bootstrap_styles, "col col-12 text-right") + " " + css_module_classes(true, styles,"col")}>
                {buttons}
            </div>
        )
    }

    header() {

        if (this.props.header.length != 0) {
            let columns = [];
            this.props.header.forEach((element, idx) => {
                columns.push(
                    <th key={idx}>{element}</th>
                )
            });

            return (
                <thead>
                <tr>
                    {/* <th><em className={css_module_classes(true, fa_styles ,"fa fa-cog")}></em></th>
                     <th className="d-none d-sm-block">ID</th>
                     <th>Name</th>
                     <th>Email</th> */}
                    {columns}
                </tr>
                </thead>
            );
        }
        else {
            return (<thead></thead>)
        }
    }

    rows() {
        if (this.props.header.length != 0) {
            let rows = [];
            this.props.rows.forEach((row, idx) => {
                let columns = [];
                row.forEach((element, idx_td) => {
                    columns.push(
                        <td key={idx_td}>{element}</td>
                    );
                });

                rows.push(
                    <tr key={idx}>{columns}</tr>
                )
            });

            return (
                <tbody>

                {rows}

                </tbody>
            );
        }
        else {
            return (<tbody></tbody>)
        }
    }

    footer() {

        if (this.props.footer != "") {
            return (
                this.props.footer
            );
        }
        else {
            return (<div></div>)
        }
    }


    render() {
        return (
            <div>
                <div className={css_module_classes(true, bootstrap_styles, "card") + " " + css_module_classes(true, styles,"card-default card-table")}>
                    <div className={css_module_classes(true, bootstrap_styles, "card-header") + " "+ css_module_classes(true, styles,"card-header")}>
                        <div className={css_module_classes(true, bootstrap_styles, "row")}>
                            {this.title()}
                            {this.primary_buttons()}
                        </div>
                    </div>
                    <div className={css_module_classes(true, bootstrap_styles, "card-body") + " " + css_module_classes(true, styles,"card-body")}>
                        <table
                            className={css_module_classes(true, bootstrap_styles, "table table-striped table-bordered") + " " + css_module_classes(true, styles,"table-bordered")}>
                            {this.header()}
                            {this.rows()}
                        </table>

                    </div>
                    <div className={css_module_classes(true, bootstrap_styles, "card-footer") + " " + css_module_classes(true, styles,"card-footer")}>
                        {this.footer()}
                    </div>
                </div>
            </div>
        );
    }
}

Table.defaultProps = {
    title: "DevAssist",
    primary_buttons: [
        "CreateNew",
        "Delete",
        "Modify"
    ],
    header: [React.createElement('em', {className: css_module_classes(true, fa_styles, 'fa fa-cog')}), "ID", "Name", "Email"],
    rows: [
        [
            <td align="center">
                <a className={css_module_classes(true, bootstrap_styles, "btn btn-secondary")}>
                    <em className={css_module_classes(true, fa_styles, "fa fa-pencil")}/>
                </a>
                <a className={css_module_classes(true, bootstrap_styles, "btn btn-danger")}>
                    <em className={css_module_classes(true, fa_styles, "fa fa-trash")}/>
                </a>
            </td>,
            "1",
            "Joe",
            "joe@mai.com"
        ],
    ],
    footer: <div className={css_module_classes(true, bootstrap_styles, "row")}>
        <div className={css_module_classes(true, bootstrap_styles, "col col-4") + " " + css_module_classes(true, styles,"col")}>
            Page 1 of 5
        </div>
        <div className={css_module_classes(true, bootstrap_styles, "col col-8") + " " + css_module_classes(true, styles,"col")}>
            <ul className={css_module_classes(true, bootstrap_styles, "pagination d-none d-sm-block float-right") + " " + css_module_classes(true, styles,"pagination")}>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
            </ul>
            <ul className={css_module_classes(true, bootstrap_styles, "pagination d-block d-sm-none float-right") + " " + css_module_classes(true, styles,"pagination")}>
                <li><a href="#">«</a></li>
                <li><a href="#">»</a></li>
            </ul>
        </div>
    </div>
};

export default Table;
