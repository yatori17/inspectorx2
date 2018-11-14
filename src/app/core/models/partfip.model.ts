// src/app/core/models/partida.model.ts
export class PartfipModel {
  constructor(
    public userId: string,
    public modo: number,
    public artefato: Array<string>,
    public inspetor: Array<string>,
    public createDate?: Date,

  //  public resposta?: Resposta[],


    // usuario
      public _id?: string
    // pergunta 1, 2, 3
    // cada um com trecho certo ou errado, tipo certo ou errado
    //  userId: { type: String, required: true },
  // dificuldade: { type: String, required: true },
  // respostas : [{ idPergunta : Number, trecho : String, tipo: String }]
  ) { }
}