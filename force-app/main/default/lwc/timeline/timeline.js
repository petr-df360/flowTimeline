// timeline.js
import { LightningElement, api, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import VIS_TIMELINE from '@salesforce/resourceUrl/vis_timeline';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Timeline extends LightningElement {

    visjsInitialized = false;

    @api timelineItem_col;
    @api timelineGroup_col;

    renderedCallback() {
        if (this.visjsInitialized) {
            return;
        }
        this.visjsInitialized = true;

        Promise.all([
            loadScript(this, VIS_TIMELINE + '/vis-timeline-graph2d.min.js'),
            loadStyle(this, VIS_TIMELINE + '/vis-timeline-graph2d.min.css')
        ])
        .then(() => {
            this.initializeTimeline();
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading VisJS',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
/*
    initializeTimeline() {
        // retrieve your Salesforce data here, by invoking Apex or via Wire service

        const container = this.template.querySelector(".container");

        // Create a DataSet (allows two way data-binding)
        let items = new vis.DataSet([
            {id: 1, content: 'Task 1', start: '2023-07-30', end: '2023-08-02', group: 1, type: 'range', style: 'color: green;background-color:#BBF7D0;'}, // range item with style
            {id: 2, content: 'Task 2', start: '2023-08-03', type: 'box', group: 1}, // box item
            {id: 3, content: 'Task 3', start: '2023-08-05', end: '2023-08-08', type: 'range',group: 1},
            {id: 4, content: 'Task 4', start: '2023-08-10', type: 'point',group: 1}, // point item
            {id: 5, content: 'Task 5', start: '2023-08-12', end: '2023-08-15', group: 2, type: 'background'}, // background item
            {id: 6, content: 'Milestone', start: '2023-08-13', type: 'point',group: 1, style: 'color: red;'} // point item with style
        ]);

        let groups = new vis.DataSet([
            {id: 1, content: 'Group 1'},
            {id: 2, content: 'Group 2'},
        ]);
        

        // Configuration for the Timeline
        let options = {};

        // Create a Timeline
        let timeline = new vis.Timeline(container, items, groups, options);
    }
*/
    initializeTimeline() {
        const container = this.template.querySelector(".container");
    
        let itemsCollection = this.timelineItem_col.map(item => {
            let newItem = {
                id: item.itemId,
                content: item.itemContent
            };
            if(item.itemStart) newItem.start = item.itemStart;
            if(item.itemEnd) newItem.end = item.itemEnd;
            if(item.itemGroup) newItem.group = item.itemGroup;
            if(item.itemType) newItem.type = item.itemType;
            if(item.itemStyle) newItem.style = item.itemStyle;
            return newItem;
        });
    
        let items = new vis.DataSet(itemsCollection);
    
        // Configuration for the Timeline
        let options = {};
    
        // Check if there are groups
        if (this.timelineGroup_col && this.timelineGroup_col.length > 0) {
            let groupsCollection = this.timelineGroup_col.map(group => {
                return {
                    id: group.groupId,
                    content: group.groupContent
                };
            });
    
            let groups = new vis.DataSet(groupsCollection);
    
            // Create a Timeline with groups
            let timeline = new vis.Timeline(container, items, groups, options);
        } else {
            // Create a Timeline without groups
            let timeline = new vis.Timeline(container, items, options);
        }
    }
    
}
