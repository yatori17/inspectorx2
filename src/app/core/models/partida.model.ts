// src/app/core/models/partida.model.ts
export class PartidaModel {
  constructor(
    public UserId: string,
    public dificuldade: string,
    public resposta?: Resposta[],
    public _id?: string,

    // usuario
    // pergunta 1, 2, 3
    // cada um com trecho certo ou errado, tipo certo ou errado
    //  userId: { type: String, required: true },
  // dificuldade: { type: String, required: true },
  // respostas : [{ idPergunta : Number, trecho : String, tipo: String }]
  ) { }
}

export class Resposta {
	constructor(
		public idPergunta: number,
		public trecho: string,
		public tipo: string
	) {}
}