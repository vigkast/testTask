module.exports = function(err, data) {
  var req = this.req;
  var res = this.res;
  if (err) {
    res.json({
      value: false,
      data: err
    });
  } else {
    res.json({
      value: true,
      data: data
    });
  }
};
