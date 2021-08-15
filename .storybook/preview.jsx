import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { startWorker } from '../src/api/fapi'

startWorker()

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, Helvetica, sans-serif',
    fontSize: 16,
  },
})

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
