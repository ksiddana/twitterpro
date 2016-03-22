var mongoose = require('mongoose');

var HashTagSchema = mongoose.Schema({
  text: {
    type: String,
    index: {
      unique: true
    }
  },
  list: String
});

var HashTag = mongoose.model('HashTag', HashTagSchema);
