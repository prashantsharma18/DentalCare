var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    slug : String,
    postedBy : String,
    postedDt : Date,
    modifiedDt: Date,
    status : String,
    image : String,
    shortDesc: String,
    content : String,
    ranking: Number,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    meta: {
        votes: Number,
        favs: Number
    },
    tags: [{type: Schema.ObjectId, ref: 'Tag' }]
});

mongoose.model('Blog', BlogSchema);
