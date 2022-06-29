import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useListaParticipantes } from '../../state/hooks/useListaParticipantes'
import ListaParticipantes from './index'

jest.mock('../../state/hooks/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})
 
describe('Lista vazia de participantes ', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  })
  
   test('Deve ser renderizada sem elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes/>
      </RecoilRoot>
    )
    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(0)
   })   
})

describe('Lista contendo participantes ', () => {
const participantes = ['Wendres', 'Lucas']
beforeEach(() => {
  (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
})
  
   test('Deve ser renderizada sem elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes/>
      </RecoilRoot>
    )
    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(participantes.length)
   })   
})
