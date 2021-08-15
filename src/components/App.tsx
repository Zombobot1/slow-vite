import sword from '../images/swc-sword.png'
import { ReactComponent as SwordSvg } from '../images/sword.svg'
import audioMp3 from './pick.mp3'
import '../styles/index.css'
import { useEffect, useState } from 'react'
import { useSW } from './useSW'
import { useNotifications } from '../useNotifications'
import { getData } from '../api/api'
import { Typography } from '@material-ui/core'

export const App = () => {
  const [c, sc] = useState(0)
  useSW()
  useNotifications()
  const data = useApi()

  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <audio controls src={audioMp3}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <Typography component="h1" sx={{ fontSize: '3rem' }}>
            {/* Oh Herros {foo('rr')}.{process.env.FIREBASE_API_KEY?.slice(30)} */}
            Oh Herros {foo('rr')}
          </Typography>
          <p>
            Id: {data.userId}, title: {data.title}
          </p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <img src={sword} alt="sword" style={{ width: '80px' }} />
            </div>
            <span style={{ width: '80px' }}>
              <SwordSvg />
            </span>
          </div>

          <button onClick={() => sc(c + 1)}>Check fast refresh: {c}</button>
        </section>
      </main>
    </>
  )
}

const foo = (v: string) => v

function useApi() {
  const [data, setData] = useState({ userId: '', title: '' })
  useEffect(() => {
    getData('1').then(setData)
  }, [])

  return data
}
