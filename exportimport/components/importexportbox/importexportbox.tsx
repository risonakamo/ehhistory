import "./importexportbox.less";

/* ImportExportBox() */
export default class ImportExportBox extends React.Component
{
  render()
  {
    return <div className="import-export-links">
      <p><a className="import-link">import</a><input type="file"/></p>
      <p><a href="">export</a></p>
    </div>;
  }
}