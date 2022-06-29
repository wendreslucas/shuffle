import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaParticipantes } from "../../state/hooks/useListaParticipantes";
import Rodape from './index';

jest.mock('../../state/hooks/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

const mockSorteio = jest.fn()
jest.mock('../../state/hooks/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  }
})

const mockNavegacao = jest.fn()
jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  }
})

describe('Quando não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  })

  test('A brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape/>
      </RecoilRoot>
    )
    
    const botao = screen.getByRole('button')
    expect(botao).toBeDisabled()
  })
})

describe('Quando existem participantes suficientes', () => {
  const participantes = ['Ana', 'John', 'Doe']
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('A brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape/>
      </RecoilRoot>
    )
    
    const botao = screen.getByRole('button')
    expect(botao).not.toBeDisabled()
  })

  test('A brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape/>
      </RecoilRoot>
    )
    const botao = screen.getByRole('button')
    fireEvent.click(botao)

    expect(mockNavegacao).toHaveBeenCalledTimes(1)
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    expect(mockSorteio).toHaveBeenCalledTimes(1)
  })
})