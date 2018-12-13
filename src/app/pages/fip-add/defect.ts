import * as Quill from 'quill';

export interface Config {

}

export interface QuillInstance {

}


export default class Defect {
    quill: QuillInstance;
    options: Config;

  constructor(quill, options) {
      this.quill = quill;
      this.options = options;


  }
}
