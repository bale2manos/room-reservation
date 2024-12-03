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
import { useTranslation } from 'react-i18next'

export function ReservationForm({ onSubmit }) {
    const { t } = useTranslation()
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
                    title: t('reservation.form.closed.title'),
                    description: t('reservation.form.closed.message'),
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
    }, [selectedDate, toast, t])

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
                    <FormLabel htmlFor="library">{t('reservation.form.library.label')}</FormLabel>
                    <Select 
                        id="library" 
                        placeholder={t('reservation.form.library.placeholder')}
                        onChange={(e) => setSelectedLibrary(e.target.value)}
                        value={selectedLibrary}
                    >
                        <option value="getafe">{t('reservation.form.library.options.getafe')}</option>
                        <option value="colmenarejo">{t('reservation.form.library.options.colmenarejo')}</option>
                        <option value="leganes">{t('reservation.form.library.options.leganes')}</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel htmlFor="date">{t('reservation.form.date.label')}</FormLabel>
                    <Input
                        id="date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        value={selectedDate}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel htmlFor="timeSlot">{t('reservation.form.timeSlot.label')}</FormLabel>
                    <Select
                        id="timeSlot"
                        name="timeSlot"
                        placeholder={t('reservation.form.timeSlot.placeholder')}
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
                    {t('reservation.form.submit')}
                </Button>
            </VStack>
        </Box>
    )
}