import {getConnection} from "@models/sqlite/SqliteConn";
import { UsuarioDao } from "@models/sqlite/Usuario";


export interface IUsuario{
    _id?:unknown;
    correo:string;
    contrasenia:string;
    name:string;
    lastName:string;
};

export class Usuario{
    private dao: UsuarioDao;
    public constructor(){
        getConnection()
            .then(conn=>{this.dao = new UsuarioDao (conn);})
            .catch(ex=>console.error(ex));
    }
    private UsuarioItems: IUsuario[]=[];

    //Consultas
   public getAllUsuarioItems(){
        return this.dao.getUsuarios();
    }

    public getUsuarioByIndex(index: number){
       return this.dao.getUsuarioById({_id: index});
    }

    public addUsuario(usuario: IUsuario) {
        return this.dao.insertNewUsuario(usuario);
    }

    public updateUsuario(index: number, usuario:IUsuario):boolean{
        if(index>=0 && index < this.UsuarioItems.length){
            this.UsuarioItems[index]= usuario;
            return true;
        }
        return false;
    }

    public deleteUsuario(index: number):boolean{
        if(index>=0 && index < this.UsuarioItems.length){
            this.UsuarioItems=this.UsuarioItems.filter(
                (_obj:IUsuario, i:number)=>i !==index
            );
            return true;
        }
        return false;
    }
}

