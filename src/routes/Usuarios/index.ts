import Router from 'express';
import {IUsuario, Usuario} from '@server/libs/Usuarios';
const router  = Router();
const usuarioInstance = new Usuario();

router.get('/', async (_req, res)=>{
    res.json( await usuarioInstance.getAllUsuarioItems);
});

router.get('/byIndex/:index', (req, res) => 
{
    try {
        const{index} = req.params as unknown as {index: number};
        res.json(usuarioInstance.getUsuarioByIndex(index));
    }catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error'});
    }
});


 router.post('/new', (req, res) => {
   try {
    const newUsuario=req.body as unknown as IUsuario;
    const newUsuarioIndex= usuarioInstance.addUsuario(newUsuario);
    res.json({newIndex:newUsuarioIndex});
   }catch (error) {
    res.status(500).json({error: (error as Error).message});
   }
 });

 router.put('/update/:index', (req, res) => {
    try{
        const { index = -1}= req.params as unknown as {index?:number};
        const UsuarioForm= req.body as unknown as IUsuario;
        const usuarioUpdate = Object.assign(usuarioInstance.getUsuarioByIndex(index), UsuarioForm);
        if(usuarioInstance.updateUsuario(index, usuarioUpdate)){
            res.json(usuarioUpdate);
        }else{
            res.status(500).json({"msg":"Update not possible"})
        }
    }catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
 });

 router.delete('/delete:index', (req, res) =>{
    try {
        const{index} = req.params as unknown as {index: number};
        if(usuarioInstance.deleteUsuario(index)){
            res.status(200).json({"msg":"Success"});
        }else{
            res.status(500).json({});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error'});
    }
 })


export default router;
