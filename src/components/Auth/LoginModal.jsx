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
import { useTranslation } from 'react-i18next';

export function LoginModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const toast = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      toast({
        title: t('auth.errors.title'),
        description: t('auth.errors.fillFields'),
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
      title: t('auth.welcome', { username }),
      description: t('auth.loginSuccess'),
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
        <ModalHeader>{t('auth.header')}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>{t('auth.username')}</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('auth.usernamePlaceholder')}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('auth.password')}</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.passwordPlaceholder')}
                />
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" onClick={handleSubmit}>
            {t('auth.loginButton')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 