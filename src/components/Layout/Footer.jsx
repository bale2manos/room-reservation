import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    Image,
    Divider,
  } from '@chakra-ui/react'
  
  export function Footer() {
    return (
      <Box
        as="footer"
        role="contentinfo"
        bg="white"
        borderTop="1px"
        borderColor="gray.200"
        py={6}
      >
        <Container maxW="container.xl">
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align="center"
              spacing={4}
            >
              <Text fontSize="sm">
                For comments and suggestions, please email:{' '}
                <Link
                  href="mailto:biblioteca@db.uc3m.es"
                  color="uc3m.500"
                  isExternal
                >
                  biblioteca@db.uc3m.es
                </Link>
              </Text>
  
              <Stack direction="row" spacing={4}>
                <Link
                  href="https://www.uc3m.es"
                  isExternal
                  aria-label="Visit UC3M website"
                >
                  <Image
                    h="32px"
                    src="/uc3m-logo.png"
                    alt="UC3M Logo"
                  />
                </Link>
              </Stack>
            </Stack>
  
            <Divider />
  
            <Text fontSize="sm" color="gray.500" textAlign="center">
              © {new Date().getFullYear()} Universidad Carlos III de Madrid. 
              All rights reserved.
            </Text>
  
            <Text fontSize="xs" color="gray.400" textAlign="center">
              Developed by: Servei de Biblioteques, Publicacions y Arxius. 
              Universitat Politècnica de Catalunya · BarcelonaTech
            </Text>
          </Stack>
        </Container>
      </Box>
    )
  }