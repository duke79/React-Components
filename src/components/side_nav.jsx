/**
 * Created by c6z on 10/5/2018.
 */

class MySideNav extends React.Component {
    state = {};

    componentDidMount() {
        // let path_name = window.location.pathname;
        let path_name = window.location.href.substr(window.location.origin.length);
        // console.log(path_name);
        let selector_active_item = "[href='" + path_name + "']";
        let active_item = $(selector_active_item)[0];
        if (typeof (active_item) !== 'undefined') {
            active_item.classList.add("active");
        }

        let activeSubItem = $("." + "MySideNav_SubItem" + ".active");
        if (typeof (activeSubItem) !== 'undefined') {
            let subItemsContainer = activeSubItem.parent();
            subItemsContainer.show(100);

            let subMenuTitleCaretDown = subItemsContainer.parent().find("." + "MySideNav_CaretDown");
            subMenuTitleCaretDown.toggleClass("down");
        }

        $("." + "MySideNav_Brand" + ", ." + "MySideNav_SubItem" + ", ." + "MySideNav_Item" + ", ." + "MySideNav_Scrim").click(function () {
            this.hide();
        }.bind(this));
    }

    onSubMenuClick(e) {
        let subMenuItemsContainer = $(e.currentTarget).find("." + "MySideNav_SubItems_Container");
        let subMenuTitleCaretDown = $(e.currentTarget).find("." + "MySideNav_CaretDown");
        if ($(e.target).hasClass("MySideNav_SubTitle") || $(e.target).hasClass("MySideNav_CaretDown")) {
            if (subMenuItemsContainer.css("display") === "none")
            // subMenuItemsContainer.css("display", "block");
                subMenuItemsContainer.show(100);
            else
            // subMenuItemsContainer.css("display", "none");
                subMenuItemsContainer.hide(100);

            subMenuTitleCaretDown.toggleClass("down");
        }
    }

    display() {
        $("." + "MySideNav_Wrapper").removeClass("Hidden");
        $("." + "MySideNav_Scrim").removeClass("Hidden");
    }

    hide() {
        $("." + "MySideNav_Wrapper").addClass("Hidden");
        $("." + "MySideNav_Scrim").addClass("Hidden");
        this.props.onScrimClick();
    }

    getItems() {
        let elems = [];
        let header = "";
        let footer = "";
        let container_elems = [];

        if (typeof (this.props.menu.header) !== "undefined") {
            if (this.props.menu.header.link !== "") {
                elems.push(
                    <div className="MySideNav_Header">
                        <a href={this.props.menu.header.link}
                           className="MySideNav_Brand">{this.props.menu.header.value}</a>
                    </div>
                );
            }
            else {
                elems.push(
                    <div className="MySideNav_Header">
                        <div className="MySideNav_Brand">{this.props.menu.header.value}</div>
                    </div>
                );
            }
        }

        this.props.menu.container.forEach(element => {
            if (element.type === "item") {
                if (element.link !== "") {
                    container_elems.push(
                        <a href={element.link} className="MySideNav_Item">{element.value}</a>
                    );
                } else {
                    container_elems.push(
                        <div className="MySideNav_Item">{element.value}</div>
                    );
                }
            }
            if (element.type === "submenu") {
                let subMenuTitle = {};
                if (element.link !== "") {
                    subMenuTitle = <div className={"nav-text " + "MySideNav_SubTitle"}>{element.value}</div>
                } else {
                    subMenuTitle =
                        <div className={"nav-text " + "MySideNav_SubTitle"}>{element.value}
                            <i className={"fa" + " " + "fa-caret-down" + " " + "MySideNav_CaretDown" + " " + "rotate"}/>
                        </div>
                }

                let subelems = [];
                element.items.forEach(subitem => {
                    if (subitem.link !== "") {
                        subelems.push(
                            <a href={subitem.link}
                               className="MySideNav_SubItem">{subitem.value}</a>
                        );
                    } else {
                        subelems.push(
                            <div className="MySideNav_SubItem">{subitem.value}</div>
                        );
                    }
                });
                container_elems.push(<div className="MySideNav_SubMenu"
                                          onClick={((e) => this.onSubMenuClick(e))}>
                    {subMenuTitle}
                    <div className="MySideNav_SubItems_Container">
                        {subelems}
                    </div>
                </div>);
            }
        });

        elems.push(
            <div className="MySideNav_Container">
                {container_elems}
            </div>);

        if (typeof (this.props.menu.footer) !== "undefined") {
            if (this.props.menu.footer.link !== "") {
                elems.push(
                    <a href={this.props.menu.footer.link}
                       className="MySideNav_Footer">{this.props.menu.footer.value}</a>
                );
            } else {
                elems.push(
                    <div className="MySideNav_Footer">{this.props.menu.footer.value}</div>
                );
            }
        }

        return elems;
    }

    render() {
        // let encryptedAES = CryptoJS.AES.encrypt("something something merijaan", "hulala");
        // console.log(encryptedAES.toString());
        // console.log(encryptedAES.toString(CryptoJS.enc.Utf8));
        // let decryptedBytes = CryptoJS.AES.decrypt(encryptedAES, "hulala");
        // let plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
        // console.log(plaintext);

        // let urlParts = window.location.href.split("/");
        let items = this.getItems();

        return <div className={"MySideNav_Wrapper"}>
            <div className={"MySideNav_Scrim" + " " + "Hidden"}/>
            {items}
        </div>
    }
}

MySideNav.defaultProps = {
    menu: {
        header: {
            "type": "item",
            "value": "DevAssist",
            "link": "/"
        },
        container: [
            {
                "type": "item",
                "value": "Task Manager",
                "link": "/task_manager"
            },
            {
                "type": "submenu",
                "value": "Genaral Tools",
                "link": "",
                "items": [
                    {
                        "type": "subitem",
                        "value": "Spandan",
                        "link": "/iframe?src=http://intranetplp/spandan/default.aspx"
                    },
                    {
                        "type": "subitem",
                        "value": "IT Issue",
                        "link": "/iframe?src=https://peoplesupport.dsone.3ds.com/5.myit/"
                    },
                    {
                        "type": "subitem",
                        "value": "Phonebook",
                        "link": "/iframe?src=http://dsx/web/people/Home.aspx"
                    },
                    {
                        "type": "subitem",
                        "value": "Mail",
                        "link": "/iframe?src=https://webmail.ap.3ds.com/owa/"
                    },
                    // {
                    //     "type": "subitem",
                    //     "value": "Paysquare",
                    //     "link": "/iframe?src=https://mypayroll.paysquare.com/"
                    // },
                    {
                        "type": "subitem",
                        "value": "AMS",
                        "link": "/iframe?src=https://intranetplp/AMS/Home/HomePage"
                    },
                ]
            },
            {
                "type": "submenu",
                "value": "Tech Tools",
                "link": "",
                "items": [

                    {
                        "type": "subitem",
                        "value": "R&D Authoring",
                        "link": "/iframe?src=https://dsxdev-online.dsone.3ds.com/enovia/common/emxNavigator.jsp"
                    },
                    {
                        "type": "subitem",
                        "value": "Dsxplore",
                        "link": "/iframe?src=http://dsxplore.dsone.3ds.com/mashup-ui/page/index"
                    },
                    {
                        "type": "subitem",
                        "value": "Web Archi",
                        "link": "/iframe?src=http://webarchi/archicheck/index.html"
                    },
                    {
                        "type": "subitem",
                        "value": "CATIA Wiki",
                        "link": "/iframe?src=http://catiawikiplp:8080/CATIAWiki/index.php/Main_Page"
                    },
                    {
                        "type": "subitem",
                        "value": "Techno Wiki",
                        "link": "/iframe?src=http://wikitechno/wiki/index.php"
                    },
                    {
                        "type": "subitem",
                        "value": "ODT Impacts",
                        "link": "/iframe?src=http://odtweb2e/dashboard/TAReportImpactPage.aspx"
                    },
                    {
                        "type": "subitem",
                        "value": "DS File Transfer",
                        "link": "/iframe?src=https://filetransfer.dsone.3ds.com/Home.aspx"
                    },
                    {
                        "type": "subitem",
                        "value": "CAA V5 Encyclopedia",
                        "link": "/iframe?src=http://dsdoc/devdoc24/online/CAACenV5Default.htm"
                    },
                    {
                        "type": "subitem",
                        "value": "Rider",
                        "link": "/iframe?src=http://dsscen/"
                    },
                    //{
                    //    "type": "subitem",
                    //    "value": "BI Launch Pad",
                    //    "link": "/iframe?src=https://mydsxbi.dsone.3ds.com/BOE/BI"
                    //},
                ]
            },
            {
                "type": "item",
                "value": "String Processor",
                "link": "/string_processor"
            },
            {
                "type": "item",
                "value": "Incident Report",
                "link": "/incident_report"
            },
            {
                "type": "item",
                "value": "Chat",
                "link": "/chat"
            },
        ],
        footer: {
            "type": "item",
            // "value": CryptoJS.AES.decrypt("U2FsdGVkX1+SDWhpQccakoSDb8/F8AUbYADENoAbXto4v/q3kYP4FK78oJ0AkCe0XzVYzLEGBqPcHReOYfllkw==", "hulala").toString(CryptoJS.enc.Utf8),
            "value": "Contact us",
            // "link": "mailto:List_custom_3DP_DevAssist@3ds.com?Subject=DevAssist%20%7C%20Reporting%20Bug&body=Hello%20DevAssist%20team,"
            "link": "mailto:List_custom_3DP_DevAssist@3ds.com"
        },
    }
};

class Page extends React.Component {
    render() {
        return (
            <div>
                <MySideNav/>
            </div>
        );
    }
}
ReactDOM.render(
    <Page />,
    document.getElementById('top_side')
);
