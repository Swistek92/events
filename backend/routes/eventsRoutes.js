const express = require('express');
const eventsController = require('../Controllers/eventsController');
const router = express.Router();

router.post('/', eventsController.addEvent);

router.post('/aa', (req, res, next) => {
  if (!req.body.firstName) {
    res.status(400).json('you need pass a first Name');
    return;
  }
  res.sendStatus(201);
});

module.exports = router;
