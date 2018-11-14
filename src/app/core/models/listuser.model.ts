// src/app/core/models/artefato.model.ts
export class ListuserModel {
  constructor(
    public userId: string,
    public title: string,
    public isActive?: boolean,
    public _id?: string
  ) { }
}