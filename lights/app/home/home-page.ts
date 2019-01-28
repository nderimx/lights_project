/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { HomeViewModel } from './home-view-model';
import { Switch } from "tns-core-modules/ui/switch";
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";

// Event handler for Page "pageLoaded" event attached in home-page.xml
export function pageLoaded(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;
    page.bindingContext = new HomeViewModel();

    // onload reset
    request({
        url: "http://1.2.3.4:9090",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            green: "OFF"
        })
    }).then((response) => {
        const result = response.content.toJSON();
        console.log(result.json)
    }, (e) => {
    });
    request({
        url: "http://1.2.3.4:9090",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            red: "OFF"
        })
    }).then((response) => {
        const result = response.content.toJSON();
        console.log(result.json)
    }, (e) => {
    });
    

    // switch -----------------------------------

    // >> switch-checked-change-event-ts
    // set up the initial values for the switch components
    const greenSwitch: Switch = <Switch>page.getViewById("green");
    greenSwitch.on("checkedChange", (swargs) => {
        if ((<Switch>swargs.object).checked) {
            request({
                url: "http://1.2.3.4:9090",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    green: "ON"
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result.json)
            }, (e) => {
            });
        } else {
            request({
                url: "http://1.2.3.4:9090",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    green: "OFF"
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result.json)
            }, (e) => {
            });
        }
    });
    const redSwitch: Switch = <Switch>page.getViewById("red");
    redSwitch.on("checkedChange", (swargs) => {
        if ((<Switch>swargs.object).checked) {
            request({
                url: "http://1.2.3.4:9090",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    red: "ON"
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result.json)
            }, (e) => {
            });
        } else {
            request({
                url: "http://1.2.3.4:9090",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    red: "OFF"
                })
            }).then((response) => {
                const result = response.content.toJSON();
                console.log(result.json)
            }, (e) => {
            });
        }
    });



    // switch --------------------------
}
