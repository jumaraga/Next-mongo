import { useState } from "react";
import { Grid ,Button} from "semantic-ui-react";
import { Form } from "semantic-ui-react";

import { useRouter } from 'next/dist/client/router';
export default function TaskFormPage(){
   const router = useRouter()  
   const [newTask, setNewTask] = useState({
      title: "",
      description: ""
   })
   const [erros, setErros] = useState({title:'',description:''})
   
   const validate=()=>{
      const er ={}
      if(!newTask.title){
         er.title='title is required'
      }
      if(!newTask.description) er.description= 'description is required'
      return er
   }
   const HandleSubmit= async(e)=>{
      e.preventDefault();
      let errors = validate()
      console.log('submiting')
      if(Object.keys(erros).length) setErros(errors)
      await createTask()
   }
   const createTask=async()=>{
   try{
      await fetch('http://localhost:3000/api/tasks',{
         method:'POST',
         headers:{
            'Content-Type' :'application/json'
         },
         body:JSON.stringify(newTask)
      })
   }catch(e){
      console.log(e)
   
   }}
   const handleChange=(e)=>{
      setNewTask({...newTask,[e.target.name]:e.target.value})
   }
   return(
   <Grid
      centered
      verticalAlign='middle'
      columns='3'
      style={{ height:'80vh'}}>
      <Grid.Row>
            <Grid.Column textAlign='centered'>
               <h1>Create Task</h1>
               <Form onSubmit={HandleSubmit}>
                  <Form.Input label='Title' placeholder='Title' name='title' onChange={handleChange} error={erros.title?{content:'Please enter a title'}:null} />
                  <Form.TextArea label='Description' placeholder='Description' name="description" onChange={handleChange} error={erros.description?{content:'Please insert a description'}:null}/>
                  <Button primary onClick={()=>push}>
                     Save
                  </Button>
               </Form>
            </Grid.Column>
      </Grid.Row>
   </Grid>
   )
}