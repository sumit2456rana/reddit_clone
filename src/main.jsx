import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './Provider/UserProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LoginOrSignUp } from './Provider/LoginOrSignUp.jsx'
import { StatusAndThemeProvider } from './Provider/StatusAndThemeProvider.jsx'
import { ChatProvider } from './Provider/ChatProvider.jsx'
import { PopUpProvider } from './Provider/PopUpProvider.jsx'
import { SidebarProvider } from './Provider/SideBarProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <LoginOrSignUp>
      <UserProvider>
        <StatusAndThemeProvider>
          <ChatProvider>
            <PopUpProvider>
              <SidebarProvider>
                <App />
              </SidebarProvider>
            </PopUpProvider>
          </ChatProvider>
        </StatusAndThemeProvider>
      </UserProvider>
    </LoginOrSignUp>
  </BrowserRouter>,
)
