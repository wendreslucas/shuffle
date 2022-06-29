import { atom } from 'recoil'

export const listaParticipantesState = atom<string[]>({
  key: 'listaParticipantesState',
  default: []
})

export const erroState = atom<string>({
  key: 'erroState',
  default: ''
})

export const resultadoDOAmigoSecreto = atom<Map<string, string>>({
  key: 'resultadoDOAmigoSecreto',
  default: new Map()
})