import ImportExportBox from "./components/importexportbox/importexportbox";
import EntryDiff from "./components/entrydiff/entrydiff";
import attachStorageFunctions from "../shared/storagefunctions";

import "./exportimport-index.less";

class ExportImportMain extends React.Component
{
  state:{
    editEntries:HistoryEntryDict
  }

  entryDiff:ReactRef<EntryDiff>

  constructor(props:any)
  {
    super(props);
    this.loadEditEntries=this.loadEditEntries.bind(this);
    this.finalImport=this.finalImport.bind(this);

    this.state={
      editEntries:{}
    };

    this.entryDiff=React.createRef();
  }

  // replace the entries being currently edited with new ones
  loadEditEntries(newEntries:HistoryEntryDict):void
  {
    this.setState({editEntries:newEntries});
  }

  // final import to upload to storage
  finalImport():void
  {
    this.entryDiff.current.uploadEntries();
  }

  render()
  {
    return <>
      <div className="import-export-link-hold">
        <ImportExportBox importedHistoryEntries={this.loadEditEntries} finalImport={this.finalImport}/>
      </div>
      <EntryDiff entrys={this.state.editEntries} ref={this.entryDiff}/>
    </>;
  }
}

function main()
{
  ReactDOM.render(<ExportImportMain/>,document.querySelector(".main"));
  attachStorageFunctions();
}

window.onload=main;