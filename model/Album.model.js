const mongoose = require('mongoose');

const Album = new mongoose.Schema(
  {
    Title: {
		type: String,
		required: true
    },
    Release: {
		type: Date,
		required: true
	},
    Genre : {
		type: String,
		required : true
	},
	Cover_URL:{
		type: String,
	required: true
	},	
	Track:{
		type: mongoose.Schema.Types.ObjectId
	},
  },
  
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Album', Album, 'Album');