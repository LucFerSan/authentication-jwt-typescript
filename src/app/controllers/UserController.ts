import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: req.userId } });

    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ Welcome: user.name });
  }

  async store(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { name, email, password } = req.body;

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ error: 'User already registered.' });
    }

    const user = userRepository.create({ name, email, password });
    await userRepository.save(user);

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}

export default new UserController();
