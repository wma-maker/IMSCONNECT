const login = (req, res) => {
    const { username, password } = req.body;
  
    // Mock users
    const users = [
      { username: 'admin', password: 'admin', role: 'manager' },
      { username: 'employee', password: 'employee', role: 'employee' }
    ];
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    res.json({ username: user.username, role: user.role });
  };
  
  module.exports = { login };
  