import "./importexportbox.less";

/* ImportExportBox(function importedHistoryEntries) */
interface ImportExportBoxProps
{
  importedHistoryEntries:(entries:HistoryEntryDict)=>void //function to call when imported history entries are ready
}

export default class ImportExportBox extends React.Component
{
  props:ImportExportBoxProps
  state:{
    importButtonEnabled:boolean
  }

  fileInput:ReactRef<any>

  constructor(props:ImportExportBoxProps)
  {
    super(props);
    this.recievedFile=this.recievedFile.bind(this);
    this.loadImportFile=this.loadImportFile.bind(this);
    this.loadImportFile=this.loadImportFile.bind(this);

    this.state={
      importButtonEnabled:false
    };

    this.fileInput=React.createRef();
  }

  // trigger download of exported entries
  exportEntries(e:any):void
  {
    e.preventDefault();

    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
      var entries=storage.entries || {};

      chrome.downloads.download({
        url:"data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(entries)))),
        filename:"entries.json"
      });
    });
  }

  // recieved file in file input event
  recievedFile():void
  {
    this.setState({importButtonEnabled:true});
  }

  async loadImportFile(e:Event):Promise<void>
  {
    e.preventDefault();

    if (!this.state.importButtonEnabled)
    {
      return;
    }

    var data=await readJsonFromFileInput(this.fileInput.current.files[0]);

    this.props.importedHistoryEntries(ensureHistoryEntryDict(data));
  }

  render()
  {
    return <div className="import-export-links">
      <p>
        <a className="import-link" href={this.state.importButtonEnabled?"":null} onClick={this.loadImportFile}>import</a>
        <input type="file" onChange={this.recievedFile} ref={this.fileInput}/>
      </p>
      <p>
        <a href="google.com" onClick={this.exportEntries}>export</a>
      </p>
    </div>;
  }
}

// given a file object from a file input's files array, return a promise
// with the json parsed readastext value
function readJsonFromFileInput(fileobject:File):Promise<Object>
{
  return new Promise((resolve)=>{
    var reader=new FileReader();
    reader.onload=()=>{
      resolve(JSON.parse(reader.result as string));
    };

    reader.readAsText(fileobject);
  });
}

// given a data object, check if it is a history entry dict, if it is,
// return itself. otherwise return empty object.
function ensureHistoryEntryDict(data:Object):HistoryEntryDict
{
  var allHistoryEntries:boolean=_.every(data,(x:any):boolean=>{
    var isEntry=x.name!=undefined && x.group!=undefined && x.type!=undefined
      && x.link!=undefined && x.date!=undefined;

    if (isEntry && x.image==undefined)
    {
      x.image="";
    }

    return isEntry;
  });

  if (allHistoryEntries)
  {
    return data as HistoryEntryDict;
  }

  return {};
}