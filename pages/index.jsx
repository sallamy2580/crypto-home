import CoinpaprikaAPI from "@coinpaprika/api-nodejs-client"
import { useEffect, useState } from "react";
import Sidebar from "../comp/Sidebar";
//import Drawer from 'rc-drawer';
import {Box,Flex,Center,Image,Text,Stack ,HStack ,Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,Divider ,CircularProgress } from "@chakra-ui/react"
  import { AiFillTwitterSquare } from 'react-icons/ai';

  import { MdEmail } from 'react-icons/md';
  
import 'react-responsive-list/assets/index.css'

import { Virtuoso } from 'react-virtuoso'

import { useToast } from "@chakra-ui/react"
import {Stat,StatLabel,StatNumber,StatHelpText,StatArrow,StatGroup,Link } from "@chakra-ui/react"
import normalizeUrl from 'normalize-url'
import axios from "axios";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  InputLeftAddon,
  ModalBody,
  ModalCloseButton,
  InputGroup,useDisclosure , Input,InputRightAddon
} from "@chakra-ui/react"
import moment from "moment";
import { HamburgerIcon } from '@chakra-ui/icons'

import { CgTwitter,CgWebsite,CgFacebook,CgCodeSlash,CgYoutube,CgCopy ,CgSearch } from "react-icons/cg";
import { useRouter } from 'next/router'
import { FcReddit } from "react-icons/fc";
import { SiDiscord,SiTelegram } from "react-icons/si";
import { FaBlog } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { RiDeleteBack2Line } from "react-icons/ri";
import { VscSettingsGear } from "react-icons/vsc";

import Script from 'next/script'
import { Query } from 'mingo'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Select ,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"
import { FaGithubSquare } from 'react-icons/fa'
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'
import 'animate.css';


const client = new CoinpaprikaAPI();





import dynamic from 'next/dynamic';
const Schart = dynamic(() => import("../comp/Sidebar - Copy"), {
ssr: false
});





export default function Home() {
  const[list ,setList ]=useState()
  const[coinListLoading ,setCoinListLoading ]=useState( false)
  const[SearchText ,setSearchText ]=useState()
  const[Listag ,setListag ]=useState()
  const[MIN ,setMiN ]=useState()
  const[MAX ,setMAX ]=useState()
  const[sort ,setSort ]=useState()
  const router = useRouter()
  const toast = useToast()
useEffect(()=> {



   client.getTicker().then(e =>{
 



    const Listagx = e.map(e=>({
      id: e.id,
      market_cap_usd: e.market_cap_usd*1 || 0 ,
      max_supply: e.max_supply*1 || 0 ,
      name: e.name,
      percent_change_1h: e.percent_change_1h*1 || 0 ,
      percent_change_7d: e.percent_change_7d*1 || 0 ,
      percent_change_24h: e.percent_change_24h*1|| 0 ,
      price_usd: e.price_usd*1 || 0 ,
      rank: e.rank*1 || 0 ,
      symbol: e.symbol,
      total_supply: e.total_supply*1 || 0 ,
    
    }) )

    

    setListag(Listagx)
    setList(Listagx)

    setCoinListLoading(true)

   }


   

   ).catch(console.error);



}, [])


useEffect(()=> {

if(Listag){



const MINX = MIN*1 
const MAXX = MAX*1 

if(!MAXX){MAXX=10000000}
if(!MINX){MINX=0}

  let criteria = { name:  {$regex:SearchText},price_usd:{ $gte:MINX ,  $lte:MAXX } }  

  let query = new Query(criteria)
  

  let cursor = query.find(Listag)

let sortx ={}

if(!sort){ sortx={rank:1} }
if(sort=="Bestin1h%"){ sortx={ percent_change_1h:-1} }
if(sort=="Worsein1h%"){ sortx={ percent_change_1h:1} }
if(sort=="Bestin24h%"){ sortx={ percent_change_24h:-1} }
if(sort=="Worsein24h%"){ sortx={ percent_change_24h:1} }
if(sort=="Bestin7d%"){ sortx={ percent_change_7d:-1} }
if(sort=="Worsein7d%"){ sortx={ percent_change_7d:1} }

  cursor.sort(sortx)

  
const m = cursor.all()

  
setList(m)
}

}, [SearchText , sort,MIN,MAX])

 
const[Info ,setInfo ]=useState( false)
const { isOpen, onOpen, onClose } = useDisclosure()
const[InfoCoin ,setInfoCoin ]=useState([])
const[linkCoin ,setLinkCoin ]=useState([])
const[chartData ,setChartData ]=useState([])

const[onOpenX ,setonOpenX ]=useState()






function setcoin(index) {
  
 


  setInfo(index)

  onOpen(true)

  axios({
    method: 'get',
    url: `https://api.coinpaprika.com/v1/coins/${list[index].id}`,
  })
    .then(function (response) {
      console.log(response.data)
      setInfoCoin(response.data)

     let links = {}

      response.data.links_extended.map(e=> 
        
        links[`${e.type}`] = e.url
        
        )
 
        setLinkCoin(links)







    });



  

 



  let now = new Date();
  const dateString = moment(now).format('YYYY-MM-DD')
  const dateString2 = moment(now).format('MM-DD')
  axios({
    method: 'get',
    url: `https://api.coinpaprika.com/v1/coins/${list[index].id}/ohlcv/historical?start=2020-${dateString2}&end=${dateString}`,
  })
    .then(function (response) {
     



 const ChartData = response.data.map(e => ({
  time: `${moment(e.time_close).format('YYYY-MM-DD')}`,
  value: e.close,
}))



setChartData(ChartData);
setonOpenX(true)





    });
  


}

function close() {
  onClose (false)
  setonOpenX(false)
}

const { isOpen:isOpenham, onOpen:onOpenham, onClose:onCloseham } = useDisclosure()

const onlyWidth = useWindowWidth()

  return (
    <>

<Script src="./lightweight-charts.standalone.production.js" ></Script>
    
<Flex height="100vh" >


<Sidebar/>


<Box width="100%" height="100%" float="left" className={"animate__animated animate__backInDown"}>


<Flex alignItems="center" justifyContent="space-around"  width="100%" height="5rem">

<Flex display={{base:"flex" ,T869:"none" }}  onClick={onOpenham} cursor="pointer" justifyContent="center" alignItems="center" background="rgb(74 74 74)" height="2rem" width="3rem" >
   <HamburgerIcon  />  
   </Flex>

<InputGroup width="80%"  size="sm">
    <InputLeftAddon children={<CgSearch style={{width:"80%" , height:"80%"}} />}  />
    <Input onChange={e => setSearchText(e.target.value) } background="rgb(74 74 74)" placeholder="Search...." />





     
    
    
    <Popover placement="bottom-end" >
  <PopoverTrigger>
    <Flex cursor="pointer" justifyContent="center" alignItems="center" background="rgb(74 74 74)" width="3rem" >
   <VscSettingsGear  />  
   </Flex>
  </PopoverTrigger>
  
  <PopoverContent width="17rem">
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Filters</PopoverHeader>
    <PopoverBody>
<Text>Price</Text>


<InputGroup  size="sm"  >
    <InputLeftAddon width="3.5rem" children="MAX"/>
    <Input type="number" onChange={e=>setMAX(e.target.value)} placeholder={1000000000} />
  </InputGroup>

  <InputGroup marginTop="0.5rem" size="sm" >
    <InputLeftAddon width="3.5rem"  children="MIN" />
    <Input type="number" onChange={e=>setMiN(e.target.value)} placeholder={0} />
  </InputGroup>

  <Divider marginTop="0.7rem" orientation="horizontal" />

  <Text>Sorting</Text>



<InputGroup marginTop="0.2rem" size="sm" >
    <InputLeftAddon width="4rem"  children="Gain%" />
    <Select onChange={e=>setSort(e.target.value)} size="sm" placeholder="None">
  <option value="Bestin1h%">Best in 1h%</option>
  <option value="Bestin24h%">Best in 24h%</option>
  <option value="Bestin7d%">Best in 7d%</option>
  <option value="Worsein1h%">Worse in 1h%</option>
  <option value="Worsein24h%">Worse in 24h%</option>
  <option value="Worsein7d%">Worse in 7d%</option>
</Select>
  </InputGroup>


    </PopoverBody>
  </PopoverContent>
</Popover>
    
    
 
  </InputGroup>

</Flex>


<Center alignItems="normal !important"  width="100%" height="calc( 100% - 5rem )">

<Box position="relative" zIndex="5" overflow="hidden"  borderRadius="25px" border="solid 2px #14a76c" boxShadow="0px 0px 21px 5px  #14a76c" width={{base:"95%" ,T869:"85%" }} height="95%" className={"animate__animated animate__fadeInUpBig"}>




<Box className="mainbox"  overflow="auto" width="100%" height="100%" >


			
		{ coinListLoading  ? <>
	
			<Virtuoso className="mainbox" style={{ height: '100%' ,width:"100%" }} totalCount={list.length} itemContent=
			{(index) => 
			
			

<StatGroup cursor="pointer" _hover={{backgroundColor:"#ffe40050"}} onClick={ ()=> setcoin(index)}  background={index % 2 === 0 ? "#74747450" : "#272727"} >



<Flex margin="10px"  alignSelf="center" justifyContent="center" height="100%" width={{base:"100%" ,phoneL:"12.5rem",T1412:"100%",T1650:"120px" }} > <Image src={`https://static.coinpaprika.com/coin/${list[index].id}/logo.png`} width="80px" height="80px" alt="img"/> </Flex>

<Flex  margin="10px"  justifyContent="center" height="100%" width={{base:"100%" ,phoneL:"12.5rem"}} >
  <Stat >
    <StatLabel>NAME</StatLabel>
    <StatNumber fontSize="1.2rem" >{list[index].name}</StatNumber>
    <StatHelpText>
	{list[index].symbol}
    </StatHelpText>
  </Stat>
  </Flex>

  <Flex  margin="10px" justifyContent="center" height="100%" width={{base:"100%" ,phoneL:"12.5rem"}} >

  <Stat>
    <StatLabel>PRICE</StatLabel>
    <StatNumber fontSize="1.2rem" >{`${list[index].price_usd}`.substring(0, 9)} $</StatNumber>
    <StatHelpText>
      <StatArrow type={`${list[index].percent_change_1h > 0 ? "increase": "decrease" }`} />
	  1h%: {list[index].percent_change_1h}
    </StatHelpText>
	<StatHelpText>
      <StatArrow type={`${list[index].percent_change_24h > 0 ? "increase": "decrease" }`} />
     24h%: {list[index].percent_change_24h}
    </StatHelpText>
	<StatHelpText>
      <StatArrow type={`${list[index].percent_change_7d > 0 ? "increase": "decrease" }`} />
     7d%: {list[index].percent_change_7d}
    </StatHelpText>
  </Stat>

  </Flex>


  <Flex  margin="10px"  justifyContent="center" height="100%" width={{base:"100%" ,phoneL:"12.7rem"}} >
  <Stat>
    <StatLabel>MARKET CAP</StatLabel>
    <StatNumber>{list[index].market_cap_usd} $</StatNumber>
    <StatHelpText>
	MAX SUPPLY: {list[index].max_supply}
    </StatHelpText>
	<StatHelpText>
	TOTAL SUPPLY: {list[index].total_supply}
    </StatHelpText>
  </Stat>

  </Flex>



</StatGroup>


			}
			/>
	

	

  

 </> :<Center marginTop="20%"> <CircularProgress size="5rem" isIndeterminate color="green.300" /></Center>}


</Box>

</Box>

</Center>

</Box>


</Flex>



<Modal  isOpen={isOpen}  onClose={e=>close()} >
  <ModalOverlay />
  {  onOpenX  ? 
  <ModalContent maxWidth="95%" width="95%" >
    <ModalHeader> {list[Info].name}   <Flex justifyContent="center" alignItems="center"  > <Image  src={`https://static.coinpaprika.com/coin/${list[Info].id}/logo.png`} width="100px" height="100px" alt="img"/>  
    
    
    </Flex>
     </ModalHeader>

    <ModalCloseButton  />
    <ModalBody >
  <Flex flexWrap="wrap" width="100%" >

<Flex order={{base:"3", padS:"1" }} justifyContent="center" width={{ base:"100%",padS:"13rem"}} > 

<Stack direction="column" spacing={4} paddingTop="1rem" paddingBottom="1rem" >

{linkCoin.website &&
<Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#EA9990" >
     <Center height="100%" > 
      <Text fontSize="0.5rem" >  
       {normalizeUrl(`${linkCoin.website}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#EA999099" > 
      <CgWebsite style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#EA999099" >
      <CopyToClipboard text={`${linkCoin.website}`} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}

{linkCoin.facebook &&
<Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#3b5998" >
     <Center height="100%" > 
      <Text fontSize="0.5rem" >  
       {normalizeUrl(`${linkCoin.facebook}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#3b599899" > 
      <CgFacebook style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#3b599899" >
      <CopyToClipboard text={linkCoin.facebook} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}

{linkCoin.twitter &&
  <Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#1DA1F2" >
     <Center height="100%" > 
      <Text fontSize="0.5rem" >  
       {normalizeUrl(`${linkCoin.twitter}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#1DA1F299" > 
      <CgTwitter style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#1DA1F299" >
      <CopyToClipboard text={linkCoin.twitter} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}

{linkCoin.source_code &&
  <Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#171515" >
     <Center height="100%" > 
      <Text paddingLeft="40px" fontSize="0.5rem"  >  
       {normalizeUrl(`${linkCoin.source_code}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#17151599" > 
      <CgCodeSlash style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#17151599" >
      <CopyToClipboard text={linkCoin.source_code} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}

{linkCoin.youtube &&
  <Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#c4302b" >
     <Center height="100%" > 
      <Text paddingLeft="40px" fontSize="0.5rem"  >  
       {normalizeUrl(`${linkCoin.youtube}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#c4302b99" > 
      <CgYoutube style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#c4302b99" >
      <CopyToClipboard text={linkCoin.youtube} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}

{linkCoin.reddit &&
  <Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#ff4500" >
     <Center height="100%" > 
      <Text paddingLeft="40px" fontSize="0.5rem"  >  
       {normalizeUrl(`${linkCoin.reddit}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#ff450099" > 
      <FcReddit style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#ff450099" >
      <CopyToClipboard text={linkCoin.reddit} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}

{linkCoin.discord &&
  <Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#5865F2" >
     <Center height="100%" > 
      <Text paddingLeft="40px" fontSize="0.5rem"  >  
       {normalizeUrl(`${linkCoin.discord}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#5865F299" > 
      <SiDiscord style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#5865F299" >
      <CopyToClipboard text={linkCoin.discord} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}

{linkCoin.telegram &&
  <Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#0088cc" >
     <Center height="100%" > 
      <Text paddingLeft="40px" fontSize="0.5rem"  >  
       {normalizeUrl(`${linkCoin.telegram}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#0088cc99" > 
      <SiTelegram style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#0088cc99" >
      <CopyToClipboard text={linkCoin.telegram} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}

{linkCoin.blog &&
  <Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#fc4f08" >
     <Center height="100%" > 
      <Text paddingLeft="40px" fontSize="0.5rem"  >  
       {normalizeUrl(`${linkCoin.blog}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#fc4f0899" > 
      <FaBlog style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#fc4f0899" >
      <CopyToClipboard text={linkCoin.blog} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}

{linkCoin.wallet &&
  <Flex borderRadius="10px" overflow="hidden"  width="11rem" height="2rem" >
   <Box  height="100%" width="6rem" background="#f3b51a" >
     <Center height="100%" > 
      <Text paddingLeft="40px" fontSize="0.5rem"  >  
       {normalizeUrl(`${linkCoin.wallet}`, {stripProtocol: true})}
      </Text>
     </Center>
    </Box>
    <Box height="100%"  width="2.5rem" background="#f3b51a99" > 
      <IoWallet style={{ borderRight:"1px solid white",margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
    </Box> 
    <Box height="100%" width="2.5rem" background="#f3b51a99" >
      <CopyToClipboard text={linkCoin.wallet} onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}>
        <span style={{cursor:"pointer"}}>
          <CgCopy style={{margin:"auto", marginTop:"10%" , width:"80%" ,height:"80%" }} />
        </span>
      </CopyToClipboard>
    </Box> 
  </Flex>
}
</Stack>

</Flex> 

<Center order={{base:"1", padS:"2" }} flexWrap="wrap" paddingLeft={{base:"0", padS:"40px"}} paddingRight={{base:"0", padS:"40px"}} width={{base:"100%",padS:"calc( 100% - 13rem )"}}>

<Box width="100%" height="400px" className="chartt"></Box>
<Schart data={chartData} />


<Box width="100%" > 





<Box marginTop="50px" marginBottom="50px" > Description:  <Text>  {InfoCoin.description}  </Text>  </Box>




</Box>


</Center>




<Flex  flexWrap="wrap" order={{base:"2", padS:"3" }} >
<Box  margin="10px" marginTop="20px" width="13rem">
<Stat>
    <StatLabel>MARKET CAP</StatLabel>
    <StatNumber>{list[Info].market_cap_usd} $</StatNumber>
    <StatHelpText>
	MAX SUPPLY: {list[Info].max_supply}
    </StatHelpText>
	<StatHelpText>
	TOTAL SUPPLY: {list[Info].total_supply}
    </StatHelpText>
  </Stat>
  </Box>

  <Box  margin="10px"  marginTop="20px" width="13rem">
  <Stat>
    <StatLabel>PRICE</StatLabel>
    <StatNumber  >{`${list[Info].price_usd}`.substring(0, 9)} $</StatNumber>
    <StatHelpText>
      <StatArrow type={`${list[Info].percent_change_1h > 0 ? "increase": "decrease" }`} />
	  1h%: {list[Info].percent_change_1h}
    </StatHelpText>
	<StatHelpText>
      <StatArrow type={`${list[Info].percent_change_24h > 0 ? "increase": "decrease" }`} />
     24h%: {list[Info].percent_change_24h}
    </StatHelpText>
	<StatHelpText>
      <StatArrow type={`${list[Info].percent_change_7d > 0 ? "increase": "decrease" }`} />
     7d%: {list[Info].percent_change_7d}
    </StatHelpText>
  </Stat>
  </Box>






<Box margin="10px" marginTop="20px" >
  <Stat  >
    <StatLabel>Info</StatLabel>
 
<StatHelpText><Link href={`${InfoCoin.whitepaper.link}`} isExternal >Download Whitepaper</Link> </StatHelpText>
<StatHelpText><Text>Hash Algorithm: {InfoCoin.hash_algorithm}</Text> </StatHelpText>
<StatHelpText>  <Text>Start Date: {moment(InfoCoin.first_data_at).format('YYYY-MM-DD')}</Text> </StatHelpText>

  </Stat>
  </Box>


<Box margin="10px" marginTop="20px" width="100%">
  <Stat  >
    <StatLabel>Team</StatLabel>
    {

      InfoCoin.team.map(e=><>  
<StatHelpText>{e.position}: {e.name} </StatHelpText>
 
</>
      )}
  </Stat>
  </Box>





</Flex>




  </Flex>
    </ModalBody>


  </ModalContent>
   : <Center position="absolute" width="100%" zIndex="1000" top="0" marginTop="20%"> <CircularProgress size="5rem" isIndeterminate color="green.300" /></Center>}
</Modal>

{onlyWidth < 869 &&

<Drawer  placement="left" onClose={onCloseham} isOpen={isOpenham}>
        <DrawerOverlay/>
        <DrawerContent>
        <DrawerCloseButton style={{marginRight:'15rem',color:'#ff652f',border:'1px solid #ff652f'}}/>
        <Box  right="0" width="100%"  background="#747474" height="100vh" borderRadius='0px 100px 100px 0px' overflow='auto' className='scroll'>

<Stack width="100%" direction="column" spacing="24px">
<Center>
<Image width="10rem"  src="./logo.png"  alt="img"/>

</Center>

<Center  marginTop="0 !important" >

<Text color="#ffe400" style={{fontWeight:'700'}} > CRYPTO HOME </Text>

  

</Center>
<center>
<hr width='90%' color='#ffe400'/>
</center>

<Flex justifyContent="center" width="100%" height="5rem"  ><AiFillTwitterSquare style={{borderRadius:"25px" ,background:"#1DA1F2",height:"5rem",width:"5rem" }} onClick={() => router.push("https://twitter.com/globalgroup16?s=09")} cursor="pointer" className={"twitter"}/></Flex>
<CopyToClipboard text="globalgroup9978@gmail.com" onCopy={() =>toast({description: "Copied",status: "success",isClosable: true,})}><Flex justifyContent="center" width="100%" height="5rem" > <MdEmail style={{borderRadius:"25px" ,background:"#EA9990", height:"5rem",width:"5rem" }} className={"twitter"}/> </Flex></CopyToClipboard>
<Flex justifyContent="center" width="100%" height="5rem" > <FaGithubSquare style={{borderRadius:"25px" ,background:"#EA9990", height:"5rem",width:"5rem" }} onClick={() => router.push("https://github.com/angelhtml")} cursor="pointer" className={"twitter"}/> </Flex>


</Stack>





</Box>
        </DrawerContent>
      </Drawer>


}
    </>
  )
}

