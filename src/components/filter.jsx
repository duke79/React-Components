/**
 * Created by c6z on 11/2/2018.
 */


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
        // console.log(this.props.options);
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
            <input className="searchbar"
                   value={this.state.query}
                   onChange={this.on_query_updated}/>
        ];
    }

    highlight_characters(target, substr) {
        if (substr.length == 0)
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
                    <span className="highlighted_character">{char}</span>
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
                    icon = <i className="fa fa-check option_icon"/>;
                    option_classes += " checked"
                }

                if (option_key.toLowerCase().includes(this.state.query.toLowerCase())) {
                    rows.push([
                        <div className={option_classes}
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
        return <div className="filter_footer">
            {/*<a className="btn btn-danger footer_btn"*/}
               {/*onClick={() => this.on_apply_all(false)}>*/}
                {/*clear all*/}
            {/*</a>*/}
            <a className="btn btn-primary footer_btn"
               onClick={() => this.on_apply_all(true)}>
                select all
            </a>
            <a className="btn btn-info footer_btn"
               onClick={() => this.on_invert_selection()}>
                invert selection
            </a>
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
    title: <div className="title"><b>Filter</b></div>,
    primary_buttons: [],
    options: {
        "Row1": true,
        "Row2": false
    },
    on_options_updated: null,
};
