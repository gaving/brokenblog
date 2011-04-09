var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    db = mongoose.connect('mongodb://localhost/db');

var Post = new Schema({
    author  : String
    , title : String
    , body  : String
    , date  : {type  : Date, default : Date.now}
});

mongoose.model('Post', Post);

module.exports = db.model('Post');
