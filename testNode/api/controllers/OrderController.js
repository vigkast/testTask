/**
 * OrderController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  createOrder: function(req, res) {
    if (req.body) {
      if (req.body.customer && req.body.orderProduct && req.body.orderProduct.length > 0) {
        Order.createOrder(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "Invalid Params"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  getOrder: function(req, res) {
    if (req.body) {
      if (req.body.customer) {
        Order.getOrder(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "Invalid Params"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  }
};
