import "./exportimport-index.less";

class ExportImportMain extends React.Component
{
  render()
  {
    return <>
      <p>import <input type="file"/></p>
      <p><a href="">export</a></p>
    </>;
  }
}

function main()
{
  ReactDOM.render(<ExportImportMain/>,document.querySelector(".main"));
}

window.onload=main;