// src/app/core/models/artefato.model.ts
export class RespfipModel {
  constructor(
    public userId: string,
    public partidaId: string,
    public artefatoId: string,
    public comment: string,
    public detbool: Array<boolean>,
    public detdescript: Array<string>,
    public dettaxonomy: Array<string>,
    public inspector: boolean,
    public isActive?: boolean,
    public _id?: string

  ) { }
}