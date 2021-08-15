import { mount } from '@cypress/react'
import { FAPI } from '../api/fapi'
import { App } from './App'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, Helvetica, sans-serif',
    fontSize: 16,
  },
})

it('Button', () => {
  cy.intercept(FAPI.GET, (r) => {
    r.reply(FAPI.get(r.url))
  })
  mount(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  )
  cy.get('h1').should('exist')
})
