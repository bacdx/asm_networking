const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profile = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Giả sử đã có mô hình User
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

const Profile = mongoose.model('profile', profile);

module.exports = Profile;
