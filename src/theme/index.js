import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    uc3m: {
      500: '#ff6400', // UC3M orange
      600: '#de4558', // Error red
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'uc3m',
      }
    }
  }
})