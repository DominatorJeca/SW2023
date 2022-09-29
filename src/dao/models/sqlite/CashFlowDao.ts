import { ICashFlow} from "../entities/CashFlow";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

export class ClashFlowDao extends AbstractDao<ICashFlow>{

    public constructor(db:unknown){
        super('CASHFLOW', db as sqlite.Database );
        super.exec('CREATE TABLE IF NOT EXISTS CASHFLOW(_id INTEGER AUTOINCREMENT NOT NULL PRIMARY KEY,' + 'type TEXT' + 'date:Date,' + 'amount: NUMERIC,' + 'description TEXT');
    }
    public async getCashFlows(){
        super.findAll()
    }

    public async insertNewCashFlow( newCashFlow: ICashFlow ){
        try{
            const result = await super.createOne(newCashFlow);
        }catch(ex: unknown){
            console.log("CashflowDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async deleteCashFlow(deleteCashFlow:ICashFlow){
        try{
            const {_id }= deleteCashFlow;
            const result = await super.delete({_id});
            return result;
        }catch(ex: unknown){
            console.log("CashflowDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }
}