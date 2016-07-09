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
		    	for(var i = 0; i < data.length; i++){
		    		data[i].id = data[i]._id;
		    	}
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

	Restaurant.prototype.addProperty = function(body,_cb){
		var myRestaurant = this;
		if(!myRestaurant.tmp){
			myRestaurant.tmp = {};
		}
		for(var key in body){
			myRestaurant.tmp[key] = body[key];
		}
		this.save(function(err,obj){
			if(err){
				_cb(err);
			}
			_cb(null,obj);
		});
		
	};

	Restaurant.remoteMethod(
		'addProperty',
		{
			isStatic:false,
			accepts:[
				{ arg: 'body', type: 'object', http: { source: 'body' } } 
			],
		    http: {path:'/addProperty', verb: 'post'},
		    returns: { type: 'object', root: true }
		}

	);

	Restaurant.prototype.isCraveryCandidate = function(bool,_cb){
		var myRestaurant = this;
		myRestaurant.craveryCandidate = bool;
		this.save(function(err,obj){
			if(err){
				_cb(err);
			}
			_cb(null,obj);
		});
		
	};

	Restaurant.remoteMethod(
		'isCraveryCandidate',
		{
			isStatic:false,
			accepts:[
				{ arg: 'bool', type: 'boolean', required:true} 
			],
		    http: {path:'/isCraveryCandidate', verb: 'get'},
		    returns: { type: 'object', root: true }
		}

	);
};
