const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, role });
  res.status(201).json({ message: 'User registered' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Send token as HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // set true if using HTTPS
    sameSite: 'lax', // or 'strict'/'none'
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  res.json({ message: 'Login successful', user: { username: user.username, role: user.role } });
};


module.exports = { register, login };
