const mongoose = require('mongoose');

const Artist = new mongoose.Schema(
  {
    Nom: {
		type: String,
		required: true
    },
    Birth: {
		type: Date,
		required: true
	},
    Followers : {
		type: Number,
		required : true
	},
	Albums:{
		type: mongoose.Schema.Types.ObjectId
	},	
},
  
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Artist', Artist, 'Artist');