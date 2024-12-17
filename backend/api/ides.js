const {
  getIdeas,
  submitIdea,
  voteOnIdea,
  addRemarkOnIdea,
} = require('../controllers/ideaController');

module.exports = (req, res) => {
  if (req.method === 'GET' && req.url === '/api/ideas') {
    return getIdeas(req, res);
  }
  
  if (req.method === 'POST' && req.url === '/api/ideas') {
    return submitIdea(req, res);
  }

  if (req.method === 'POST' && req.url.match(/^\/api\/ideas\/\d+\/vote$/)) {
    return voteOnIdea(req, res);
  }

  if (req.method === 'POST' && req.url.match(/^\/api\/ideas\/\d+\/remark$/)) {
    return addRemarkOnIdea(req, res);
  }

  // Handle unsupported methods or routes
  res.status(404).json({ message: 'Not Found' });
};
