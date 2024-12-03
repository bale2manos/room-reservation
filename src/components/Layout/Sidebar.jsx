import {
    Box,
    VStack,
    Link,
    Icon,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { CalendarIcon, SettingsIcon, ExternalLinkIcon, AddIcon } from '@chakra-ui/icons'
  import { Link as RouterLink } from 'react-router-dom'
  import { useAuth } from '../../context/AuthContext'
  import { useNavigate } from 'react-router-dom'
  import { useTranslation } from 'react-i18next'
  
  export function Sidebar() {
    const { t } = useTranslation();
    const { logout } = useAuth()
    const bgColor = useColorModeValue('gray.50', 'gray.900')
    const borderColor = useColorModeValue('gray.200', 'gray.700')
  
    const navItems = [
      {
        icon: AddIcon,
        label: t('common.bookRoom'),
        to: '/'
      },
      {
        icon: CalendarIcon,
        label: t('common.myReservations'),
        to: '/reservations'
      },
      {
        icon: SettingsIcon,
        label: t('common.profile'),
        to: '/profile'
      }
    ]
  
    return (
      <Box
        as="nav"
        aria-label={t('layout.sidebar.mainNav')}
        w="240px"
        bg={bgColor}
        borderRight="1px"
        borderColor={borderColor}
        h="calc(100vh - 64px)"
        py={4}
      >
        <VStack spacing={2} align="stretch">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              to={item.to}
              label={item.label}
            />
          ))}
          <NavItem
            icon={ExternalLinkIcon}
            onClick={logout}
            label={t('common.logout')}
            isLogout={true}
          />
        </VStack>
  
        <Box pt={8} px={4}>
          <Text fontSize="sm" color="gray.500">
            {t('layout.sidebar.needHelp')}{' '}
            <Link
              href="mailto:biblioteca@db.uc3m.es"
              color="primary.500"
              isExternal
            >
              biblioteca@db.uc3m.es
            </Link>
          </Text>
        </Box>
      </Box>
    )
  }
  
  function NavItem({ icon: IconComponent, label, onClick, to, isLogout }) {
    const navigate = useNavigate()
    const { logout } = useAuth()
  
    const handleClick = () => {
      if (isLogout) {
        navigate('/')
        setTimeout(() => {
          logout()
        }, 100)
      } else if (onClick) {
        onClick()
      }
    }
  
    const Component = isLogout ? Box : (to ? RouterLink : Box)
    const props = isLogout ? {
      as: 'button',
      onClick: handleClick,
      width: '100%',
      tabIndex: 0,
    } : (to ? { to } : { onClick: handleClick })
  
    return (
      <Box
        as={Component}
        {...props}
        style={{ textDecoration: 'none' }}
        px={4}
        py={2}
        color="gray.700"
        _hover={{
          bg: 'primary.50',
          color: isLogout ? 'red.700' : 'primary.700',
        }}
        _focus={{
          outline: '2px solid',
          outlineColor: 'primary.500',
          bg: 'primary.50',
        }}
        display="flex"
        alignItems="center"
        cursor="pointer"
        width="100%"
        role={isLogout ? 'button' : undefined}
      >
        <Icon as={IconComponent} mr={2} />
        <Text>{label}</Text>
      </Box>
    )
  }