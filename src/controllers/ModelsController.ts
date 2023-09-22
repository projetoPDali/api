import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Models } from '../entities/Models';

class ModelsController {
  public async create(req: Request, res: Response): Promise<Response> {
    let { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Modelo obrigatório", props:"name" });
    }
    name = name.trim();
    const brand = await AppDataSource.manager.save(Models, { name }).catch(e => {
      // testa se o name é repetido
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Modelo já existe', props:"name" };
      }
      return { error: e.message };
    });
    return res.json(brand);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    let { id, name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Modelo obrigatório", props:"name" });
    }
    name = name.trim();
    const brand = await AppDataSource.manager.save(Models, { id, name }).catch(e => {
      // testa se o name é repetido
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Modelo já existe', props:"name" };
      }
      return { error: e.message, props:"" };
    });
    return res.json(brand);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const brands = await AppDataSource.manager.find(Models, {
      order: {
        name: "ASC"
      }
    });
    return res.json(brands);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    // o método delete retorna o objeto {"raw": [],"affected": 1}
    // a propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await AppDataSource.manager.delete(Models, { id });
    return res.json({ affected });
  }

}

export default new ModelsController();