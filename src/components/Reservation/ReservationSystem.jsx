import { Box, Button, Flex } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { MyReservations } from './MyReservations'
import { ReservationForm } from './ReservationForm'
import { RoomAvailability } from './RoomAvailability'

export function ReservationSystem() {
  const [step, setStep] = useState('form')
  const [formData, setFormData] = useState(null)
  const [newReservation, setNewReservation] = useState(null)

  const handleFormSubmit = (data) => {
    setFormData(data)
    setStep('availability')
  }

  const handleRoomSelect = (room) => {
    const reservationData = {
      ...formData,
      room: room
    }
    setNewReservation(reservationData)
    setStep('reservations')
  }

  const handleBack = () => {
    switch (step) {
      case 'availability':
        setStep('form')
        setFormData(null)
        break
      case 'reservations':
        setStep('availability')
        break
      default:
        break
    }
  }

  return (
    <Box>
      {step !== 'form' && (
        <Flex mb={6}>
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={handleBack}
            variant="ghost"
            aria-label="Go back to previous step"
          >
            Back
          </Button>
        </Flex>
      )}

      {step === 'form' && (
        <ReservationForm onSubmit={handleFormSubmit} />
      )}
      {step === 'availability' && formData && (
        <RoomAvailability 
          onRoomSelect={handleRoomSelect}
          formData={formData}
        />
      )}
      {step === 'reservations' && (
        <MyReservations newReservation={newReservation} />
      )}
    </Box>
  )
}