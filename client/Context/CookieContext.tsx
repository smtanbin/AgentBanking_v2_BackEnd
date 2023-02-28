import React from 'react';
import { CookiesProvider } from 'react-cookie';

export default function CookieContext({ children }) {
    return (
        <CookiesProvider>
            {children}
        </CookiesProvider>
    );
}