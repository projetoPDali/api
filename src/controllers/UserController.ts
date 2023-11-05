import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, alias, mail, phone, password } = req.body;
    const user = await AppDataSource.manager
      .save(User, { name, alias, mail, phone, password })
      .catch((e) => {
        // testa se o alias é repetido
        if (/(alias)[\s\S]+(already exists)/.test(e.detail)) {
          return { error: 'Codinome já existe', props: "alias" };
        }
        // testa se o e-mail é repetido
        else if (/(mail)[\s\S]+(already exists)/.test(e.detail)) {
          return { error: 'E-mail já existe', props:"mail" };
        }
        // testa se o e-mail é repetido
        else if (/(phone)[\s\S]+(already exists)/.test(e.detail)) {
          return { error: 'Telefone já existe', props:"phone" };
        }
        return { error: e.message, props: "" };
      });
    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, id, alias, mail, phone, password } = req.body;
    //obtém o usuário na tabela users
    const user = await AppDataSource.manager.findOneBy(User, { id });
    if (!user) {
      //verifica se o usuário existe
      return res.json({ error: 'Usuário inexistente', props: "user" });
    }
    user.name = name;
    user.alias = alias;
    user.mail = mail;
    user.phone = phone;
    user.password = password;
    const r = await AppDataSource.manager.save(User, user).catch((e) => {
      // testa se o alias é repetido
      if (/(alias)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Codinome já existe', props:"alias" };
      }
      // testa se o e-mail é repetido
      else if (/(mail)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'E-mail já existe', props:"mail" };
      }
      // testa se o e-mail é repetido
      else if (/(phone)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Telefone já existe', props:"phone" };
      }
      return { error: e.message, props:"" };
    });
    return res.json(r);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const users = await AppDataSource.manager.find(User, {
      order: {
        alias: "ASC"
      },
    });
    return res.json(users);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    // o método delete retorna o objeto {"raw": [],"affected": 1}
    // a propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await AppDataSource.manager.delete(User, { id });
    return res.json({ affected });
  }

  //consulta o usuario pelo id

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // Assuming you pass the ID as a URL parameter
    const user = await AppDataSource.manager.findOne(User, {
      where: { id: parseInt(id, 10) }, // Parse the id to an integer
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { mail, password } = req.body;
    let user;
  
    try {
      user = await AppDataSource.manager.findOne(User, {
        where: { mail },
      });
  
      if (!user) {
        throw new Error('Usuário inexistente');
      }
  
      if (user.password !== password) {
        throw new Error('Senha incorreta');
      }
  
      console.log('Login bem-sucedido');
  
      // Usuário autenticado, você pode gerar um token de autenticação aqui, se necessário.
  
      return res.json({ message: 'Login bem-sucedido', user });
    } catch (error) {
      if (error.message === 'Usuário inexistente') {
        return res.json({ error: 'Usuário inexistente', props: 'user' });
      } else if (error.message === 'Senha incorreta') {
        return res.json({ error: 'Senha incorreta', props: 'password' });
      } else {
        console.error('Erro durante o login:', error);
        return res.json({ error: 'Erro interno do servidor' });
      }
    }
  }
  
}

export default new UserController();
