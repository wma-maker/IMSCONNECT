const express = require('express');
const {
  getIdeas,
  submitIdea,
  voteOnIdea,
  addRemarkOnIdea,
} = require('../controllers/ideaController');
const router = express.Router();

// Route to fetch all ideas
router.get('/', getIdeas);

// Route to submit a new idea
router.post('/', submitIdea);

// Route to vote on an idea
router.post('/:id/vote', voteOnIdea);

// Route to add a remark on an idea
router.post('/:id/remark', addRemarkOnIdea);

module.exports = router;
