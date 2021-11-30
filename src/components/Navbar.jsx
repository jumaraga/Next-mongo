import Link from 'next/link'
import { useRouter } from 'next/dist/client/router';
import { Menu,Container, Button } from "semantic-ui-react";

export const Navbar=()=>{
   return(
      <Menu inverted borderless attached>
         <Container>
            <Menu.Item>
               <Link href='/'>
                  <img src="/favicon.ico" alt="" />
               </Link>
            </Menu.Item>
            <Menu.Menu position="right">
               <Menu.Item>
                  <Link href='/tasks/new'>                 
                  <Button primary size='mini' >
                  New Task
                  </Button>
                  </Link>
               </Menu.Item>
            </Menu.Menu>
         </Container>
      </Menu>
   )
}