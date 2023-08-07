const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const status = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, default:()=>new mongoose.Types.ObjectId()}, // Trường id tự động tạo giá trị duy nhất
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  content: { type: String, required: true },
  img: { type: String },
  like: { type: Number, default: 0 },
});

const Status = mongoose.model('statu', status);

module.exports = Status;
