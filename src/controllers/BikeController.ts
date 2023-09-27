import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { Bike } from '../entities/Bike';
import { Brand } from "../entities/Brand";
import { Address } from "../entities/Address";

class BikeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { iduser, idbrand, color, size, material, gender, speedkit, rim, suspension,gear, description, hourlyvalue, dailyvalue, address } = req.body;

    //obtém o usuário na tabela users
    const user = await AppDataSource.manager.findOneBy(User, { id: iduser });
    if (!user) {
      return res.status(400).json({ error: "Usuário desconhecido", props:"user" });
    }

    //obtém a marca na tabela brands
    const brand = await AppDataSource.manager.findOneBy(Brand, { id: idbrand });
    if (!brand) {
      return res.status(400).json({ error: "Marca desconhecida", props:"brand" });
    }

    // Create a new Address entity based on the provided address data
  const newAddress = new Address();
  newAddress.street = address.street;
  newAddress.city = address.city;
  newAddress.state = address.state;
  newAddress.cep = address.cep;

  // Save the new address entity
  const savedAddress = await AppDataSource.manager.save(Address, newAddress);

  // Create a new Bike entity with the address
  const bike = await AppDataSource.manager.save(Bike, {
    user,
    brand,
    color,
    size,
    material,
    gender,
    speedkit,
    rim,
    suspension,
    gear,
    description,
    hourlyvalue,
    dailyvalue,
    address: savedAddress, // Associate the address with the bike
  });
  return res.json(bike);
}

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, iduser, idbrand, color, size, material, gender, speedkit, rim, suspension, gear, description, hourlyvalue, dailyvalue, } = req.body;

    //obtém o usuário na tabela users
    const user = await AppDataSource.manager.findOneBy(User, { id: iduser });
    if (!user) {
      return res.status(400).json({ error: "Usuário desconhecido", props:"user" });
    }

    //obtém a marca na tabela brands
    const brand = await AppDataSource.manager.findOneBy(Brand, { id: idbrand });
    if (!brand) {
      return res.status(400).json({ error: "Marca desconhecida", props:"brand" });
    }

    const bike = await AppDataSource.manager.save(Bike, { id, user, brand, color, size, material, gender, speedkit, rim, suspension,gear, description, hourlyvalue, dailyvalue,});
    return res.json(bike);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const bikes = await AppDataSource.manager.find(Bike, {
      relations: {
        user: true,
        brand: true,
        photos: true
      }
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
