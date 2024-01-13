// @react/client
// @ts-nocheck
"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import Head from 'next/head'

import { ReactNode } from 'react';

import { AuthProvider } from '@/contexts/AuthContext';

import {metadata} from'@/config/metadata'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children, 

}: {
  children: React.ReactNode;
  
}) {
  return (
    <>
        <AuthProvider>
          <Head>
            {metadata.title && <title>{metadata.title.toString()}</title>}
          </Head>
          
            <html lang="en">
              <body className={inter.className}>{children}</body>
            </html>
        </AuthProvider>
     
    </>
  )
}
