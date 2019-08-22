"use strict";
import Row from "./Row";

export default class Menu {

   menu_ref;
   rows = [];

   constructor(rows, menuRef) {
      if (rows && menuRef) {   
         this.menu_ref = menuRef;
         this.rows = rows;
      }
      return;
   }

   toJsonObject = () => {
      let obj = {};

      if (this.menu_ref) obj.menu_ref = this.menu_ref;
      if(rows){
         let rowsArrayObj = [];
         for (let i = 0; i < rows.length; i++) {
				rowsArrayObj[i] = rows[i].toJsonObject();
			}
			obj.rows = rowsArrayObj;
      }
   }


}