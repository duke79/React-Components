import React from 'react';
import styles from './timeline.css'
import {css_module_classes} from '../../lib/utils'

class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4>{this.props.title}</h4>
                <ul className={css_module_classes(true, styles, "timeline")}>
                    {this.props.events.map((elem, idx) => {
                        return <li key={idx}>{elem}</li>
                    })}
                </ul>
            </div>
        );
    }
}

Timeline.defaultProps = {
    title: "Latest News",
    events: [
        <div>
            <a target="_blank" href="https://www.totoprayogo.com/#">New Web Design</a>
            <a href="#" className={css_module_classes(true, styles, "date")}>21 March, 2014</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et
                elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales
                vehicula....</p>
        </div>,
        <div>
            <a href="#">21 000 Job Seekers</a>
            <a href="#" className={css_module_classes(true, styles, "date")}>4 March, 2014</a>
            <p>Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque
                felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
        </div>,
        <div>
            <a href="#">Awesome Employers</a>
            <a href="#" className={css_module_classes(true, styles, "date")}>1 April, 2014</a>
            <p>Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed nulla odio, tincidunt
                vitae nunc vitae, mollis pharetra velit. Sed nec tempor nibh...</p>
        </div>
    ]
};

export default Timeline;
