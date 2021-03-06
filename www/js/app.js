// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','LocalStorageModule'])

.constant("SERVER_BASE_URL", "http://192.168.191.1:8080/fresh365/")

.run(function($ionicPlatform,Session,localStorageService,AuthService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
  });
  	var loginInfo =localStorageService.get("loginInfo");
	var isUndefined=angular.isUndefined(loginInfo);//localStorage中currentUser是否已定义
	if(!isUndefined && loginInfo!=null){	 
		AuthService.login(loginInfo).then(function(result){
			if(result.result==1){
			 	Session.create(result);
			 	console.log("localStorage自动登录："+result);
		 	}
		});
	}
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,localStorageServiceProvider) {
	//本地缓存
	localStorageServiceProvider
    .setPrefix('starter')
    .setStorageType('localStorage') //sessionStorage本地关闭后清除
    .setNotify(true, true)
    .setStorageCookie(30, '/');//天数/目录
    
  // show tab at bottom
	$ionicConfigProvider.platform.android.tabs.position("bottom");
	$ionicConfigProvider.tabs.style('standard');	
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.index', {
    url: '/index',
    views: {
      'tab-index': {
        templateUrl: 'templates/tab-index.html',
        controller: 'IndexCtrl'
      }
    }
  })

  .state('tab.categories', {
    url: '/categories',
    views: {
      'tab-categories': {
        templateUrl: 'templates/tab-categories.html',
        controller: 'CategoriesCtrl'
      }
    }
  })

  .state('tab.goodstabs', {
      url: '/goodstabs',
      views: {
      'tab-categories': {
      templateUrl: 'templates/goods-tabs.html',
      controller: 'GoodsTabsCtrl'
      }
    }
    })

  .state('tab.goodstabs.goodslist', {
      url: '/goodslist/:csid',
      views: {
      'goodslist': {
        templateUrl: 'templates/goods-list.html',
        controller: 'GoodsListCtrl'
      	}
      }
    })

  // setup an abstract state for the tabs directive
    .state('onegoods', {
    url: "/onegoods",
    abstract: true,
    templateUrl: "templates/onegoods.html"
  })


	.state('onegoods.info', {
      url: '/info/:pid',
      views: {
        'onegoods': {
          templateUrl: 'templates/goods-info.html',
          controller: 'GoodsInfoCtrl'
        }
      }
    })
	
   .state('onegoods.detail', {
      url: '/detail/:pid',
      views: {
        'onegoods': {
          templateUrl: 'templates/goods-detail.html',
          controller: 'GoodsDetailCtrl'
        }
      }
    })
    
//.state('goods-info', {
//    url: '/goods-info/:pid',
//    views:{
//    	'onegoods':{
//    		templateUrl: 'templates/goods-info.html',
//    		controller: 'GoodsInfoCtrl'		
//    	}
//    }
//  })
//
//  
//.state('goods-info-detail', {
//    url: '/goods-details',
//    templateUrl: 'templates/goods-detail.html',
//    controller: 'GoodsDetailCtrl'
//})

  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'templates/tab-me.html',
        controller: 'MeCtrl'
      }
    }
  })

  .state('tab.regist', {
    url: '/regist',
    views: {
      'tab-me': {
        templateUrl: 'templates/regist.html',
        controller: 'RegistCtrl'
      }
    }
  })
  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-me': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  
  .state('tab.cart', {
    url: '/cart',
    views: {
      'tab-cart': {
        templateUrl: 'templates/tab-cart.html',
        controller: 'CartCtrl'
      }
    }
  })
  
 
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/index');

});
