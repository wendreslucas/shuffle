import React from 'react';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Configuracao from './index';

const mockNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  }
})

describe('A pagina de configuracao', () => {
  test('A pagina deve renderizar corretamente', () => {
    const {container} = render(
      <RecoilRoot>
        <Configuracao/>
      </RecoilRoot>
    )

    expect(container).toMatchSnapshot()
  })
})