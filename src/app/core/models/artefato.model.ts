// src/app/core/models/artefato.model.ts
export class ArtefatoModel {
  constructor(
    public userId: string,
    public title: string,
    public taxid: string,
    public content: string,
    public defectbool: Array<boolean>,
    public defectdescript: Array<string>,
    public defecttaxonomy: Array<string>,
    public qtydefect: number,
    public isActive?: boolean,
    public _id?: string

  ) { }
}
