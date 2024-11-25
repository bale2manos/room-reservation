import { createContext, useContext, useState, useEffect } from 'react'

const ReservationContext = createContext(null)

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(() => {
    const savedReservations = localStorage.getItem('reservations')
    return savedReservations ? JSON.parse(savedReservations) : []
  })

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations))
  }, [reservations])

  const addReservation = (reservation) => {
    setReservations(prev => [...prev, reservation])
  }

  const cancelReservation = (reservationId) => {
    setReservations(prev => prev.filter(res => res.id !== reservationId))
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