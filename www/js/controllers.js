angular.module('starter.controllers', [])

.controller('IndexCtrl', function($scope) {
	
})

.controller('CategoriesCtrl', function($scope,Categories) {
	$scope.categories=Categories.all();
})

.controller('GoodsCtrl', function($scope,$stateParams,Goods) {
	//$scope.goods=Goods.get($stateParams.categoryId);
	$scope.goods=Goods.all();
	$scope.categoryName=$stateParams.categoryName;
})

.controller('GoodsInfoCtrl', function($scope,$stateParams,GoodsInfo) {
//	$ionicNavBarDelegate.showBar(true);
	//console.log("enter");
	$scope.goodsInfo=GoodsInfo.get($stateParams.goodsId);
})

.controller('GoodsDetailCtrl', function($scope,$stateParams,GoodsDetail) {
	console.log("enter");
	$scope.goodsDetail=GoodsDetail.get($stateParams.goodsId);
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
