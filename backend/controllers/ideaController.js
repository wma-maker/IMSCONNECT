// Mock storage for ideas
let ideas = [
  {
    id: 1,
    title: "New Website Design",
    description: "We need a new, modern website design.",
    votes: 0,
    remarks: [],
  },
  {
    id: 2,
    title: "Mobile App Features",
    description: "Let's add new features to the mobile app.",
    votes: 0,
    remarks: [],
  }
];
  
  // Controller to fetch all ideas
  const getIdeas = (req, res) => {
    res.json(ideas);
  };
  
  // Controller to submit a new idea
  const submitIdea = (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }
  
    const newIdea = {
      id: ideas.length + 1,
      title,
      description,
      votes: 0,
      remarks: [],
    };
  
    ideas.push(newIdea);
    res.status(201).json({ message: 'Idea submitted successfully!', idea: newIdea });
  };
  
  // Controller to vote on an idea
  const voteOnIdea = (req, res) => {
    const { id } = req.params;
  
    const idea = ideas.find((idea) => idea.id === parseInt(id));
  
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found.' });
    }
  
    idea.votes += 1;
    res.json({ message: 'Vote submitted successfully!', idea });
  };
  
  // Controller to add a remark on an idea
  const addRemarkOnIdea = (req, res) => {
    const { id } = req.params;
    const { remark } = req.body;
  
    const idea = ideas.find((idea) => idea.id === parseInt(id));
  
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found.' });
    }
  
    if (!remark) {
      return res.status(400).json({ message: 'Remark is required.' });
    }
  
    idea.remarks.push({
      remark,
      submittedAt: new Date(),
    });

    res.json({ message: 'Remark added successfully!', idea });
  };

 
  
  module.exports = {
    getIdeas,
    submitIdea,
    voteOnIdea,
    addRemarkOnIdea,
  };
  