import "./importexportbox.less";

/* ImportExportBox(function importedHistoryEntries, function finalImport) */
interface ImportExportBoxProps
{
  importedHistoryEntries:(entries:HistoryEntryDict)=>void //function to call when imported history entries are ready
  finalImport:()=>void //final import is triggered
}

export default class ImportExportBox extends React.Component
{
  props:ImportExportBoxProps
  state:{
    importButtonEnabled:boolean
    finalImport:boolean
    finalImportDone:boolean
  }

  fileInput:ReactRef<any>

  constructor(props:ImportExportBoxProps)
  {
    super(props);
    this.recievedFile=this.recievedFile.bind(this);
    this.loadImportFile=this.loadImportFile.bind(this);
    this.loadImportFile=this.loadImportFile.bind(this);

    this.state={
      importButtonEnabled:false,
      finalImport:false,
      finalImportDone:false
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

  // perform files to load the imported file, ends up calling callback function
  // the the imported data. if in final import mode, calls the final import
  // function
  async loadImportFile(e:Event):Promise<void>
  {
    e.preventDefault();

    if (!this.state.importButtonEnabled)
    {
      return;
    }

    if (this.state.finalImport)
    {
      this.props.finalImport();
      this.setState({importButtonEnabled:false,finalImportDone:true});
      return;
    }

    var data=await readJsonFromFileInput(this.fileInput.current.files[0]);

    this.setState({finalImport:true});
    this.props.importedHistoryEntries(await filterMatchingLinks(ensureHistoryEntryDict(data)));
  }

  // return the text of the import button based on current states
  getImportButtonText():string
  {
    if (this.state.finalImportDone)
    {
      return "imported";
    }

    if (this.state.finalImport)
    {
      return "final import";
    }

    return "import";
  }

  render()
  {
    return <div className="import-export-links">
      <p>
        <a className="import-link" href={this.state.importButtonEnabled?"":null} onClick={this.loadImportFile}>
          {this.getImportButtonText()}
        </a>
        <input type="file" onChange={this.recievedFile} ref={this.fileInput}
          style={{display:this.state.finalImport?"none":""}}/>
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

// given history entries, filter out the ones that are already present in the storage,
// based on link (if they have the same link they are filtered out). returns a promise
// with an array of the remaining history entries.
function filterMatchingLinks(entries:HistoryEntryDict):Promise<HistoryEntryDict>
{
  return new Promise((resolve)=>{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
      var storageEntries:HistoryEntryDict=storage.entries || {};

      var storageLinks:Set<string>=new Set(_.map(storageEntries,(x:HistoryEntry)=>{
        return x.link;
      }));

      resolve(_.pickBy(entries,(x:HistoryEntry)=>{
        return !storageLinks.has(x.link);
      }));
    });
  });
}