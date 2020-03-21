import "./importexportbox.less";

/* ImportExportBox() */
export default class ImportExportBox extends React.Component
{
  state:{
    importButtonEnabled:boolean
  }

  fileInput:ReactRef<any>

  constructor(props:any)
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
        url:"data:application/json;base64,"+btoa(JSON.stringify(entries)),
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

    console.log(await readJsonFromFileInput(this.fileInput.current.files[0]));
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