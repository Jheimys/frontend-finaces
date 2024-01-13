import { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './style.module.scss'

import {FaSpinner} from 'react-icons/fa'

interface Buttonprops extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}

export function Button({ loading, children, ...res }:Buttonprops){
    return(
        <button 
            className={styles.button}
            disabled={loading}
            {...res}
        >
            { loading ? (
                <FaSpinner color='#FFF'  size={16} />
            ) : (
                <a className={styles.buttonText}>
                    {children}
                </a>
            )}

        </button>
    )
}