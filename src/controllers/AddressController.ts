import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Address } from '../entities/Address';

class AddressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { street, city, state, cep, neighborhood, number, user } = req.body;

    if (!street || !city || !state || !cep) {
      return res.status(400).json({ error: "Todos os campos do endereço são obrigatórios" });
    }

    const address = new Address();
    address.street = street;
    address.city = city;
    address.state = state;
    address.cep = cep; 
    address.neighborhood = neighborhood
    address.number = number
    address.user = user

    try {
      const savedAddress = await AppDataSource.manager.save(Address, address);
      return res.json(savedAddress);
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao criar o endereço" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, street, city, state, cep,  neighborhood, number, user } = req.body;

    if (!street || !city || !state || !cep) {
      return res.status(400).json({ error: "Todos os campos do endereço são obrigatórios" });
    }

    const address = new Address();
    address.id = id;
    address.street = street;
    address.city = city;
    address.state = state;
    address.cep = cep; 
    address.neighborhood= neighborhood
    address.neighborhood= number
    address.user = user

    try {
      const updatedAddress = await AppDataSource.manager.save(Address, address);
      return res.json(updatedAddress);
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar o endereço" });
    }
  }

  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const addresses = await AppDataSource.manager.find(Address, {
        order: {
          id: "ASC"
        }
      });
      return res.json(addresses);
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao buscar os endereços" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    try {
      const { affected } = await AppDataSource.manager.delete(Address, id);
      return res.json({ affected });
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao excluir o endereço" });
    }
  }
}

export default new AddressController();
