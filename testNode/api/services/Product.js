/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  type: {
    type: [String],
    required: true
  },
  img: {
    type: String,
    required: true
  }
});
var Product = mongoose.model("Product", schema);
module.exports = {
  getAll: function(data, callback) {
    Product.find().lean().exec(function(err, foundProduct) {
      if (err) {
        callback(err, null);
      } else if (foundProduct && foundProduct.length > 0) {
        callback(null, foundProduct);
      } else {
        callback(null, []);
      }
    });
  }
};
