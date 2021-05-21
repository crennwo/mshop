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
	console.log("enter GoodsInfoCtrl");
	$scope.goodsInfo=GoodsInfo.get($stateParams.goodsId);
	$scope.$on('$ionicView.beforeEnter',function(evt,enteringData){
		enteringData.enableBack=true;
	})
})

.controller('GoodsDetailCtrl', function($scope,$stateParams,GoodsDetail) {
	console.log("enter GoodDetailCtrl");
	$scope.goodsDetail=GoodsDetail.get($stateParams.goodsId);
})


.controller('MeCtrl', function($scope) {
	
})

.controller('SettingsCtrl', function($scope) {
	
})

.controller('CartCtrl', function($scope,Cart) {
	$scope.cart=Cart.all();
	$scope.total=Cart.total();
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
