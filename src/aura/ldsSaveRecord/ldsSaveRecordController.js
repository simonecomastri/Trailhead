/**
 * Created by ComastriSi on 07/03/2018.
 */
({
    handleSaveRecord: function(component, event, helper) {
        component.find("recordEditor").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                console.log("Save completed successfully.");
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' +
                           JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
    },
         recordUpdated: function(component, event, helper) {
                 var eventParams = event.getParams();
                 if(eventParams.changeType === "CHANGED") {
                     // get the fields that are changed for this record
                     var changedFields = eventParams.changedFields;
                     console.log('Fields that are changed: ' + JSON.stringify(changedFields));
                     // record is changed so refresh the component (or other component logic)
                     var resultsToast = $A.get("e.force:showToast");
                     resultsToast.setParams({
                         "title": "Saved",
                         "message": "The record was updated."
                     });
                     resultsToast.fire();
                 } else if(eventParams.changeType === "LOADED") {
                     console.log("Record is loaded successfully.");
                 } else if(eventParams.changeType === "REMOVED") {
                     var resultsToast = $A.get("e.force:showToast");
                     resultsToast.setParams({
                         "title": "Deleted",
                         "message": "The record was deleted."
                     });
                     resultsToast.fire();
                 } else if(eventParams.changeType === "ERROR") {
                     console.log('Error: ' + component.get("v.error"));
                 }
             }
})