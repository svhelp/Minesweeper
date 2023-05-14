import { GameContainer } from '../components/GameContainer'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <GameContainer />
      </div>
    </main>
  )
}
