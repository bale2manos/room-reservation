import { Box, Heading, SkipNavLink } from '@chakra-ui/react'

export function Header() {
  return (
    <Box as="header" bg="uc3m.500" color="white" p={4}>
      {/* Skip to main content link for keyboard users */}
      <SkipNavLink>Skip to main content</SkipNavLink>
      
      <Heading size="lg">
        UC3M Library Room Reservation
      </Heading>
    </Box>
  )
}