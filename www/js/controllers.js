angular.module('starter.controllers', [])

.controller('IndexCtrl', function($scope) {
	
})

.controller('CategoriesCtrl', function($scope) {
	
})

.controller('CategoryCtrl', function($scope) {
	
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
