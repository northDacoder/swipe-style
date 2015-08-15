// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.contrib.ui.cards', 'ionic.service.core', 'ionic.service.analytics'])

.run(function($ionicPlatform, $ionicAnalytics, $ionicUser) {
  $ionicPlatform.ready(function() {

    // $ionicUser.identify({
    //   user_id: '023850'
    // });
    
    $ionicAnalytics.register();

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  });
})

.controller("CardsCtrl", function($scope, $http, $ionicAnalytics){
    $scope.cards = [];
    console.log($scope.cards);

    $scope.addCard = function(img, name) {
       var newCard = {image: img, title: name};

       newCard.id = Math.random();
       $scope.cards.unshift(angular.extend({}, newCard));

    };

    $scope.addCards = function(count) {
        $http.get("http://api.randomuser.me/?results=" + count).then(function(value) {
            angular.forEach(value.data.results, function(v){
              $scope.addCard(v.user.picture.medium, v.user.email);
            });
        });
    };

    $scope.addCards(1);

    $scope.cardSwiped = function(index) {
        $scope.addCards(1);
    }

    $scope.cardDestroyed = function(index) {
        $ionicAnalytics.track('Swipe Destroy', {
            item_id: index,
            item_name: $scope.cards[index].title
        });
        
        $scope.cards.splice(index, 1);
    }
})


.controller("CardCtrl", function($scope, $ionicSwipeCardDelegate){
    $scope.doAnything = function() {
      var card = $ionicSwipeCardDelegate.getSwipedCard($scope);
      card.swipe();
    };

});