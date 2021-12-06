import '../styles/globals.css';
import { ChakraProvider, extendTheme ,} from '@chakra-ui/react';
import { createBreakpoints } from "@chakra-ui/theme-tools"



const breakpoints = createBreakpoints({
  watchS:"198px",
  watchM:"225px",
  watchL:"228px",
  phoneS:"321px",
  phoneM:"361px",
  phoneL:"413px",
  padS:"769px",
  padM:"811px",
  padL:"1025px",
  pcS:"1281px",
  pcM:"1367px",
  pcL:"1441px",
  pcXL:"1621px",
  pcXXL:"1921px",

  T869:"869",
  T655:"655",
  T555:"540",
  T460:"460",
  T370:"360",
  T1412:"1410",
  T1650:"1660",
})


const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}


const theme = extendTheme({ config , breakpoints })



function MyApp({ Component, pageProps:{session, ...pageProps}, router }) {
  return (
    

      <ChakraProvider theme={theme}>

      <Component {...pageProps} />

    </ChakraProvider>

   
  )
}

export default MyApp
