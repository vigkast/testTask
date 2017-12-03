/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var schema = mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    index: true
  },
  orderProduct: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      index: true
    },
    subtype: String
  }]
});
schema.plugin(deepPopulate, {
  populate: {
    'orderProduct.product': {
      select: '-type'
    }
  }
});
var Order = mongoose.model("Order", schema);
module.exports = {
  createOrder: function(data, callback) {
    var orderProduct = [];
    _.each(data.orderProduct, function(each) {
      if (each._id) {
        var product = {
          product: each._id,
          subtype: each.type
        };
        orderProduct.push(product);
      }
    });
    data.orderProduct = orderProduct;
    data.orderId = "";
    var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 8; i++) {
      data.orderId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    Order(data).save(function(err, created) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, "Created");
      }
    });
  },
  getOrder: function(data, callback) {
    Order.find({
      customer: data.customer
    }).deepPopulate("orderProduct.product").lean().exec(function(err, foundOrder) {
      if (err) {
        callback(err, null);
      } else if (foundOrder && foundOrder.length > 0) {
        callback(null, foundOrder);
      } else {
        callback(null, []);
      }
    });
  }
};
