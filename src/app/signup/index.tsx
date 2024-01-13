import { Input } from "@/components/ui/input"
import styles from "../page.module.scss"
import { Button } from "@/components/ui/Button"

import '@/app/globals.scss'
import Link from 'next/link';

export default function SignUp() {
  return(
    <>
      <div className={styles.containerCenter}>
        <h1>Faça seu cadastro</h1>
        <div className={styles.login}>
            <form>
              <Input placeholder='Digite seu nome' type='text'/>
              <Input placeholder='Digite seu email' type='text'/>
              <Input placeholder='Digite sua senha' type='password'/>
              <Button 
                type="submit"
                loading = {false}
              >  
                Cadastrar
              </Button>
            </form>

            <Link href="/">
              <div  className={styles.text}>
                 Já possui uma conta? Faça login
              </div>
            </Link>
          </div>
      </div>
    </>
  )
}