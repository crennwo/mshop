angular.module('starter.controllers', [])

.controller('IndexCtrl', function($scope,ProductService,$ionicSlideBoxDelegate) {
	//推荐商品
	//$scope.recList=new Array();
	ProductService.findRec().then(function(result){
		//console.log(angular.toJson(result));
		$scope.recList=result.obj;
		//console.log($scope.recList);
		//$ionicSlideBoxDelegate.update重绘SlideBox
		$ionicSlideBoxDelegate.update();
	})
	//热门商品
	//$scope.hotList=[];
	ProductService.findHot().then(function(result){
		$scope.hotList=result.obj;
		//console.log($scope.hotList);
	})
})

.controller('CategoriesCtrl', function($scope,ProductService) {
	//$scope.categories=Categories.all();
	ProductService.findCategories().then(function(result){
		$scope.categories=result.obj;
		//console.log($scope.categories);
	});
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
  };
})

.controller('GoodsListCtrl', function($scope,$stateParams,ProductService) {
	//初始化商品列表
	$scope.productList=[];
	//初始化当前页码数为1
	$scope.page=1;
	//获得csid
	$scope.csid=$stateParams.csid;
	//首次刷新
//	ProductService.findByCsid($scope.csid,$scope.page).then(function(result){
//		//获得总页码数
//		$scope.pageCount=result.obj.totalPage;
//		$scope.productList=result.obj.list;
//		console.log("首次刷新成功");
//	})
	
	//上拉刷新
	$scope.loadMore=function(){
		if($scope.page<$scope.pageCount)//当前页小于总页码数时，页数加1
			$scope.page++;
		console.log($scope.page);
		ProductService.findByCsid($scope.csid,$scope.page).then(function(result){
			//获得总页码数
			$scope.pageCount=result.obj.totalPage;
			//当前数组拼接新数组
			$scope.productList=$scope.productList.concat(result.obj.list);
			//加载完更多内容后广播
			$scope.$broadcast('scroll.infiniteScrollComplete');
			
			console.log($scope.productList);
		})	
	}
	
	$scope.$on('$stateChangeSuccess', function() {
    	$scope.loadMore();
	});
  	
	$scope.moreDataCanBeLoaded=function(){
		if($scope.page<$scope.pageCount)
			return true;
		else
			return false;
	}
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
			console.log(angular.toJson(result));
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
