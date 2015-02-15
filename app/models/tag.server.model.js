var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
    title : {
        type: String,
        required: true
    }
});

TagSchema.virtual('isDelete');

mongoose.model('Tag', TagSchema);
