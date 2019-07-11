"use strict";
import Row from "./Row";

export default class Menu {
   static KEY_MENU_REF = "menu_ref";
   static KEY_ROWS = "rows";

   menuRef;
   rows;

   constructor(obj) {
      rowsArrayObj = obj.KEY_ROWS;
      // TODO: check syntax
      this.rows = new Row[rowsArrayObj.length];
      for (let i = 0; i < rowsArrayObj.length; i++)
         rows[i] = new Row(rowsArrayObj[i], 3);

      this.menuRef = obj.KEY_MENU_REF;   
   }

   toJsonObject = () => {
      let obj = {};

      if(this.menuRef)  obj.KEY_MENU_REF = this.menuRef;
      if(rows){
         let rowsArrayObj = [];
         for (let i = 0; i < rows.length; i++) {
				rowsArrayObj[i] = rows[i].toJsonObject();
			}
			obj.KEY_ROWS = rowsArrayObj;
      }
   }


}