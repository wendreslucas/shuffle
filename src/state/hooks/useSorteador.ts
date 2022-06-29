import { useSetRecoilState } from "recoil"
import { resultadoDOAmigoSecreto } from "../atom"
import { realizarSorteio } from "../helpers/realizarSorteio"
import { useListaParticipantes } from "./useListaParticipantes"

export const useSorteador = () => {
  const participantes = useListaParticipantes()
  const setResultado = useSetRecoilState(resultadoDOAmigoSecreto)

  return () => {
    const resultado = realizarSorteio(participantes)
    setResultado(resultado)
  }
}