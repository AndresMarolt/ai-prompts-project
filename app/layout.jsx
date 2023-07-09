import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    <Nav />
                    <ToastContainer />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout