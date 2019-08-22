"use strict";
import Row from "./Row";

export default class Menu {

   menuRef;
   rows = [];

   constructor(obj) {
      if(!obj)
         return;
      rowsArrayObj = obj.rows;
      // TODO: check syntax
      //this.rows = new Row[rowsArrayObj.length];
      for (let i = 0; i < rowsArrayObj.length; i++)
         rows[i] = new Row(rowsArrayObj[i], 3);

      this.menuRef = obj.menu_ref;   
   }

   toJsonObject = () => {
      let obj = {};

      if (this.menuRef) obj.menu_ref = this.menuRef;
      if(rows){
         let rowsArrayObj = [];
         for (let i = 0; i < rows.length; i++) {
				rowsArrayObj[i] = rows[i].toJsonObject();
			}
			obj.rows = rowsArrayObj;
      }
   }


}