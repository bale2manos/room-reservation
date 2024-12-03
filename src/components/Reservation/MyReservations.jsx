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
import { useTranslation } from 'react-i18next'

export function MyReservations() {
    const { getUserReservations, cancelReservation } = useReservations()
    const { user } = useAuth()
    const toast = useToast()
    const { t } = useTranslation()

    const userReservations = getUserReservations(user.username)

    const handleCancelReservation = (reservationId) => {
        cancelReservation(reservationId)
        toast({
            title: t('reservation.myReservations.cancel'),
            status: 'info',
            duration: 3000,
        })
    }

    return (
        <Box>
            <Heading mb={6}>{t('reservation.myReservations.title')}</Heading>
            {userReservations.length === 0 ? (
                <Alert status="info">
                    <AlertIcon />
                    {t('reservation.myReservations.noReservations')}
                </Alert>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>{t('reservation.myReservations.table.date')}</Th>
                            <Th>{t('reservation.myReservations.table.time')}</Th>
                            <Th>{t('reservation.myReservations.table.library')}</Th>
                            <Th>{t('reservation.myReservations.table.room')}</Th>
                            <Th>{t('reservation.myReservations.table.status')}</Th>
                            <Th>{t('reservation.myReservations.table.actions')}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {userReservations.map((reservation) => (
                            <Tr key={reservation.id}>
                                <Td>{reservation.date}</Td>
                                <Td>{reservation.timeSlot || reservation.time}</Td>
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
                                        {reservation.status === 'active' 
                                            ? t('reservation.roomAvailability.status.active')
                                            : t('reservation.roomAvailability.status.inactive')}
                                    </Badge>
                                </Td>
                                <Td>
                                    {reservation.status === 'active' && (
                                        <Button
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => handleCancelReservation(reservation.id)}
                                        >
                                            {t('reservation.myReservations.cancel')}
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