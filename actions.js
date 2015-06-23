var fileData = require('./docs/actions.json');

exports.getDelta = function(lastUpdateDate){
	
	var returnActions = [];
	//var fileData =	fs.readFile("./docs/actions.json", "utf8");

	console.log(lastUpdateDate);
	console.log(fileData);
	console.log("test");
	
	if (fileData != undefined)
	{
		//var data = JSON.parse(fileData);
		
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
