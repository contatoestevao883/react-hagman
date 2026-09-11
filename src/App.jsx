import { styled } from 'styled-components'
import Jogo from './components/Jogo/Jogo'
import Letras from './components/Letras/Letras'
import GameProvider from './context/GameContext'

function App() {
  return (
    <GameProvider>
      <DivContainer>
        <Jogo />
        <Letras />
      </DivContainer>
    </GameProvider>
  )
}

export default App

const DivContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`