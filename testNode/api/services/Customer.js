/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
var Customer = mongoose.model("Customer", schema);
module.exports = {
  login: function(data, callback) {
    Customer.findOne(data).lean().exec(function(err, foundCustomer) {
      if (err) {
        callback(err, null);
      } else if (!_.isEmpty(foundCustomer)) {
        callback(null, foundCustomer);
      } else {
        callback("Customer not found", null);
      }
    });
  }
};
