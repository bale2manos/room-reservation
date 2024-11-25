import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Center,
  useToast,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

export function ProfilePage() {
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
          title: 'Success',
          description: 'Profile photo updated',
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
      title: 'Success',
      description: 'Profile updated successfully',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <Heading>My Profile</Heading>
        
        <Center>
          <Box position="relative">
            <Avatar
              size="2xl"
              src={user?.avatar}
              name={user?.name}
              cursor="pointer"
              onClick={handleAvatarClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Box>
        </Center>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                type="email"
              />
            </FormControl>

            <Button type="submit" colorScheme="primary" alignSelf="flex-start">
              Save Changes
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  )
} 