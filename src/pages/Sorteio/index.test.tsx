import { act, fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Sorteio from './index';
import { useListaParticipantes } from './../../state/hooks/useListaParticipantes';
import { useResultadoSorteio } from "../../state/hooks/useResultadoSorteio";

jest.mock('./../../state/hooks/useListaParticipantes', () => {
  return{
    useListaParticipantes: jest.fn()
  }
})

jest.mock('./../../state/hooks/useResultadoSorteio', () => {
  return{
    useResultadoSorteio: jest.fn()
  }
})

describe('Na pagina de sorteio', () => {
  const participantes = ['Ana', 'Catarina', 'Jorel']
  const resultado = new Map([
    ['Ana', 'Jorel'],
    ['Jorel', 'Catarina'],
    ['Catarina', 'Ana']
  ])

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
  })
  test('Todos os participantes podem exibir o seu amigo secreto', () => {
    render(
      <RecoilRoot>
        <Sorteio/>
      </RecoilRoot>
    )

    const opcoes = screen.queryAllByRole('option')
    expect(opcoes).toHaveLength(participantes.length + 1)
  })

  test('o amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio/>
      </RecoilRoot>
    )

    const select = screen.getByPlaceholderText('Selecione o seu nome')
    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    })
    const botao = screen.getByRole('button')
    fireEvent.click(botao)

    const amigoSecreto = screen.getByRole('alert')
    expect(amigoSecreto).toBeInTheDocument()
  })

  test('esconde o amigo secreto sorteado depois de 5 segundos', async () => {
    jest.useFakeTimers();
  
    render(
        <RecoilRoot>
            <Sorteio />
        </RecoilRoot>
    )
  
    const select = screen.getByPlaceholderText('Selecione o participante')
    fireEvent.change(select, { target: { value: participantes[1] } })
  
    const button = screen.getByRole('button')
    fireEvent.click(button)
    act(() => {
        jest.runAllTimers();
    })
    const alerta = screen.queryByRole('alert')
    expect(alerta).not.toBeInTheDocument()
  })
}) 

