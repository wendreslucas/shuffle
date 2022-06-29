import React from 'react';
import { realizarSorteio } from './realizarSorteio';

describe('Dado um sorteio', () => {
  test('Cada participante não sorteie o proprio nome', () => {
    const participantes = ['John', 'João', 'Joaquim', 'Vinicious', 'Gabriel']

    const sorteio = realizarSorteio(participantes)
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante)
      expect(amigoSecreto).not.toEqual(participante)
    })
  })
})