var fileData = require('./docs/actions.json');

exports.getDelta = function(lastUpdateDate){
	
	var returnActions = [];

	if (fileData != undefined)
	{		
		var acts = fileData.actions;
		
		acts.forEach(function(obj){
			if (isLater(obj.lastChanged, lastUpdateDate))
	      {
	            returnActions.push({ actionId: obj.actionId});
	       }
		  });
	}
	return returnActions;
}


function isLater(date1, date2) {
        return new Date(date1) > new Date(date2);
}
exports.getAction = function (id) {
    var _ = require("underscore");
    var returnAction = [];
    //var fileData =	fs.readFile("./docs/actions.json", "utf8");

    console.log("id----" + id);
    console.log(fileData);
    

    if (fileData != undefined) {
        //var data = JSON.parse(fileData);
        var jsonid = '"' + id + '"';

        returnAction = _.find(fileData.actions,{actionId:id});
        console.log("return action" + returnAction);
        
    }
    return returnAction;
}
