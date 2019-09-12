import models from '../models';
import auth from '../auth';
import bcrypt from 'bcryptjs';

export const getHome = async (req, res) => {
  let user;
  if (req.headers.authorization !== undefined) {
    try {
      user = auth.verify(req.headers.authorization);
      user = await models.User.findOne({
        where: { id: user.id }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    user = null;
  }
  const name = user ? user.name : 'Please LOGIN';
  res.json({ greeting: `Welcome to Chat N Chill`, name });
};

export const postRegister = async (req, res) => {
  const {
    body: { name, email }
  } = req;
  const password = await bcrypt.hashSync(req.body.password, 8);

  try {
    const user = await models.User.create({
      name,
      email,
      password
    });
    res.json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server error!');
  }
};

export const postLogin = async (req, res) => {
  const {
    body: { email, password }
  } = req;

  try {
    const user = await models.User.findOne({
      where: { email }
    });
    if (!user) return res.status(404).json('User not found!');

    const result = await bcrypt.compareSync(password, user.password);
    if (!result) return res.status(401).json('Password not valid!');

    const accessToken = await auth.accessToken(user.id);
    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error!');
  }
};

export const getMe = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await models.User.findOne({
      where: { id }
    });
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
};
