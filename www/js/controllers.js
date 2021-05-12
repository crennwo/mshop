angular.module('starter.controllers', [])

.controller('IndexCtrl', function($scope) {
	
})

.controller('CategoriesCtrl', function($scope,Categories) {
	$scope.categories=Categories.all();
})

.controller('GoodsCtrl', function($scope,$stateParams,Goods) {
	$scope.goods=Goods.get($stateParams.categoryId);
	//$scope.goods=Goods.all();
	$scope.categoryName=$stateParams.categoryName;
	console.log($scope.goods);
})

.controller('MeCtrl', function($scope) {
	
})

.controller('CartCtrl', function($scope) {
	
})








.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
