const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const Message = require('../models/Message');
const Conversation = require('../models/Convo');

module.exports = {
  getAllConvos: asyncHandler(async (req, res) => {
    let from = mongoose.Types.ObjectId("60efa11241aa990dec93324e");
    Conversation.aggregate([{
        $lookup: {
          from: 'user',
          localField: 'recipients',
          foreignField: '_id',
          as: 'recipientObj',
        },
      },
     ])
      .match({
        recipients: {
          $all: [{
            $elemMatch: {
              $eq: from
            }
          }]
        }
      })
      .project({
        '__v': 0,
        'recipientObj': 0,
      })
      .exec(async (err, conversations) => {
        if (err) {
          console.log(err);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            message: 'Failure'
          }));
          res.sendStatus(500);
        } else {
          const populated = await Conversation.populate(conversations, {path: "recipients", select: '-__v -password -register_date'})
          res.send(populated);
        }
      });
  }),
  getOneConvo: asyncHandler(async (req, res) => {
    let user1 = mongoose.Types.ObjectId("60efa11241aa990dec93324e");
    let user2 = mongoose.Types.ObjectId("60efa13a41aa990dec93324f");
    Message.aggregate([{
          $lookup: {
            from: 'user',
            localField: 'to',
            foreignField: '_id',
            as: 'toObj',
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'from',
            foreignField: '_id',
            as: 'fromObj',
          },
        },
      ])
      .match({
        $or: [{
            $and: [{
              to: user1
            }, {
              from: user2
            }]
          },
          {
            $and: [{
              to: user2
            }, {
              from: user1
            }]
          },
        ],
      })
      .project({
        'toObj': 0,
        'fromObj': 0,
        "__v": 0
      })
      .exec((err, messages) => {
        if (err) {
          console.log(err);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            message: 'Failure'
          }));
          res.sendStatus(500);
        } else {
          res.send(messages);
        }
      });
  }),
  createMessage: asyncHandler(async (req, res) => {
    let from = mongoose.Types.ObjectId(req.body.from);
    let to = mongoose.Types.ObjectId(req.body.to);

    Conversation.findOneAndUpdate({
        recipients: {
          $all: [{
              $elemMatch: {
                $eq: from
              }
            },
            {
              $elemMatch: {
                $eq: to
              }
            },
          ],
        },
      }, {
        recipients: [req.body.from, req.body.to],
        lastMessage: req.body.body,
        date: Date.now(),
      }, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      },
      async function (err, conversation) {
        if (err) {
          console.log(err);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            message: 'Failure'
          }));
          res.sendStatus(500);
        } else {
          if (!conversation._id) {
            let newConversation = new Conversation({recipients: [req.body.from, req.body.to], lastMessage: req.body.body})
            const { _id } = await newConversation.save()
            conversation._id = _id;
          }
          let message = new Message({
            conversation: conversation._id,
            to: req.body.to,
            from: req.body.from,
            body: req.body.body,
          });

          // req.io.sockets.emit('messages', req.body.body);

          message.save(err => {
            if (err) {
              console.log(err);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                message: 'Failure'
              }));
              res.sendStatus(500);
            } else {
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  message: 'Success',
                  conversationId: conversation._id,
                })
              );
            }
          });
        }
      }
    );
  })
}
