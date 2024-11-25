import { Box, Button, toast, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReservationForm } from './ReservationForm'
import { RoomAvailability } from './RoomAvailability'
import { useReservations } from '../../context/ReservationContext'
import { useAuth } from '../../context/AuthContext'

export function ReservationSystem() {
  const { addReservation } = useReservations()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [showRoomSelection, setShowRoomSelection] = useState(false)
  const [formData, setFormData] = useState(null)

  const handleFormSubmit = (data) => {
    setFormData(data)
    setShowRoomSelection(true)
  }

  const handleRoomSelect = (room) => {
    const newReservation = {
      id: Date.now().toString(),
      username: user.username,
      library: formData.library,
      roomId: room.id,
      roomName: room.name,
      date: formData.date,
      time: formData.time,
      status: 'active',
      createdAt: new Date().toISOString()
    }

    addReservation(newReservation)
    toast({
      title: 'Room Reserved!',
      description: `You have successfully reserved ${room.name}`,
      status: 'success',
      duration: 3000,
    })
    
    // Reset form and redirect to reservations page
    setShowRoomSelection(false)
    setFormData(null)
    navigate('/reservations')
  }

  return (
    <Box>
      {!showRoomSelection ? (
        <ReservationForm onSubmit={handleFormSubmit} />
      ) : (
        <>
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={() => setShowRoomSelection(false)}
            mb={4}
          >
            Back to Form
          </Button>
          <RoomAvailability
            onRoomSelect={handleRoomSelect}
            formData={formData}
          />
        </>
      )}
    </Box>
  )
}