import ImportExportBox from "./components/importexportbox/importexportbox";
import EntryDiff from "./components/entrydiff/entrydiff";
import attachStorageFunctions from "../shared/storagefunctions";

import "./exportimport-index.less";

class ExportImportMain extends React.Component
{
  state:{
    editEntries:HistoryEntryDict
  }

  constructor(props:any)
  {
    super(props);
    this.loadEditEntries=this.loadEditEntries.bind(this);

    this.state={
      editEntries:{}
    };
  }

  // replace the entries being currently edited with new ones
  loadEditEntries(newEntries:HistoryEntryDict):void
  {
    this.setState({editEntries:newEntries});
  }

  render()
  {
    return <>
      <div className="import-export-link-hold">
        <ImportExportBox importedHistoryEntries={this.loadEditEntries}/>
      </div>
      <EntryDiff entrys={this.state.editEntries}/>
    </>;
  }
}

function main()
{
  ReactDOM.render(<ExportImportMain/>,document.querySelector(".main"));
  attachStorageFunctions();
}

window.onload=main;