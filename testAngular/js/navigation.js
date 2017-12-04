var adminurl = "http://localhost:900/";
angular.module('testnavigation', [])
    .factory("NavigationService", function($http) {
        return {
            login: function(data, callback) {
                $http.post(adminurl + "customer/login", data).then(
                    function(response) {
                        callback(response.data);
                    }
                );
            },
            getProduct: function(callback) {
                $http.post(adminurl + "product/getAll").then(
                    function(response) {
                        callback(response.data);
                    }
                );
            },
            createOrder: function(callback) {
                $http.post(adminurl + "order/createOrder", {
                    customer: $.jStorage.get("profile")._id,
                    orderProduct: $.jStorage.get("cart")
                }).then(
                    function(response) {
                        callback(response.data);
                    }
                );
            },
            getOrder: function(callback) {
                $http.post(adminurl + "order/getOrder", {
                    customer: $.jStorage.get("profile")._id
                }).then(
                    function(response) {
                        callback(response.data);
                    }
                );
            },
        };
    });
