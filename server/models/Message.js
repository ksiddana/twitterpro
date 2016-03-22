var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
  text: {
    type: String,
    index: {
      unique: true
    }
  },
  list: String
});

var Message = mongoose.model('message', MessageSchema);
