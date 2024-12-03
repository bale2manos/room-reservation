import { Box, Heading, SkipNavLink, Flex, Avatar, Text, Image, Menu, MenuButton, MenuList, MenuItem, Icon, MenuDivider } from '@chakra-ui/react'
import { CalendarIcon, SettingsIcon, ExternalLinkIcon, AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleMenuClick = (path) => {
    navigate(path)
  }

  return (
    <Box as="header" bg="primary.500" color="white" p={4}>
      <SkipNavLink>{t('layout.header.skipNav')}</SkipNavLink>
      
      <Flex justify="space-between" align="center">
        <Flex 
          align="center" 
          gap={4} 
          cursor="pointer" 
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          _focus={{
            outline: '2px solid white',
            outlineOffset: '2px',
            borderRadius: 'md',
          }}
          p={2}
        >
          <Image
            src="https://www.uc3m.es/ss/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1371588158204&ssbinary=true"
            alt="UC3M Logo"
            height="40px"
            filter="brightness(0) invert(1)"
          />
          <Heading size="lg">
            {t('layout.header.title')}
          </Heading>
        </Flex>

        <Flex align="center" gap={4}>
          <LanguageSwitcher />
          {user && (
            <Menu>
              <MenuButton
                p={2}
                _focus={{
                  outline: '2px solid white',
                  outlineOffset: '2px',
                  borderRadius: 'md',
                }}
              >
                <Flex align="center" gap={2}>
                  <Text fontSize="sm">{user.username}</Text>
                  <Avatar
                    size="sm"
                    name={user.username}
                    src={user.avatar}
                  />
                  <ChevronDownIcon />
                </Flex>
              </MenuButton>
              <MenuList color="gray.700">
                <MenuItem
                  icon={<Icon as={AddIcon} />}
                  onClick={() => handleMenuClick('/')}
                  _focus={{
                    bg: 'primary.50',
                    color: 'primary.700',
                  }}
                >
                  {t('common.bookRoom')}
                </MenuItem>
                <MenuItem
                  icon={<Icon as={CalendarIcon} />}
                  onClick={() => handleMenuClick('/reservations')}
                  _focus={{
                    bg: 'primary.50',
                    color: 'primary.700',
                  }}
                >
                  {t('common.myReservations')}
                </MenuItem>
                <MenuItem
                  icon={<Icon as={SettingsIcon} />}
                  onClick={() => handleMenuClick('/profile')}
                  _focus={{
                    bg: 'primary.50',
                    color: 'primary.700',
                  }}
                >
                  {t('common.profile')}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  icon={<Icon as={ExternalLinkIcon} />}
                  onClick={logout}
                  _focus={{
                    bg: 'primary.50',
                    color: 'primary.700',
                  }}
                >
                  {t('common.logout')}
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}