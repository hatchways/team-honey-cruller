const schedule = require('node-schedule');
const 
const Notification = require('../models/notification');
const Contest = require('../models/contest');

exports.contestEnd = async (deadlineDate) => {
  const date = new Date(deadlineDate)
  const job = schedule.scheduleJob(date, function(){
    console.log('The answer to life, the universe, and everything!');
  });



}