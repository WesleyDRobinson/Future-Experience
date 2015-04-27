app.config(function ($stateProvider) {
    $stateProvider
        .state('cart', {
            url : '/cart',
            templateUrl : 'js/cart/cart.html',
            controller: 'CartController',
            controllerAs : 'CartCtrl'
        });
});

app.controller('CartController', function ($scope, AuthService, $state, CartFactory, CartService) {
    this.items = CartFactory.items;
    this.removeItem = CartFactory.removeItem;
    this.clearCart = CartFactory.clearCart;

});

app.service('CartService', function ($rootScope, CartFactory, localStorageService) {
  // var cartService = this;
  // cartService.items = localStorageService.get("items") || [];

  // if (localStorageService.get("items"))

  // cartService.pushCartItem = function (listItemId, name, price, quantity){
  //   this.items.push({
  //     listitem : listItemId,
  //     name: name,
  //     price: price,
  //     quantity : quantity
  //   });

  //   localStorageService.set("items", this.items);

  // };

  // cartService.removeItem = function (){

  // };

  // cartService.clearCart = function (){
  //   console.log("CLEARING CART YAWL");
  //   this.items = [];
  //   localStorageService.remove("items");
  // };

   // cartService.addToCart = function (listitem_id, quantity) {
      //var newOrder = {
      //  listitems : [{
      //    item : listitem_id,
      //    quantity : quantity
      //  }]
      //};
      //
      //CartFactory.createNewOrder(newOrder).then(function(newOrder) {
      //    cartService.cart = newOrder;
      //    console.log(cartService.cart);
      //});
   // };
});

app.factory('CartFactory', function ($http, $q, $rootScope, CartFactory, localStorageService) {

  var cartFactory = this;
  cartFactory.items = localStorageService.get("items") || [];


  if (localStorageService.get("items"))

  cartFactory.pushCartItem = function (listItemId, name, price, quantity){
    this.items.push({
      listitem : listItemId,
      name: name,
      price: price,
      quantity : quantity
    });

    localStorageService.set("items", this.items);

  };

  cartFactory.removeItem = function (){

  };

  cartFactory.clearCart = function (){
    console.log("CLEARING CART YAWL");
    this.items = [];
    localStorageService.remove("items");
  };

  cartFactory.createNewOrder = function (newCart){
    //http post request to /order
    console.log('CREATE NEW ORDER WITH:', newCart);
    return $http.post("/api/order", newCart)
      .then(function (response){
        console.log('post response', response);
        return response.data;
      }).catch (function (err){
        console.log("THERE WAS AN ERROR YA'LL",err);
      });
  };

  cartFactory.updateOrder = function (order){
    //http put request to /order
    return $http.put("/api/order/" + order._id, order)
      .then(function (response){
        return response.data;
      });

  };

  cartFactory.getUserOrders = function(user_id) {
       var api_url = user_id ? '/api/order/user/' + user_id : '/api/order';
       return $http
           .get(api_url)
           .then(returnResponse)
           .catch(function(error) {
               console.log(error);
               $q.reject({ message : "Not able to update user"});
           });
   };

   return cartFactory;
});