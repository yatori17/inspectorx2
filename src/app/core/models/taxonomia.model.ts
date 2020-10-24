// src/app/core/models/artefato.model.ts
export class TaxonomiaModel {
  constructor(
    public title: string,
    public value: Array<{display: string, description: string}>,
    public _id?: string
  ) { }
}
