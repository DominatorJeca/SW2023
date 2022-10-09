import { IUsuario} from "../entities/Usuario";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

export class UsuarioDao extends AbstractDao<IUsuario>{

    public constructor(db:unknown){
        super('USUARIO', db as sqlite.Database );
        super.exec('CREATE TABLE IF NOT EXISTS USUARIO (_id INTEGER AUTOINCREMENT NOT NULL PRIMARY KEY,' + 'correo:string' + 'contrasenia:string,' + 'name:string,' + 'lastName:string');
    }
    public async getUsuarios(){
        super.findAll()
    }

    public async getUsuarioById(identifier: Partial<IUsuario>){
        try {
            const result = await super.findById(identifier);
            return result;
        }catch (ex: unknown){
            throw ex;
        }
    }

    public async insertNewUsuario( newUsuario: IUsuario ){
        try{
            const result = await super.createOne(newUsuario);
            return result;
        }catch(ex: unknown){
            console.log("UsuarioDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async deleteUsuario(deleteUsuario:IUsuario){
        try{
            const {_id }= deleteUsuario;
            const result = await super.delete({_id});
            return result;
        }catch(ex: unknown){
            console.log("UsuarioDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }
}