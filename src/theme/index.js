import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#e9ecf8',
      100: '#c3ccec',
      200: '#9cacdf',
      300: '#748bd3',
      400: '#4c6bc6',
      500: '#3152b4', // Main color
      600: '#2a449d',
      700: '#233785',
      800: '#1b2a6e',
      900: '#141d56',
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      }
    }
  }
})