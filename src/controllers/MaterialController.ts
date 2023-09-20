import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Material } from '../entities/Material';

class MaterialController {
  public async create(req: Request, res: Response): Promise<Response> {
    let { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Nome obrigatório", props: "name" });
    }
    name = name.trim();
    const material = await AppDataSource.manager.save(Material, { name }).catch(e => {
      // testa se o name é repetido
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Material já existe', props: "name" };
      }
      return { error: e.message };
    });
    return res.json(material);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    let { id, name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Nome obrigatório", props: "name" });
    }
    name = name.trim();
    const material = await AppDataSource.manager.save(Material, { id, name }).catch(e => {
      // testa se o name é repetido
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'Material já existe', props: "name" };
      }
      return { error: e.message, props: "" };
    });
    return res.json(material);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const materials = await AppDataSource.manager.find(Material, {
      order: {
        name: "ASC"
      }
    });
    return res.json(materials);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    // o método delete retorna o objeto {"raw": [],"affected": 1}
    // a propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await AppDataSource.manager.delete(Material, { id });
    return res.json({ affected });
  }

}

export default new MaterialController();
