import {css_module_classes, guid} from "../../lib/utils";
import React from "react";
// import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {Tabs as WebTabs, Tab, TabList, TabPanel} from 'react-web-tabs';
import '../../../node_modules/react-web-tabs/dist/react-web-tabs.css';
import styles from "./tabs.css";

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab_uid: guid()
        }
    }

    render() {
        // console.log(this.props);

        return (
            <div className={this.props.className}>
                <WebTabs
                    defaultTab={"tab_" + this.state.tab_uid + 0}
                    vertical={this.props.vertical}>
                    <TabList className={css_module_classes(true, styles, "tab_list")}>
                        {
                            this.props.tabs.map((tab, idx) => {
                                return <Tab tabFor={"tab_" + this.state.tab_uid + idx}>{tab.title}</Tab>
                            })
                        }
                    </TabList>
                    {
                        this.props.tabs.map((tab, idx) => {
                            return <TabPanel tabId={"tab_" + this.state.tab_uid + idx}>
                                {tab.data}
                            </TabPanel>
                        })
                    }
                </WebTabs>
            </div>
        );
    }
}

Tabs.defaultProps = {
    vertical: false,
    tabs: [
        {
            title: "Title 1",
            data: "Tab 1 Content"
        },
        {
            title: "Title 2",
            data: "Tab 2 Content"
        },
        {
            title: "Title 3",
            data: "Tab 3 Content"
        }
    ]
};
