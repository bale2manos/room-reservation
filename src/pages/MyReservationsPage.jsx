import { MyReservations } from '../components/Reservation/MyReservations'
import { Box, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export function MyReservationsPage() {
  const { t } = useTranslation()

  return (
    <Box p={4}>
      <MyReservations />
    </Box>
  )
} 