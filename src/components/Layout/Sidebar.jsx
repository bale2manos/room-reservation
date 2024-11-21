import {
    Box,
    VStack,
    Link,
    Icon,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { CalendarIcon, SettingsIcon, ExternalLinkIcon } from '@chakra-ui/icons'
  import { Link as RouterLink } from 'react-router-dom'
  
  export function Sidebar() {
    const bgColor = useColorModeValue('gray.50', 'gray.900')
    const borderColor = useColorModeValue('gray.200', 'gray.700')
  
    return (
      <Box
        as="nav"
        aria-label="Main Navigation"
        w="240px"
        bg={bgColor}
        borderRight="1px"
        borderColor={borderColor}
        h="calc(100vh - 64px)" // Subtract header height
        py={4}
      >
        <VStack spacing={2} align="stretch">
          <NavItem
            icon={CalendarIcon}
            to="/reservations"
            label="My Reservations"
          />
          <NavItem
            icon={SettingsIcon}
            to="/profile"
            label="My Profile"
          />
          <NavItem
            icon={ExternalLinkIcon}
            to="/logout"
            label="Logout"
          />
        </VStack>
  
        <Box pt={8} px={4}>
          <Text fontSize="sm" color="gray.500">
            Need help? Contact{' '}
            <Link
              href="mailto:biblioteca@db.uc3m.es"
              color="uc3m.500"
              isExternal
            >
              biblioteca@db.uc3m.es
            </Link>
          </Text>
        </Box>
      </Box>
    )
  }
  
  function NavItem({ icon, to, label }) {
    return (
      <Link
        as={RouterLink}
        to={to}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Box
          display="flex"
          alignItems="center"
          p={2}
          mx={4}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'uc3m.500',
            color: 'white',
          }}
        >
          <Icon as={icon} mr={4} />
          <Text>{label}</Text>
        </Box>
      </Link>
    )
  }