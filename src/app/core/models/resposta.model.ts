export class RespostaModel {
	constructor(
		public idPartida: string,
		public idPergunta: number,
		public numOrder: number,
		public trecho: number,
		public tipo: number,
    public trechoAcerto: boolean,
    public tipoAcerto: boolean,
    public modo: number
	) {}
}