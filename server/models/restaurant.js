module.exports = function(Restaurant) {
	Restaurant.sharedClass.disableMethodByName('create');
	Restaurant.sharedClass.disableMethodByName('patchOrCreate');
	Restaurant.sharedClass.disableMethodByName('replaceOrCreate');
	Restaurant.sharedClass.disableMethodByName('replaceById');
	Restaurant.sharedClass.disableMethodByName('updateAll');
	Restaurant.sharedClass.disableMethodByName('deleteById');
	Restaurant.sharedClass.disableMethodByName('prototype.patchAttributes');
	Restaurant.sharedClass.disableMethodByName('createChangeStream');

	Restaurant.aggregate = function(body,_cb) {
		//{ $group: { _id: { name:"$name"},count: { $sum:  1 }}}, { $match: {count: { $gt : 10 }}})
	    console.log(body.mongo);
	    var aggregationQuery = JSON.parse(body.mongo);

	    Restaurant.getDataSource().connector.connect(function(err, db) {
		  var collection = db.collection('nyc_restaurants');
		  collection.aggregate(aggregationQuery, function(err, data) {
		    if (err) {}
		    	console.log(data);
	    		_cb(null, data);
		  });
		});
	    
  	};
	Restaurant.remoteMethod(
		'aggregate',
	    {
	    	accepts:[
	    		{ arg: 'body', type: 'object', http: { source: 'body' } } 
	    		// {arg: 'req', type: 'object', 'http': {source: 'req'}},
	   //  		{
				//   arg: 'custom',
				//   type: 'string',
				//   http: function(ctx) {
				//     // ctx is LoopBack Context object
				 
				//     // 1. Get the HTTP request object as provided by Express
				//     var req = ctx.req;
				//     if (req.is('text/*')) {
				// 	    req.text = '';
				// 	    req.setEncoding('utf8');
				// 	    req.on('data', function(chunk){ req.text += chunk });
				// 	    req.on('end',function(){
				// 	    	console.log(req.text);
				 
				// 	    // 2. Get 'a' and 'b' from query string or form data and return their sum.
				// 	    return req.text;
				// 	    });
				// 	} else {
				// 		return req;
				// 	} 
				    
				//   }
				// }
	    		],
	      	http: {path: '/aggregate', verb: 'post'},
	      	returns: { type: 'array', root: true }
	    }
	);
};
