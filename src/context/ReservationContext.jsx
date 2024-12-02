import { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const ReservationContext = createContext(null)

export function ReservationProvider({ children }) {
  const { t } = useTranslation()
  const [reservations, setReservations] = useState(() => {
    const savedReservations = localStorage.getItem('reservations')
    return savedReservations ? JSON.parse(savedReservations) : []
  })

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations))
  }, [reservations])

  const addReservation = (reservation) => {
    // Validate date is not in the past
    if (new Date(reservation.date) < new Date()) {
      throw new Error(t('context.reservation.errors.pastDateTime'))
    }

    // Check if room is available
    if (!isRoomAvailable(reservation.library, reservation.roomId, reservation.date, reservation.time)) {
      throw new Error(t('context.reservation.errors.roomNotAvailable'))
    }

    setReservations(prev => [...prev, reservation])
    return t('context.reservation.success.reservationAdded')
  }

  const cancelReservation = (reservationId) => {
    const reservationExists = reservations.some(res => res.id === reservationId)
    if (!reservationExists) {
      throw new Error(t('context.reservation.errors.reservationNotFound'))
    }

    setReservations(prev => prev.filter(res => res.id !== reservationId))
    return t('context.reservation.success.reservationCancelled')
  }

  const isRoomAvailable = (library, roomId, date, time) => {
    return !reservations.some(res => 
      res.library === library && 
      res.roomId === roomId && 
      res.date === date && 
      res.time === time &&
      res.status === 'active'
    )
  }

  const getUserReservations = (username) => {
    return reservations.filter(res => res.username === username)
  }

  return (
    <ReservationContext.Provider value={{ 
      reservations, 
      addReservation, 
      cancelReservation, 
      isRoomAvailable,
      getUserReservations 
    }}>
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservations = () => useContext(ReservationContext) 