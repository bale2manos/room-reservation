import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export function LoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const toast = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
      })
      return
    }

    login({
      username,
      avatar: null,
      email: `${username}@example.com`,
      name: username,
    })
    
    toast({
      title: `Welcome ${username}!`,
      description: 'You have successfully logged in',
      status: 'success',
      duration: 3000,
      position: 'top',
    })
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        backdropFilter='blur(8px)'
        bg='blackAlpha.300'
      />
      <ModalContent>
        <ModalHeader>Welcome to UC3M Library</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" onClick={handleSubmit}>
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 