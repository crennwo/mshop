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


.controller('MeCtrl', function($scope,AuthService,Session) {
	$scope.regData={name:'eason',password:'123',email:'eason@shop.com'};
	$scope.register=function(){
		$scope.user=AuthService.register($scope.regData);
		$scope.user.then(function(result){
			console.log(angular.fromJson(result));
			if(result.status=="1"){
				//注册成功
				//提示： eason，您好，请登录邮箱261901051@qq.com邮箱激活你的帐号
			}
		});
	}
	
	$scope.loginInfo={name:'eason',password:'123'};
	$scope.login=function(){
		AuthService.login($scope.loginInfo).then(function(result){
			//result为登录后返回的用户信息
			console.log(angular.fromJson(result));
			if(result.result==1){
				//登录成功
				Session.create(result.obj);//记录用户信息在Session.currentUser中
				Session.remember($scope.loginInfo);//保存用户名密码
			}
		});
	}
	
	$scope.logout=function(){
		Session.destroy();//注销
		//刷新 "我的果园"去掉所有登录信息
	}
	
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
