import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Heading,
  useToast,
  Container,
  Center,
} from '@chakra-ui/react'

export function ProfilePage() {
  const { t } = useTranslation()
  const { user, login } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const fileInputRef = useRef()
  const toast = useToast()

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        login({
          ...user,
          avatar: reader.result,
        })
        toast({
          title: t('pages.profile.success.photoUpdate'),
          status: 'success',
          duration: 3000,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
      ...user,
      name,
      email,
    })
    toast({
      title: t('pages.profile.success.profileUpdate'),
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8}>
        <Heading>{t('pages.profile.title')}</Heading>
        
        <Center flexDirection="column">
          <Avatar
            size="2xl"
            name={user?.name}
            src={user?.avatar}
            cursor="pointer"
            onClick={handleAvatarClick}
            mb={4}
          />
          <Button size="sm" colorScheme="primary" onClick={handleAvatarClick}>
            {t('pages.profile.changePhoto')}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Center>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>{t('pages.profile.name')}</FormLabel>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="lg"
              />
            </FormControl>

            <FormControl>
              <FormLabel>{t('pages.profile.email')}</FormLabel>
              <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
            </FormControl>

            <Button 
              type="submit" 
              colorScheme="primary" 
              size="lg"
              width="100%"
            >
              {t('pages.profile.save')}
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  )
} 