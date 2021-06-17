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
 	//slideHasChanged后，子控制器把 index 冒泡到父控制器
 	$scope.$on('slideIndexChanged', function(event,data) {
 		//切换slide,设置selectTab,改变tab激活属性
    	$scope.selectedTab = data; 
   	});
})

.controller('GoodsListCtrl', function($scope,$timeout,$ionicScrollDelegate,$ionicSlideBoxDelegate,$stateParams,ProductService) {
	//获得csid
	$scope.csid=$stateParams.csid;
	//首次加载,监听stateChange来判断
	$scope.$on('$stateChangeSuccess', function() {
    	$scope.init();
   	});
	//初始化函数
	$scope.init=function(){
		//初始化商品列表
		$scope.productList=[];
		//初始化当前页码数为1
		$scope.page=0;	
		//首次拉取数据
		$scope.loadMore();
		//ion-content滚动到顶部
		$ionicScrollDelegate.scrollTop();
	}
	
	//切换新品、热卖、价格：1、清空商品列表 2、初始化页码   根据index对应的属性product排序
	//切换slidebox,重新加载商品列表,向父级冒泡改变后的index值
	$scope.slideHasChanged = function(index) {
 		$scope.$emit('slideIndexChanged', index);
 		$scope.init();
  	}

	//上拉加载更多
	$scope.loadMore=function(){
		$timeout(function(){
			//每次加载更多，页码加1
			$scope.page++;
			//console.log($scope.page);
			ProductService.findByCsid($scope.csid,$scope.page,$ionicSlideBoxDelegate.currentIndex()).then(function(result){
				//获得总页码数
				$scope.pageCount=result.obj.totalPage;
				//当前数组拼接新数组
				$scope.productList=$scope.productList.concat(result.obj.list);
				//加载完更多内容后广播
				$scope.$broadcast('scroll.infiniteScrollComplete');
				//console.log($scope.productList);
			})	
		},500);
			
	}
	
	//上拉加载超过总页码数则返回false,不允许再加载
	$scope.moreDataCanBeLoaded=function(){
		if($scope.page<$scope.pageCount)
			return true;
		else
			return false;
	}
})

.controller('GoodsInfoCtrl', function($scope,$stateParams,ProductService) {
	$scope.quantity=1;
	$scope.product={};
	ProductService.findByPid($stateParams.pid).then(function(result){
		$scope.product=result.obj;
		console.log($scope.product);
	});
	$scope.$on('$ionicView.beforeEnter',function(evt,enteringData){
		enteringData.enableBack=true;
	})
	$scope.decrement = function() {
  		if($scope.quantity<=1)
  			return;
  		$scope.quantity--;
  	}
	$scope.increment = function() {
 		$scope.quantity++;
	}
})

.controller('GoodsDetailCtrl', function($scope,$stateParams,ProductService) {
	ProductService.findByPid($stateParams.pid).then(function(result){
		$scope.pdescimgs=result.obj.pdescimgs;
		console.log($scope.pdescimgs);
	});
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

.controller('RegistCtrl', function($scope,$state,$ionicPopup,AuthService,$ionicHistory) {
	$scope.user={name:"",email:"",password:"",confirmPwd:""};
	$scope.message="";
	$scope.regist=function(){
		if($scope.user.password!=$scope.user.confirmPwd)//如果两次密码输入不一致,提示并返回
		{
			$scope.message="两次输入密码不一致！";
			$scope.showPopup();
			return;
		}
		AuthService.register($scope.user).then(function(result){
			console.log(result);
			if(result.result==0)
			{
				$scope.message=result.desc;
				$scope.showPopup();
				return;
			}
			$scope.message="注册成功，请登录邮箱激激活账号后再登录！";
			$scope.showPopup();
			$ionicHistory.goBack();
		});
	}
	
	// 显示定制弹出框，提示错误消息
	$scope.showPopup = function() {
		// 调用$ionicPopup弹出定制弹出框
		$ionicPopup.show({
			template: $scope.message,
			title: "提示",
			buttons: [
				{
					text: "确认",
					type: "button-balanced"
				}
			]
		})
	};

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
