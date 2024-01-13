// @react/client
// @ts-nocheck
"use client"
import { FormEvent, useContext, useState } from 'react'
import  Head  from 'next/head'
import { metadata } from '@/config/metadata'
import Link from 'next/link'
import { AuthContext } from '@/contexts/AuthContext'

import styles from "./page.module.scss"

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'


export default function Home() {
  
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    let data = {
      email,
      password,
  }

  await signIn(data)
  }
  return (
    <>
       <Head>
          <title>{metadata.title = 'Login-faça login'}</title>
       </Head> 

       <div className={styles.containerCenter}>
        <h1>Faça seu login</h1>
          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <Input 
                placeholder='Digite seu email' 
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                placeholder='Digite sua senha' 
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Button 
                type="submit"
                loading = {false}
              >  
                Acessar
              </Button>
            </form>
            
            <Link legacyBehavior href="/signup">
              <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
            </Link>
          </div>
       </div>
    </> 
  )
}
