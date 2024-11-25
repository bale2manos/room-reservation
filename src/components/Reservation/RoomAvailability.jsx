import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Heading,
    Button,
    Text,
    Stack
} from '@chakra-ui/react'
import { useReservations } from '../../context/ReservationContext'
import { useAuth } from '../../context/AuthContext'

export function RoomAvailability({ onRoomSelect, formData }) {
    const { isRoomAvailable } = useReservations()
    const { user } = useAuth()

    console.log('RoomAvailability formData:', formData) // Debug log

    // Generate rooms based on the selected library
    const availableRooms = (() => {
        switch(formData?.library) {
            case 'getafe':
                return Array.from({ length: 30 }, (_, i) => ({
                    id: `G${i + 1}`,
                    name: `Room G${i + 1}`,
                    capacity: Math.floor(Math.random() * 5) + 4 // 4-8 people
                }))
            case 'colmenarejo':
                return Array.from({ length: 10 }, (_, i) => ({
                    id: `C${i + 1}`,
                    name: `Room C${i + 1}`,
                    capacity: Math.floor(Math.random() * 3) + 4 // 4-6 people
                }))
            case 'leganes':
                return Array.from({ length: 22 }, (_, i) => ({
                    id: `L${i + 1}`,
                    name: `Room L${i + 1}`,
                    capacity: Math.floor(Math.random() * 4) + 4 // 4-7 people
                }))
            default:
                return []
        }
    })()

    return (
        <Box>
            <Stack spacing={6}>
                <Box>
                    <Heading size="lg" mb={2}>Available Rooms</Heading>
                    {formData && (
                        <Text fontSize="md" color="gray.600">
                            {formData.library.charAt(0).toUpperCase() + formData.library.slice(1)} Library - {formData.date} at {formData.timeSlot}
                        </Text>
                    )}
                </Box>

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ROOM</Th>
                            <Th>CAPACITY</Th>
                            <Th>STATUS</Th>
                            <Th>ACTIONS</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {availableRooms.map((room) => {
                            const isAvailable = isRoomAvailable(
                                formData.library,
                                room.id,
                                formData.date,
                                formData.time
                            )

                            return (
                                <Tr key={room.id}>
                                    <Td fontWeight="medium">{room.name}</Td>
                                    <Td>{room.capacity} people</Td>
                                    <Td>{isAvailable ? 'Available' : 'Booked'}</Td>
                                    <Td>
                                        <Button
                                            size="sm"
                                            colorScheme="primary"
                                            onClick={() => onRoomSelect(room)}
                                            isDisabled={!isAvailable}
                                        >
                                            Reserve
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Stack>
        </Box>
    )
}