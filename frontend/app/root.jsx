import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { MenuSidebar } from './components';
import styles from "./layout.style";
import { useEffect, useState } from "react";

"use client";

export function Layout({ children }) {

  const [sidebarWidth, setSidebarWidth] = useState('125px');

  const [isClient, setIsClient] = useState(false);

  const toggleSidebar = (isCollapsed) => {
    setSidebarWidth(isCollapsed? '265px' : '125px');
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'></link>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={ styles.root }>
          { // render only if client
            isClient && (
              <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: sidebarWidth }}>
                  <MenuSidebar onToggle={toggleSidebar}/>
                </div>
                <div style={ styles.page }>
                  { children }
                </div>
              </div>
            )
          }
          <ScrollRestoration />
          <Scripts />
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}