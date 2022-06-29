import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { RecoilRoot } from 'recoil'
import Formulario from './Index'

describe('Comportamento do formulario.tsx', () => {
  
  test('Quando o input está vazio, não é possível adicionar novos participantes', () => {
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )

    // econtrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    // encontrar o botão
    const botao = screen.getByRole('button')

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument()

    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled()
  })

  test('Adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )

      // econtrar no DOM o input
      const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

      // encontrar o botão
      const botao = screen.getByRole('button')

      // inserir um valor no input
      fireEvent.change(input, {
        target: {
          value: "Wendres Lucas"
        }
      })

      // clicar no botao de submit
      fireEvent.click(botao)  

      // garantir que o input esteja com o foco ativo
      expect(input).toHaveFocus()

      // garantir que o input não tenha um valor
      expect(input).toHaveValue('')
  })

  test('O nome não pode ser duplicado', () => {
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: "Wendres Lucas"
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: "Wendres Lucas"
      }
    })  
    fireEvent.click(botao)  
    
    const mensagemDeErro = screen.getByRole('alert')
    expect(mensagemDeErro.textContent).toBe('Nomes Duplicados não são permitidos!')
  })

  test('O alerta de Erro deve sumir após N segundos', () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: "Wendres Lucas"
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: "Wendres Lucas"
      }
    })  
    fireEvent.click(botao)  
    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeInTheDocument()

    act(() => {
      jest.runAllTimers()
    })

    mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeNull()
  })
})