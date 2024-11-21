import {
    Box,
    FormControl,
    FormLabel,
    Select,
    Input,
    Button,
    VStack,
    useToast,
    Text
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export function ReservationForm({ onSubmit }) {
    const toast = useToast()
    const [selectedLibrary, setSelectedLibrary] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [timeSlots, setTimeSlots] = useState([])

    useEffect(() => {
        if (selectedDate) {
            const date = new Date(selectedDate)
            const day = date.getDay()
            
            if (day === 0) {
                setTimeSlots([])
                toast({
                    title: "Library Closed",
                    description: "The library is closed on Sundays",
                    status: "info",
                    duration: 3000,
                })
                return
            }

            const startHour = 9
            const endHour = day === 6 ? 14 : 21
            
            const slots = []
            for (let hour = startHour; hour < endHour; hour++) {
                slots.push({
                    id: hour,
                    time: `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`
                })
            }
            setTimeSlots(slots)
        }
    }, [selectedDate, toast])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const formData = {
            library: selectedLibrary,
            date: selectedDate,
            timeSlot: e.target.timeSlot.value
        }

        console.log('Submitting form data:', formData)
        onSubmit(formData)
    }

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                    <FormLabel htmlFor="library">Library</FormLabel>
                    <Select 
                        id="library" 
                        placeholder="Select library"
                        onChange={(e) => setSelectedLibrary(e.target.value)}
                        value={selectedLibrary}
                    >
                        <option value="getafe">CC.Sociales y Jurídicas - Getafe</option>
                        <option value="colmenarejo">Menéndez Pidal - Colmenarejo</option>
                        <option value="leganes">Biblioteca Escuela Politécnica Superior - Leganés</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input
                        id="date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        value={selectedDate}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel htmlFor="timeSlot">Time Slot</FormLabel>
                    <Select
                        id="timeSlot"
                        name="timeSlot"
                        placeholder="Select time slot"
                        isDisabled={!selectedDate || timeSlots.length === 0}
                    >
                        {timeSlots.map(slot => (
                            <option key={slot.id} value={slot.time}>
                                {slot.time}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <Button 
                    type="submit" 
                    colorScheme="blue"
                    isDisabled={!selectedLibrary || !selectedDate || timeSlots.length === 0}
                >
                    Check Available Rooms
                </Button>
            </VStack>
        </Box>
    )
}