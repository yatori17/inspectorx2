// src/app/core/models/question.model.ts
export class QuestionModel {
  constructor(
    public question: number,
    public code: string,
    public trecho: number,
    public type: string,
    public difficulty: string,
    public description: string,
    public taxonomy: string,
    public taxonomyid: number,
    public _id?: string,
  ) { }
}
