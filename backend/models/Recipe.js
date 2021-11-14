const mongoose = require('mongoose')



const RecipeSchema = new mongoose.Schema({
    createdBy: {  
        type: String,
        required: true,
      },
      createdOn: {  
        type: Number,
        required: true,
      },
      editedOn: {  
        type: Number,
        required: false,
      },
  title: {  
    type: String,
    required: true,
  },
  description: {  
    type: String,
    required: true,
  },
  image: {  
    type: String,
    required: true,
  },
  isShared: {  
    type: Boolean,
    required: true,
  },
})


module.exports = mongoose.model('Recipe', RecipeSchema)

