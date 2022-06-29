import { useRecoilValue, useSetRecoilState } from "recoil"
import { erroState, listaParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
  const setLista = useSetRecoilState(listaParticipantesState)
  const lista = useRecoilValue(listaParticipantesState)
  const setErro = useSetRecoilState(erroState)
  return (nomeDoParticipante: string) => {
    if (lista.includes(nomeDoParticipante)){
      setErro('Nomes Duplicados não são permitidos!')
      setTimeout(() => {
        setErro('')

      }, 2000)
      return
    }
    return setLista(listaAtual => [...listaAtual, nomeDoParticipante])
  }
}
