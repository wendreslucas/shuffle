import { useRecoilValue } from "recoil"
import { resultadoDOAmigoSecreto } from "../atom"

export const useResultadoSorteio = () => {
  return useRecoilValue(resultadoDOAmigoSecreto)
}