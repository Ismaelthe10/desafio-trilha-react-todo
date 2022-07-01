import logoImg from '../assets/logoImg.svg'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerDiv}>
        <img src={logoImg} alt="to.do"/>
      </div>
    </header>
  )
}