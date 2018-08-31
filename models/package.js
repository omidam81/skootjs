const mongoose = require('mongoose');
const Package = mongoose.model(
  'Package',
  new mongoos.Schema(
    {
      name: {
        type: String,
        required: true,
        id: true
      },
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      imagePath: {
        type: String,
        required: true
      }
    },
    { collection: 'Package' }
  )
);
module.exports = Package;
