var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//建立一個model表現collection的樣子(name, Created_date, status)並規定它的格式
//collection包含name:任務名字 Created_date:建立日期 status:目前狀態('pending', 'ongoing', 'completed')
var TaskSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
