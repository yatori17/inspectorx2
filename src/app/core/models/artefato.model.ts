// src/app/core/models/artefato.model.ts
export class ArtefatoModel {
  constructor(
    public userId: string,
    public title: string,
    public content: string,
    public _id?: string
  ) { }
}