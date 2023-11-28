import MainPage from './pages/MainPage'
import style from './global.module.scss'
import PlayBar from './components/PlayBar/PlayBar'

const App = () => (
  <div className={style.wrapper}>
    <MainPage />
    <PlayBar />
  </div>
)
export default App
