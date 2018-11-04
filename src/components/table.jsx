/**
 * Created by c6z on 01/11/2018.
 */

class Table extends React.Component {
    title() {
        return (
            <div className="col col-xs-12">
                <h3 className="panel-title">{this.props.title}</h3>
            </div>
        )
    }

    primary_buttons() {
        let buttons = [];
        this.props.primary_buttons.forEach(element => {
            buttons.push(
                <button type="button" className="btn btn-sm btn-primary btn-create">{element}</button>
            )
        });


        return (
            <div className="col col-xs-6 text-right">
                {buttons}
            </div>
        )
    }

    header() {

        if (this.props.header.length != 0) {
            let columns = [];
            this.props.header.forEach(element => {
                columns.push(
                    <th>{element}</th>
                )
            });

            return (
                <thead>
                    <tr>
                        {/* <th><em className="fa fa-cog"></em></th>
                        <th className="hidden-xs">ID</th>
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
            this.props.rows.forEach(row => {
                let columns = [];
                row.forEach(element => {
                    columns.push(
                        <td>{element}</td>
                    );
                });

                rows.push(
                    <tr>{columns}</tr>
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
                <div className="panel panel-default panel-table">
                    <div className="panel-heading">
                        <div className="row">
                            {this.title()}
                            {this.primary_buttons()}
                        </div>
                    </div>
                    <div className="panel-body">
                        <table className="table table-striped table-bordered table-list">
                            {this.header()}
                            {this.rows()}
                        </table>

                    </div>
                    <div className="panel-footer">
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
    ],
    header: [React.createElement('em', { className: 'fa fa-cog' }), "ID", "Name", "Email"],
    rows: [
        [
            <td align="center">
                <a className="btn btn-default"><em className="fa fa-pencil"></em></a>
                <a className="btn btn-danger"><em className="fa fa-trash"></em></a>
            </td>,
            "1",
            "Joe",
            "joe@mai.com"
        ],
    ],
    footer: <div className="row">
        <div className="col col-xs-4">Page 1 of 5
            </div>
        <div className="col col-xs-8">
            <ul className="pagination hidden-xs pull-right">
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
            </ul>
            <ul className="pagination visible-xs pull-right">
                <li><a href="#">«</a></li>
                <li><a href="#">»</a></li>
            </ul>
        </div>
    </div>
};
