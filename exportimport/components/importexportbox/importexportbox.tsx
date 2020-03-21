import "./importexportbox.less";

/* ImportExportBox() */
export default class ImportExportBox extends React.Component
{
  // trigger download of exported entries
  exportEntries(e:any)
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

  render()
  {
    return <div className="import-export-links">
      <p><a className="import-link">import</a><input type="file"/></p>
      <p><a href="google.com" onClick={this.exportEntries}>export</a></p>
    </div>;
  }
}