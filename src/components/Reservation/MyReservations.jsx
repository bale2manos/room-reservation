import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Alert,
    AlertIcon,
    Badge
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useReservations } from '../../context/ReservationContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '@chakra-ui/react'

export function MyReservations() {
    const { getUserReservations, cancelReservation } = useReservations()
    const { user } = useAuth()
    const toast = useToast()

    const userReservations = getUserReservations(user.username)

    const handleCancelReservation = (reservationId) => {
        cancelReservation(reservationId)
        toast({
            title: 'Reservation Cancelled',
            status: 'info',
            duration: 3000,
        })
    }

    return (
        <Box>
            <Heading mb={6}>My Reservations</Heading>
            {userReservations.length === 0 ? (
                <Alert status="info">
                    <AlertIcon />
                    You don't have any reservations yet.
                </Alert>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>DATE</Th>
                            <Th>TIME</Th>
                            <Th>LIBRARY</Th>
                            <Th>ROOM</Th>
                            <Th>STATUS</Th>
                            <Th>ACTIONS</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {userReservations.map((reservation) => (
                            <Tr key={reservation.id}>
                                <Td>{reservation.date}</Td>
                                <Td>{reservation.time}</Td>
                                <Td>
                                    {reservation.library.charAt(0).toUpperCase() + 
                                     reservation.library.slice(1)}
                                </Td>
                                <Td>{reservation.roomName}</Td>
                                <Td>
                                    <Badge
                                        colorScheme={
                                            reservation.status === 'active' 
                                                ? 'primary' 
                                                : 'red'
                                        }
                                    >
                                        {reservation.status.toUpperCase()}
                                    </Badge>
                                </Td>
                                <Td>
                                    {reservation.status === 'active' && (
                                        <Button
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => handleCancelReservation(reservation.id)}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    )
}