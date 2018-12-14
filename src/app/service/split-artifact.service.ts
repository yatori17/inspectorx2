import { Injectable } from '@angular/core';

@Injectable()
export class SplitArtifactService {

  constructor() { }

  	splitartifact(content: string) {
	 var defLine: Array<string>;
	 const  pstringinicio = '<p>';
	 const pstringfinal = '</p>';
	    defLine = content.split('</p><p>');
	     for (let _i = 0; _i < defLine.length; _i++) {
	       if (_i == 0) {
	           defLine [_i] = defLine[_i].concat('</p>');
	        } else
	        if (_i == defLine.length - 1) {
	           defLine[defLine.length - 1] = pstringinicio.concat(defLine[defLine.length - 1]);
	        } else {
	          defLine[_i] = pstringinicio.concat(defLine[_i]);
	          defLine [_i] = defLine[_i].concat('</p>');
	        }
	     } defLine;
	    return defLine
	}

}
