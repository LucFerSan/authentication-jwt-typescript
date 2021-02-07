import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController {
  async store(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { name, email, password } = req.body;

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ error: 'User already registered.' });
    }

    const user = userRepository.create({ name, email, password });
    await userRepository.save(user);

    delete user.password;

    return res.json(user);
  }
}

export default new UserController();
