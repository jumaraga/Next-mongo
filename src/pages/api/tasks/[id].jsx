import { dbConnect } from "../../../utils/mongus";
import Task from "../../../model/task.jsx";

import {Types, Schema} from 'mongoose'

dbConnect()

export default async (req,res)=>{
   const  {method,body,query:{id}} = req;
   const params = req.params;
   const idValidated = new Schema.ObjectId(id);

   switch (req.method) {
      case 'GET':
         try{
            const task = await Task.findById(id);
            if(!task) { return res.status(400).json(task);
            }else{
               return res.status(200).json(task)
            }        
         }catch(e){
            console.log(e);
            return res.status(500).json({error:'msg error'})
         }
      case 'PUT':
         try{
            const task = await Task.findByIdAndUpdate(id, body,{
               new: true,
            })
            if(!task){
               return res.status(404).json({msg:'task no encontrada'})
            }
            return res.status(200).json('task updated')
         }catch(e){
            console.log(e)
            return res.status(500).json('erro')
         }  
      case 'DELETE': 
         try{
          const task = await Task.findByIdAndDelete(id);
          if(!task){ return res.status(404).json('NO se encontro tal tarea') 
          }else{
            return res.status(200).json('TArea eliminada correctamente')
            }
         }catch(e){
            console.log(e)
            return res.status(500).json('error con el servidor')
         }   
      default:
         return res.status(400).json('nop')
      }
}