const http = require('http');
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const hostname = '127.0.0.1';
const Status = require('./model/Status');
const User = require('./model/User');
const Profile = require('./model/Profile');
const port = 3000;
app.use(express.json());
const mongoURI = 'mongodb://127.0.0.1:27017/mydatabase';
const conn = mongoose.createConnection();
mongoose.connect(mongoURI)
  .then(client => {
    console.log('Connected to MongoDB');
   
    // Định nghĩa các route và xử lý tương ứng ở đây
    app.get('/profiles', async (req, res) => {
      const username = req.query.username;
      const password = req.query.password;
      console.log(req.query);
      try {
        const user = await Profile.findOne({ username: username });/// Tìm người dùng dựa trên username trong cơ sở dữ liệu
        // const user = await Profile.find()
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        } else if (user.password != password) {
          return res.status(402).json({ message: 'Error Pass' });
        }
        res.json(user); // Trả về thông tin của người dùng dưới dạng JSON
      } catch (error) {
        res.status(500).end(error.message);
      }
    });



    // Route để lấy danh sách các bài viết (statuses)
    app.get('/status', async (req, res) => {
    
      try {
        const statuses = await Status.find(); // Lấy tất cả các bài viết từ cơ sở dữ liệu
        res.json(statuses); // Trả về danh sách statuses dưới dạng JSON
      } catch (error) {
        res.status(500).json({ message: 'Internal  Error' + error });
      }
    });



    app.post('/status', async (req, res) => {
      
      const { username, avatar, content, img, like, } = req.body;
      
      const newStatus = new Status({
        name:username,
        avatar,
        content,
        img,
        like,
      });

      console.log(newStatus);
      newStatus.save()
        .then(async () => {
          
          try {
            const statuses = await Status.find(); // Lấy tất cả các bài viết từ cơ sở dữ liệu
            console.log(res.json(statuses)); // Trả về danh sách statuses dưới dạng JSON
          } catch (error) {
            console.log(error); 
            res.status(500).json({ message: 'Internal Server Error' });
          }
        })
        .catch(err => {
          console.log(err); 
          res.status(500).json({ error: 'Failed to create a new status.' });
        });
    });
    app.get('/', (req, res) => {
      res.end('helloo');
    })
    app.delete('/status', async (req, res) => {
      const statusId = req.params.id;
      try {
        // Sử dụng phương thức findByIdAndRemove để xóa status dựa trên id
        const deletedStatus = await Status.findByIdAndRemove(statusId);
        if (!deletedStatus) {
          throw new Error('Status not found'); // Nếu không tìm thấy status, ném lỗi
        } else {
          try {
            const statuses = await Status.find(); // Lấy tất cả các bài viết từ cơ sở dữ liệu
            res.json(statuses); // Trả về danh sách statuses dưới dạng JSON
          } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
          }
        }

      } catch (error) {
        throw error;
      }




    })
    // Khởi chạy server
    app.listen(port, () => {
      console.log(`Server is running on http://127.0.0.1:${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });