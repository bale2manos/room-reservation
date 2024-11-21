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
import { useState } from 'react'

export function MyReservations({ newReservation }) {
    const [reservations, setReservations] = useState([])

    // Handle new reservation without useEffect
    if (newReservation && !reservations.some(res => 
        res.date === newReservation.date && 
        res.time === newReservation.timeSlot && 
        res.room === newReservation.room.name
    )) {
        setReservations(prev => [...prev, {
            id: Date.now(),
            date: newReservation.date,
            time: newReservation.timeSlot,
            library: newReservation.library,
            room: newReservation.room.name,
            status: 'active'
        }])
    }

    const handleCancelReservation = (id) => {
        setReservations(prev => 
            prev.map(res => 
                res.id === id 
                    ? { ...res, status: 'cancelled' }
                    : res
            )
        )
    }

    if (reservations.length === 0) {
        return (
            <Box>
                <Heading size="lg" mb={6}>My Reservations</Heading>
                <Alert status="info">
                    <AlertIcon />
                    You don't have any reservations yet.
                </Alert>
            </Box>
        )
    }

    return (
        <Box>
            <Heading size="lg" mb={6}>My Reservations</Heading>
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
                    {reservations.map((reservation) => (
                        <Tr key={reservation.id}>
                            <Td>{reservation.date}</Td>
                            <Td>{reservation.time}</Td>
                            <Td>
                                {reservation.library.charAt(0).toUpperCase() + 
                                 reservation.library.slice(1)}
                            </Td>
                            <Td>{reservation.room}</Td>
                            <Td>
                                <Badge
                                    colorScheme={
                                        reservation.status === 'active' 
                                            ? 'green' 
                                            : 'red'
                                    }
                                >
                                    {reservation.status}
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
        </Box>
    )
}