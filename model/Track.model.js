const mongoose = require('mongoose');

const Track = new mongoose.Schema(
  {
    Title: {
		type: String,
		required: true
    },
    Duration: {
		type: Number,
		required: true
	},
    Listening : {
		type: Number,
		required : true
	},
	Likes:{
		type: Number,
	required: true
	},
	Featuring:{
		type : mongoose.Schema.Types.ObjectId
  },
	
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Track', Track, 'Track');