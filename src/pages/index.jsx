import { Button, Card, Container, Grid , Confirm} from "semantic-ui-react";
import { useRouter } from "next/dist/client/router";
export default function Home({data}) {
  console.log(data)
  const router =useRouter()

  if(data.length === 0) return (

    <Grid centered verticalAlign='middle' columns="1" style={{height:"80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>There are no  task yet  </h1>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fno-data-icon-20.jpg&f=1&nofb=1" alt="data no found" />
          <div>
            <button primary='true'>Create a Task</button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  return (
  <Container>
    <Card.Group itemsPerRow={4}>
      {
       data.map(task =>(
         <Card key={task._id}>
           <Card.Content>
             <Card.Header>{task.title}</Card.Header>  
             <p>{task.description}</p>
           </Card.Content>
           <Card.Content extra>
             <button primary='true' onClick={()=>{router.push(`/tasks/${task._id}`)}} >
               View
             </button>
             <button primary='true' >Delete</button>
           </Card.Content>
         </Card>
       )) 
      }
    </Card.Group>
  </Container>);
}

export const getServerSideProps= async (ctx)=>{
  const res = await fetch("http://localhost:3000/api/tasks");
  const data = await res.json();

  
  return{
    props:{
      data
    }
  };
}