// 1. Import the extendTheme function


import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ChakraProvider>
    </StrictMode>
)