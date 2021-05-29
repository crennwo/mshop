angular.module('starter.controllers', [])

.controller('IndexCtrl', function($scope) {
	
})

.controller('CategoriesCtrl', function($scope,Categories) {
	$scope.categories=Categories.all();
})

.controller('GoodsTabsCtrl', function($scope, $ionicSlideBoxDelegate) {
  //设置selectedTab,tab绑定ng-class="{'active':selectedTab == 0}"用来设置tab的激活属性
  $scope.selectedTab = 0;
	//切换tab,设置selectTab,改变tab激活属性,同时切换slideBox
  $scope.selectTabWithIndex = function(index) {
    $scope.selectedTab = index; 
	$ionicSlideBoxDelegate.slide($scope.selectedTab);
  }
	//切换slide,设置selectTab,改变tab激活属性
  $scope.slideHasChanged = function(index) {
	$scope.selectedTab = index; 
	//$scope.selectTabWithIndex(index);
  };
})

.controller('GoodsListCtrl', function($scope,$stateParams,Goods) {
	console.log("enter GoodsListCtrl");
	//$scope.goods=Goods.get($stateParams.categoryId);
	$scope.goods=Goods.all();
	//$scope.categoryName=$stateParams.categoryName;
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
