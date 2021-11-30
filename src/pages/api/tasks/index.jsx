import {dbConnect}from '../../../utils/mongus';
import Task from '../../../model/task.jsx'

dbConnect();

export default async function handler(req,res){
    const tasks = await Task.find();
    switch (req.method) {
        case 'POST':
            try{

            console.log(tasks) ;
            const newTask = new Task(req.body)
            const saveTask = await newTask.save();
            return res.status(201).json('creating a new post ')
            }catch(e){
            return res.status(500).json({error: e.message})
            }
        case 'GET':
            
            return res.status(200).json(tasks)   
        default:
            return res.status(400).json({ msg: 'this method is not defibe'})
    } 
}
