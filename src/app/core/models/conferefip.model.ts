// src/app/core/models/conferefip.model.ts
export class ConferefipModel {
  constructor(
    public userId: string,
    public partidaId: string,
    public artefatoId: string,
    public respfipId: string,
    public comment: string,
    public detbool: Array<boolean>,
    public detdescript: Array<string>,
    public dettaxonomy: Array<string>,
    public isActive?: boolean,
    public _id?: string

  ) { }
}
