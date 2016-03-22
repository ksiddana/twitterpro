var mongoose = require('mongoose');

var ListSchema = mongoose.Schema({
  name: {
    type: String,
    index: {
      unique: true
    }
  },
  user: String
});

var List = mongoose.model('List', ListSchema);
