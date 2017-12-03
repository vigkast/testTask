angular.module("testcontroller", ["testnavigation", "ui.bootstrap"])

    .controller("LoginCtrl", function($scope, $timeout, $state, $stateParams, NavigationService, $uibModal) {
        $scope.customer = {};
        if ($.jStorage.get("profile") && $.jStorage.get("profile")._id) {
            $state.go("product");
        }
        $scope.login = function() {
            NavigationService.login($scope.customer, function(data) {
                if (data.value) {
                    $.jStorage.set("profile", data.data);
                    $state.go("product");
                } else {
                    var modal = $uibModal.open({
                        animation: true,
                        templateUrl: 'views/login-unsuccessful.html',
                        controller: 'LoginCtrl',
                        scope: $scope,
                        size: "sm",
                        backdrop: true
                    });
                    $timeout(function() {
                        modal.close();
                    }, 3000);
                }
            });
        };
    })

    .controller("ProductCtrl", function($scope, $timeout, $state, NavigationService, $uibModal) {
        $scope.products = [];
        $scope.logout = function() {
            $.jStorage.flush();
            $state.go("login");
        };
        if ($.jStorage.get("profile") && $.jStorage.get("profile")._id) {
            NavigationService.getProduct(function(data) {
                if (data.value && data.data && data.data.length > 0) {
                    if ($.jStorage.get("cart") && $.jStorage.get("cart").length > 0) {
                        _.each(data.data, function(eachProduct) {
                            var index = _.findIndex($.jStorage.get("cart"), function(eachCart) {
                                return eachCart._id === eachProduct._id;
                            });
                            if (index === -1) {
                                delete eachProduct.showSelected;
                            } else {
                                eachProduct.showSelected = true;
                            }
                        });
                        $scope.products = data.data;
                        $scope.getCharge();
                    } else {
                        $scope.products = data.data;
                    }
                }
            });
        } else {
            $state.go("login");
        }
        $scope.getCharge = function() {
            if ($.jStorage.get("cart") && $.jStorage.get("cart").length > 0) {
                $scope.showCharge = true;
                $scope.count = $.jStorage.get("cart").length;
                $scope.amount = _.reduce($.jStorage.get("cart"), function(sum, n) {
                    return sum + n.cost;
                }, 0);
            } else {
                $scope.showCharge = false;
            }
        };
        $scope.selectProduct = function(product) {
            $scope.product = _.clone(product);
            $scope.types = _.clone(product.type);
            if ($.jStorage.get("cart") && $.jStorage.get("cart").length > 0) {
                var index = _.findIndex($.jStorage.get("cart"), function(eachProduct) {
                    return eachProduct._id === $scope.product._id;
                });
                if (index === -1) {
                    if ($scope.product.type && $scope.product.type.length > 0) {
                        var modal = $uibModal.open({
                            animation: true,
                            templateUrl: 'views/selectType.html',
                            scope: $scope,
                            size: "sm",
                            backdrop: true
                        });
                        $scope.selectProductWithType = function(type) {
                            modal.close();
                            $scope.product.type = type;
                            var cart = $.jStorage.get("cart");
                            cart.push($scope.product);
                            $.jStorage.set("cart", cart);
                            product.showSelected = true;
                            $scope.getCharge();
                        }
                    } else {
                        var cart = $.jStorage.get("cart");
                        cart.push($scope.product);
                        $.jStorage.set("cart", cart);
                        product.showSelected = true;
                        $scope.getCharge();
                    }
                } else {
                    var cart = $.jStorage.get("cart");
                    cart.splice(index, 1);
                    $.jStorage.set("cart", cart);
                    delete product.showSelected;
                    $scope.getCharge();
                }
            } else {
                if ($scope.product.type && $scope.product.type.length > 0) {
                    var modal = $uibModal.open({
                        animation: true,
                        templateUrl: 'views/selectType.html',
                        scope: $scope,
                        size: "sm",
                        backdrop: true
                    });
                    $scope.selectProductWithType = function(type) {
                        modal.close();
                        $scope.product.type = type;
                        $.jStorage.set("cart", [$scope.product]);
                        product.showSelected = true;
                        $scope.getCharge();
                    }
                } else {
                    $.jStorage.set("cart", [$scope.product]);
                    product.showSelected = true;
                    $scope.getCharge();
                }
            }
        };
        $scope.createOrder = function() {
            NavigationService.createOrder(function(data) {
                if (data.value) {
                    $.jStorage.deleteKey("cart");
                    $state.go("order");
                }
            });
        };
    })

    .controller("OrderCtrl", function($scope, $state, NavigationService) {
        $scope.orders = [];
        $scope.logout = function() {
            $.jStorage.flush();
            $state.go("login");
        };
        if ($.jStorage.get("profile") && $.jStorage.get("profile")._id) {
            NavigationService.getOrder(function(data) {
                if (data.value && data.data && data.data.length > 0) {
                    $scope.orders = data.data;
                    _.each($scope.orders, function(eachOrder) {
                        eachOrder.amount = _.reduce(eachOrder.orderProduct, function(sum, n) {
                            return sum + n.product.cost;
                        }, 0);
                    });
                }
            });
        } else {
            $state.go("login");
        }
    })