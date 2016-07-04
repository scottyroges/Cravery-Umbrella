module.exports = function(Restaurant) {
	Restaurant.sharedClass.disableMethodByName('create');
	Restaurant.sharedClass.disableMethodByName('patchOrCreate');
	Restaurant.sharedClass.disableMethodByName('replaceOrCreate');
	Restaurant.sharedClass.disableMethodByName('replaceById');
	Restaurant.sharedClass.disableMethodByName('updateAll');
	Restaurant.sharedClass.disableMethodByName('deleteById');
	Restaurant.sharedClass.disableMethodByName('prototype.patchAttributes');
	Restaurant.sharedClass.disableMethodByName('createChangeStream');
};
