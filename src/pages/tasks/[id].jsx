import react, { useState } from 'react'
import { Error } from 'next/error';
import { Grid ,Confirm} from 'semantic-ui-react';
import { useRouter } from 'next/dist/client/router';


export default function TaskDetail({task,error}){
   const {query,push} =useRouter(); 
   const [confirm, setconfirm] = useState()
   const Open=()=>{
      confirm? setconfirm(false):setconfirm(true)
   }
   const deleteTask=async()=>{
      const {id}=query;
      try{
         await fetch(`http://localhost:3000/api/tasks/${id}`,{
            method:'DELETE',
         })
      }catch(e){
         console.log(e)
      }
   }

   const handleDelete=()=>{
      deleteTask();
      open();
      push('/')
   }
   if(error && error.statusCode){
      return <Error statusCode={error.statusCode} title={error.statusText}/>      
   }
   console.log(task)
   return (
      <Grid centered verticalAlign='middle' columns={1} style={{height:'80:vh'}}>
         <Grid.Row>
            <Grid.Column textAlign='center' >
               <h1>{task.title}</h1>
               <p>{task.description}</p>
               <div>
                  <button color='red' onClick={Open}>
                     Delete
                  </button>
               </div>
            </Grid.Column>
         </Grid.Row>
         <Confirm open={confirm} onConfirm={handleDelete} onCancel={Open}></Confirm>
      </Grid>
   )
}

export  const getServerSideProps= async({query:{id}})=>{
   console.log(id)
   const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
   if(res.status===200){
      const task = await res.json();
      console.log(task)
      return{
         props:{
            task
         }
      };
   }

   return{  
      props:{}
   };
}