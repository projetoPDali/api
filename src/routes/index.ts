import { Router, Request, Response } from "express";
import brand from './brand';
import user from './user';
import bike from './bike';
import rent from './rent';
import photo from './photo';
import address from './address'
import material from "./material";
import models from "./models"

const routes = Router();

routes.use("/bike", bike);
routes.use("/foto", photo);
routes.use("/locacao", rent);
routes.use("/marca", brand);
routes.use("/usuario", user);
routes.use("/endereco", address);
routes.use("/material", material);
routes.use("/material", models);

//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;
