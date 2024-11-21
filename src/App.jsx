import { ChakraProvider, Box } from '@chakra-ui/react'
import { Header } from './components/Layout/Header'
import { Sidebar } from './components/Layout/Sidebar'
import { Footer } from './components/Layout/Footer'
import { ReservationSystem } from './components/Reservation/ReservationSystem'
import { theme } from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Header />
        <Box display="flex" flex="1">
          <Sidebar />
          <Box flex="1" p={4}>
            <ReservationSystem />
          </Box>
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  )
}

export default App