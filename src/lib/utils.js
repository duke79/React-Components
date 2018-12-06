import openSocket from "socket.io-client";
import JSON5 from 'json5'

export function parse_uri(str) {
    // http://blog.stevenlevithan.com/archives/parseuri

    let options = {
        strictMode: false,
        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };

    let o = options,
        m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    uri.path_parts = uri.path.split("/").filter(Boolean);

    return uri;
}

export function load_script_dynamically(url) {
    let addScript = document.createElement('script');
    addScript.setAttribute('src', url);
    document.body.appendChild(addScript);
}


export function wait_for_element_to_exist(var_to_wait_for, callback) {
    if (typeof var_to_wait_for !== "undefined") {
        callback();
    }
    else {
        setTimeout(wait_for_element_to_exist, 250);
    }
}

export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function css_module_classes(ENABLED /*= true*/, style_obj, class_names) {
    let ret = "";

    if (true === ENABLED) {
        let classes = class_names.split(" ");
        classes.forEach((cls, idx) => {
            ret += style_obj[cls];
            if (idx < classes.length - 1)
                ret += " ";
        });
    }
    else {
        ret += class_names;
    }

    return ret;
}

export function websocket_fire({on_stdout = null, on_stderr = null, json_result = false, multiple_results = false}) {
    let websocket = openSocket(window.server + '/websocket');
    // let websocket = openSocket(window.server + '/websocket', {transports: ['websocket']});

    // websocket.on('connect', function (msg) {
    //     if (typeof(msg) !== 'undefined') {
    //         console.log(msg);
    //     }
    //     websocket.emit('fire', cmd);
    // });

    let idx_stdout = 0;
    let idx_stderr = 0;
    websocket.on('fireout', function (msg) {
        if (typeof(msg.stdout) !== 'undefined' && null !== on_stdout) {
            // console.log(msg.stdout);

            if (json_result === true) {
                try {
                    let obj = JSON5.parse(msg.stdout);
                    if (typeof(obj) !== 'undefined') {
                        on_stdout(obj, idx_stdout);
                        if (!multiple_results) {
                            websocket.disconnect();
                        }
                    }
                }
                catch (e) {
                    try {
                        let obj = JSON5.parse("{" + msg.stdout + "}");
                        if (typeof(obj) !== 'undefined') {
                            on_stdout(obj, idx_stdout);
                            if (!multiple_results) {
                                websocket.disconnect();
                            }
                        }
                    }
                    catch (e) {
                        try {
                            let obj = JSON5.parse("[" + msg.stdout + "]");
                            if (typeof(obj) !== 'undefined') {
                                on_stdout(obj, idx_stdout);
                                if (!multiple_results) {
                                    websocket.disconnect();
                                }
                            }
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                }
            }
            else {
                on_stdout(msg.stdout, idx_stdout);
            }
            // console.log("fireout: " + msg.stdout);
            idx_stdout = idx_stdout + 1;
        }
        if (typeof(msg.stderr) !== 'undefined' && null !== on_stderr) {
            on_stderr(msg.stderr, idx_stderr);

            // console.log("fireout: " + msg.stderr);
            idx_stderr = idx_stderr + 1;
        }
    });

    return websocket;
}
