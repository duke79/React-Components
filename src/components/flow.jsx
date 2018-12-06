import React from 'react';

import styles from './flow.css'
import {css_module_classes, guid} from "../../lib/utils";
// import * as GitGraph from "gitgraph.js/packages/gitgraph-core/lib";
// import GitGraph from "gitgraph.js";
import "gitgraph.js";
import "gitgraph.js/build/gitgraph.css";

let gg = window.GitGraph; //https://github.com/nicoespeon/gitgraph.js/issues/195

class Flow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: guid(),
            detail_uuid: guid()
        }
    }

    render() {
        return (
            <div className={css_module_classes(true, styles, "flow_container") + `${ this.props.className}`}>
                <canvas id={"gitGraph_" + this.state.uuid}/>
                <div id={this.state.detail_uuid} className="gitgraph-detail">Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit.
                    Sint,
                    ducimus, qui fuga corporis veritatis doloribus iure nulla
                    optio dolores maiores dolorum ullam alias cum libero obcaecati cupiditate sit illo aperiam possimus
                    voluptatum similique
                    neque explicabo quibusdam aspernatur dolorem. Quod, corrupti magni explicabo nam sequi nesciunt
                    accusamus aliquam dolore!
                    Cumque, quam fugiat ab veritatis. Quia, maxime quas perferendis cupiditate explicabo at atque iusto
                    accusamus. Nesciunt
                    veniam quidem nemo doloribus! Dolore, cupiditate, adipisci, voluptate quam nihil ipsa placeat dolor
                    possimus minus quas
                    nostrum eaque in dicta autem eligendi rerum facilis nesciunt sunt doloremque suscipit enim iure
                    vitae eius voluptates
                    tempora tenetur hic.
                </div>
            </div>
        );
    }

    componentDidMount() {
        /***********************
         *  CUSTOM TEMPLATES   *
         ***********************/

        let myTemplateConfig = {
            colors: ["#F00", "#0F0", "#00F"], // branches colors, 1 per column
            branch: {
                lineWidth: 8,
                // Dash segments, see:
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
                lineDash: [5, 3],
                spacingX: 50
            },
            commit: {
                spacingY: -80,
                dot: {
                    size: 12,
                    lineDash: [4]
                },
                message: {
                    displayAuthor: true,
                    displayBranch: false,
                    displayHash: false,
                    font: "normal 12pt Arial"
                },
                shouldDisplayTooltipsInCompactMode: false, // default = true
                tooltipHTMLFormatter: function (commit) {
                    return "<b>" + commit.sha1 + "</b>" + ": " + commit.message;
                }
            }
        };
        let myTemplate = new gg.Template(myTemplateConfig);

        /***********************
         *    INITIALIZATION   *
         ***********************/

        let config = {
            template: "metro", // could be: "blackarrow" or "metro" or `myTemplate` (custom Template object)
            reverseArrow: false, // to make arrows point to ancestors, if displayed
            orientation: "vertical",
            elementId: 'gitGraph_' + this.state.uuid,
            // mode: "compact" // special compact mode: hide messages & compact graph
        };
        let gitGraph = new gg(config);

        /************************
         * BRANCHES AND COMMITS *
         ************************/

            // Create branch named "master"
        let master = gitGraph.branch("master");

        /***********************
         *       DETAILS       *
         ***********************/

        let commitWithDetailsConfig = {
            message: "A commit with detailed message",
            detailId: this.state.detail_uuid,
            messageDisplay: false,
            messageBranchDisplay: false,
            messageHashDisplay: false,
            messageAuthorDisplay: false,
        };
        gitGraph.commit(commitWithDetailsConfig).commit();

        // Commit on HEAD Branch which is "master"
        gitGraph.commit("Initial commit");

        // Add few commits on master
        gitGraph.commit("My second commit").commit("Add awesome feature");

        // Create a new "dev" branch from "master" with some custom configuration
        let dev = master.branch({
            name: "dev",
            color: "#F00",
            // lineDash: [5],
            commitDefaultOptions: {
                color: "#F00"
            }
        });
        dev.commit("Youhou \\o/");

        // Commit again on "master"
        master.commit("I'm the master !");

        // Advanced commit method with style and specific author (HEAD)
        let commitConfig = {
            dotColor: "white",
            dotSize: 10,
            dotStrokeWidth: 10,
            messageBranchDisplay: false,
            messageHashDisplay: false,
            messageAuthorDisplay: false,
            commitDotText: "C1",
            message: "Alors c'est qui le papa ?",
            tooltipDisplay: false,
            author: "Me <me@planee.fr>"
        };
        gitGraph.commit(commitConfig);

        // Create another from "master"
        let feature3 = master.branch("feature3");
        feature3.commit().commit();

        /***********************
         *      CHECKOUT       *
         ***********************/

        // Checkout to create "test" from "master" branch
        master.checkout();

        dev.commit().commit(); // 2 default commits on "dev"

        /***********************
         *    CUSTOMIZATION    *
         ***********************/

        gitGraph.author = "Fabien0102 <fabien0102@planee.fr>";
        master.commit();

        /***********************
         *       MERGES        *
         ***********************/

        master.checkout();

        // Merge "dev" branch into HEAD (which is "master"), with a default message
        dev.merge();

        // Create a "test" branch and merge it into "master" with a custom message and tag
        let test = gitGraph.branch("test");
        test.commit("Final commit");
        test.merge(master, "My special merge commit message");

        // Then, continue committing on the "test" branch
        test.commit({
            message: "It works !",
            commitDotText: "C2"
        });

        let fastForwardBranch = test.branch("fast-forward");
        fastForwardBranch.commit("First commit on FF branch");
        fastForwardBranch.commit("Second commit on FF branch");

        // If not commented, it will prevent fast-forward
        // test.commit("Make Fast Forward impossible");

        fastForwardBranch.merge(test, {
            fastForward: true
        });

        /***********************
         *        TAGS         *
         ***********************/

        // Add a tag to a commit
        test.commit({
            message: "Here you can see something",
            tag: "a-tag"
        });

        // Don't display tag box
        test.commit({
            message: "Here is a fresh new tag",
            tag: "my-tag",
            displayTagBox: false
        });

        // Tag current HEAD
        test.commit("Tag this commit").tag("b-tag");
        gitGraph
            .commit("This one has no tag")
            .commit("Tag this one")
            .tag({
                tag: "c-tag",
                tagColor: "green",
                displayTagBox: false
            });

        // Perform a merge, with a tag
        test.merge(master, {
            message: "New release",
            tag: "v1.0.0"
        });

        // Create different branches from an empty one and do some commits
        let features = master.branch("features")
        let feature1 = features.branch("feature1")
        let feature2 = features.branch("feature2")
        feature2.commit().commit();
        feature1.commit();

        /***********************
         *       EVENTS        *
         ***********************/

        gitGraph.canvas.addEventListener("graph:render", function (event) {
            console.log(event.data.id, "has been rendered with a scaling factor of", gitGraph.scalingFactor);
        });

        gitGraph.canvas.addEventListener("commit:mouseover", function (event) {
            console.log("You're over a commit.", "Here is a bunch of data ->", event.data);
            this.style.cursor = "pointer";
        });

        gitGraph.canvas.addEventListener("commit:mouseout", function (event) {
            console.log("You just left this commit ->", event.data);
            this.style.cursor = "auto";
        });

        // Attach a handler to the commit
        test.commit({
            message: "Click me!",
            author: "Nicolas <me@planee.fr>",
            onClick: function (commit, isOverCommit, event) {
                console.log("You just clicked my commit.", commit, event);
            }
        });

        // Display WIP-like commit
        test
            .commit({
                lineDash: [3, 2],
                dotStrokeWidth: 5,
                dotColor: "white",
                messageHashDisplay: false,
                messageAuthorDisplay: false,
                message: "Current WIP",
                tag: "HEAD",
                displayTagBox: false
            });
    }
}

export default Flow;
