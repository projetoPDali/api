import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { Bike } from "../entities/Bike";
import { Brand } from "../entities/Brand";
import { Material } from "../entities/Material";
import { Address } from "../entities/Address";

class BikeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      iduser,
      idmaterial,
      idbrand,
      size,
      gender,
      gear,
      rim,
      suspension,
      description,
      hourlyvalue,
      dailyvalue,
      idaddress,
    } = req.body;

    //obtém o usuário na tabela users
    const user = await AppDataSource.manager.findOneBy(User, { id: iduser });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Usuário desconhecido", props: "user" });
    }

    //obtém a marca na tabela brands
    const brand = await AppDataSource.manager.findOneBy(Brand, { id: idbrand });
    if (!brand) {
      return res
        .status(400)
        .json({ error: "Marca desconhecida", props: "brand" });
    }

    //obtém o endereço na tabela address
    const address = await AppDataSource.manager.findOneBy(Address, { id: idaddress });
    if (!address) {
      return res
        .status(400)
        .json({ error: "Endereço não encontrado", props: "address" });
    }

    //obtém a material na tabela material
    const material = await AppDataSource.manager.findOneBy(Material, {
      id: idmaterial,
    });
    if (!material) {
      return res
        .status(400)
        .json({ error: "Material desconhecido", props: "Material" });
    }

    const bike = await AppDataSource.manager.save(Bike, {
      user,
      brand,
      material,
      size,
      gender,
      gear,
      rim,
      suspension,
      description,
      hourlyvalue,
      dailyvalue,
      address,
    });
    return res.json(bike);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      id,
      iduser,
      idmaterial,
      idbrand,
      size,
      gender,
      gear,
      rim,
      suspension,
      description,
      hourlyvalue,
      dailyvalue,
      idaddress
    } = req.body;

    //obtém o usuário na tabela users
    const user = await AppDataSource.manager.findOneBy(User, { id: iduser });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Usuário desconhecido", props: "user" });
    }

    //obtém a marca na tabela brands
    const brand = await AppDataSource.manager.findOneBy(Brand, { id: idbrand });
    if (!brand) {
      return res
        .status(400)
        .json({ error: "Marca desconhecida", props: "brand" });
    }

    //obtém material na tabela material
    const material = await AppDataSource.manager.findOneBy(Material, {
      id: idmaterial,
    });
    if (!material) {
      return res
        .status(400)
        .json({ error: "Material desconhecido", props: "material" });
    }

    //obtém material na tabela material
    const address = await AppDataSource.manager.findOneBy(Address, {
      id: idaddress,
    });
    if (!material) {
      return res
        .status(400)
        .json({ error: "Endereço desconhecido", props: "address" });
    }

    const bike = await AppDataSource.manager.save(Bike, {
      id,
      user,
      brand,
      size,
      material,
      gender,
      gear,
      rim,
      suspension,
      description,
      hourlyvalue,
      dailyvalue,
      address
    });
    return res.json(bike);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const bikes = await AppDataSource.manager.find(Bike, {
      relations: {
        user: true,
        brand: true,
        material: true,
        photos: true,
        address: true,
      },
    });
    return res.json(bikes);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    // o método delete retorna o objeto {"raw": [],"affected": 1}
    // a propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await AppDataSource.manager.delete(Bike, { id });
    return res.json({ affected });
  }
}

export default new BikeController();
