import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Gender } from "../entities/Gender";

class GenderController {
  public async create(req: Request, res: Response): Promise<Response> {
    let { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Genero obrigatório", props:"name" });
    }
    name = name.trim();
    const gender = await AppDataSource.manager.save(Gender, { name }).catch(e => {
      // testa se o name é repetido
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Genero já incluso', props:"name" };
      }
      return { error: e.message };
    });
    return res.json(gender);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    let { id, name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Nome obrigatório", props:"name" });
    }
    name = name.trim();
    const gender = await AppDataSource.manager.save(Gender, { id, name }).catch(e => {
      // testa se o name é repetido
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Genero já registrado', props:"name" };
      }
      return { error: e.message, props:"" };
    });
    return res.json(gender);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const genders = await AppDataSource.manager.find(Gender, {
      order: {
        name: "ASC"
      }
    });
    return res.json(genders);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    // o método delete retorna o objeto {"raw": [],"affected": 1}
    // a propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await AppDataSource.manager.delete(Gender, { id });
    return res.json({ affected });
  }

}

export default new GenderController();