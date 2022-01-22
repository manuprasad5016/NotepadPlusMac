declare module "@salesforce/apex/NotepadHandler.getData" {
  export default function getData(): Promise<any>;
}
declare module "@salesforce/apex/NotepadHandler.getTabData" {
  export default function getTabData(param: {tabName: any}): Promise<any>;
}
declare module "@salesforce/apex/NotepadHandler.saveData" {
  export default function saveData(param: {dataValue: any, IdVar: any}): Promise<any>;
}
declare module "@salesforce/apex/NotepadHandler.createNoteRec" {
  export default function createNoteRec(): Promise<any>;
}
