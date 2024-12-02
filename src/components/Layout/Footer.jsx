import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    Image,
    Divider,
  } from '@chakra-ui/react'
  import { useTranslation } from 'react-i18next'
  
  export function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
      <Box
        as="footer"
        bg="white"
        borderTop="1px"
        borderColor="gray.200"
        py={4}
      >
        <Container maxW="container.xl">
          <Stack spacing={4} direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
            <Stack direction="row" spacing={2} align="center">
              <Text color="gray.600">
                {t('layout.footer.comments')}{' '}
                <Link
                  href="mailto:biblioteca@db.uc3m.es"
                  color="primary.500"
                >
                  biblioteca@db.uc3m.es
                </Link>
              </Text>
            </Stack>
  
            <Stack direction="row" spacing={2} align="center">
              <Text color="gray.600">
                © {currentYear} {t('layout.footer.rights')}
              </Text>
            </Stack>
  
            <Stack direction="row" spacing={2} align="center">
              <Text color="gray.500" fontSize="sm">
                {t('layout.footer.developedBy')}
              </Text>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Logo_UC3M.svg"
                alt="UC3M Logo"
                height="30px"
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    )
  }