var mongoose = require('mongoose');

var TargetSchema = mongoose.Schema({
  handle: {
    type: String,
    index: {
      unique: true
    }
  },
  interval: String,
  list: String
});

var Target = mongoose.model('target', TargetSchema);
