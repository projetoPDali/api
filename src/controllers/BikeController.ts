import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { Bike } from "../entities/Bike";
import { Brand } from "../entities/Brand";
import { Material } from "../entities/Material";
import { Address } from "../entities/Address";
import { Gender } from "../entities/Gender";

class BikeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      size,
      gender,
      gear,
      rim,
      suspension,
      description,
      hourlyvalue,
      dailyvalue,
      user,
      brand,
      material,
      address,
    } = req.body;
  
    // Verifique se o endereço idêntico já existe no banco de dados
    const existingAddress = await AppDataSource.manager.findOneBy(Address, address);
  
    let addressEntity;
    if (existingAddress) {
      addressEntity = existingAddress;
    } else {
      addressEntity = await AppDataSource.manager.save(Address, address);
    }
  
    // Verifique se o gênero já existe no banco de dados
    const existingGender = await AppDataSource.manager.findOneBy(Gender, { name: gender.name });
  
    let genderEntity;
    if (existingGender) {
      genderEntity = existingGender;
    } else {
      genderEntity = await AppDataSource.manager.save(Gender, gender);
    }
  
    // Verifique se a marca já existe no banco de dados
    const existingBrand = await AppDataSource.manager.findOneBy(Brand, { name: brand.name });
  
    let brandEntity;
    if (existingBrand) {
      brandEntity = existingBrand;
    } else {
      brandEntity = await AppDataSource.manager.save(Brand, brand);
    }
  
    // Verifique se o material já existe no banco de dados
    const existingMaterial = await AppDataSource.manager.findOneBy(Material, { name: material.name });
  
    let materialEntity;
    if (existingMaterial) {
      materialEntity = existingMaterial;
    } else {
      materialEntity = await AppDataSource.manager.save(Material, material);
    }
  
    // Obtenha o usuário na tabela users
    const userEntity = await AppDataSource.manager.findOneBy(User, { id: user });
    if (!userEntity) {
      return res.status(400).json({ error: "Usuário desconhecido", props: "user" });
    }
  
    const bike = await AppDataSource.manager.save(Bike, {
      size,
      gender: genderEntity,
      gear,
      rim,
      suspension,
      description,
      hourlyvalue,
      dailyvalue,
      user: userEntity,
      brand: brandEntity,
      material: materialEntity,
      address: addressEntity,
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
      idgender,
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

//obtém o genero na tabela gender
const gender = await AppDataSource.manager.findOneBy(Gender, { id: idgender });
if (!gender) {
  return res
    .status(400)
    .json({ error: "Genero não encontrado", props: "gender" });
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

    //obtém endereço na tabela Address
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
        gender:true
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
