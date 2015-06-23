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
