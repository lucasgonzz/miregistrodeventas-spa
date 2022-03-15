/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log('Se cargo desde cache.')
    },
    registered (registration) {
      console.log('Service worker has been registered.')
      setTimeout(() => {
          console.log('Buscando actualizacion')
          registration.update()
      }, 1000 * 60)
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      document.dispatchEvent(
          new CustomEvent('swUpdated', { detail: registration })
      )
      console.log('Se lanzo evento')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
