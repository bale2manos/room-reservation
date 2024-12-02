import { ChakraProvider, Box, useDisclosure } from '@chakra-ui/react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Header } from './components/Layout/Header'
import { Sidebar } from './components/Layout/Sidebar'
import { Footer } from './components/Layout/Footer'
import { ReservationSystem } from './components/Reservation/ReservationSystem'
import { MyReservationsPage } from './pages/MyReservationsPage'
import { ProfilePage } from './pages/ProfilePage'
import { LoginModal } from './components/Auth/LoginModal'
import { AuthProvider, useAuth } from './context/AuthContext'
import { theme } from './theme'
import { useEffect } from 'react'
import { ReservationProvider } from './context/ReservationContext'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

function AppContent() {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      onOpen()
    }
  }, [user, onOpen])

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box display="flex" flex="1">
        <Sidebar />
        <Box flex="1" p={4}>
          <Routes>
            <Route path="/" element={<ReservationSystem />} />
            <Route path="/reservations" element={<MyReservationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <ReservationProvider>
            <AppContent />
          </ReservationProvider>
        </AuthProvider>
      </ChakraProvider>
    </I18nextProvider>
  )
}

export default App