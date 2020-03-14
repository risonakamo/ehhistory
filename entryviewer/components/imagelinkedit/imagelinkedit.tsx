import "./imagelinkedit.less";

export default class ImageLinkEditor extends React.PureComponent
{
  render()
  {
    return <div className="image-link-editor">
      <ImageLinkEditRow/>
    </div>;
  }
}

class ImageLinkEditRow extends React.PureComponent
{
  render()
  {
    return <div className="image-link-edit-row">
      <div className="link-zone split-side">
        <a href="https://nhentai.net/g/297846/" target="_blank">https://nhentai.net/g/297846/</a>
      </div>
      <div className="arrow-point">-></div>
      <div className="edit-zone split-side" contentEditable={true}></div>
    </div>;
  }
}