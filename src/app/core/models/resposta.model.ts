export class RespostaModel {
	constructor(
		public idPartida: string,
		public idPergunta: number,
		public trecho: string,
		public tipo: number,
    public trechoAcerto: boolean,
    public tipoAcerto: boolean
	) {}
}