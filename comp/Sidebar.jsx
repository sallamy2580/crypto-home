
import {Box,Image,Stack,Center,Text,Flex, useToast } from "@chakra-ui/react"

import { AiFillTwitterSquare } from 'react-icons/ai';

import { MdEmail } from 'react-icons/md';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import { FaGithubSquare } from 'react-icons/fa'

import { useRouter } from 'next/router'

export default function Sidebar() {

    const toast = useToast()

    const router = useRouter()


return  (

<>

<Box display={{base:"none" ,T869:"inherit" }} className={"sidebar"} right="0" width="25%" maxWidth="250px" background="#14a76c" height="100vh" borderRadius='0px 50px 50px 0px' borderRight='5px solid #ff652f' borderLeft='5px groove #ff652f'>

<Stack width="100%" direction="column" spacing="24px">

<Center>

<Image width="10rem"  src="./logo.png"  alt="img"/>

</Center>

<Center  marginTop="0 !important" >

<Text color="#ffe400" textShadow='0 2px 2px #000' fontWeight='700'> CRYPTO HOME </Text>

</Center>

<Flex justifyContent="center" width="100%" height="5rem"  > <AiFillTwitterSquare style={{borderRadius:"25px" ,background:"#1DA1F2",height:"3.5rem",width:"3.5rem" }} onClick={() => router.push("https://twitter.com/globalgroup16?s=09")} cursor="pointer" className={"twitter"}/></Flex>
<CopyToClipboard text="globalgroup9978@gmail.com" onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}><Flex justifyContent="center" width="100%" height="5rem" > <MdEmail style={{borderRadius:"25px" ,background:"#EA9990", height:"3.5rem",width:"3.5rem",cursor:'pointer' }} className={"twitter"}/> </Flex></CopyToClipboard>
<Flex justifyContent="center" width="100%" height="5rem" > <FaGithubSquare style={{borderRadius:"25px" ,background:"#EA9990", height:"3.5rem",width:"3.5rem" }} onClick={() => router.push("https://github.com/angelhtml")} cursor="pointer" className={"twitter"}/> </Flex>


</Stack>





</Box>






</>
)
 

    
}
//created by Global Group (GG)
