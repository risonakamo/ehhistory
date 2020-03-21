import ImportExportBox from "./components/importexportbox/importexportbox";
import attachStorageFunctions from "../shared/storagefunctions";

import "./exportimport-index.less";

class ExportImportMain extends React.Component
{
  render()
  {
    return <>
      <div className="import-export-link-hold">
        <ImportExportBox/>
      </div>
    </>;
  }
}

function main()
{
  ReactDOM.render(<ExportImportMain/>,document.querySelector(".main"));
  attachStorageFunctions();
}

window.onload=main;