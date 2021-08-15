import { useEffect, useState } from 'react'
import { registerServiceWorker } from '../serviceWorkerRegistration'

// if you export something from App.ts e.g. useSW it will break fast refresh
export function useSW() {
  const [isInitialized, setIsInitialized] = useState(false)
  const isVisible = useIsPageVisible()
  useEffect(() => {
    registerServiceWorker(
      () => console.log('Updated'),
      () => setIsInitialized(true),
    )
  }, [])
  useEffect(() => {
    if (isVisible && isInitialized) checkForUpdates() // without detecting initialization on the first SW installation the call of checkForUpdates forever prevents calls of onUpdate
  }, [isVisible, isInitialized])
}

function checkForUpdates() {
  navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((reg) => reg.update().catch(console.error)))
}

const isDocumentHidden = (): boolean => !document['hidden']

function useIsPageVisible() {
  const [isVisible, setIsVisible] = useState(isDocumentHidden())
  const onVisibilityChange = () => setIsVisible(isDocumentHidden())
  useEffect(() => {
    const visibilityChange = 'visibilitychange'
    document.addEventListener(visibilityChange, onVisibilityChange, false)
    return () => document.removeEventListener(visibilityChange, onVisibilityChange)
  }, [])
  return isVisible
}
