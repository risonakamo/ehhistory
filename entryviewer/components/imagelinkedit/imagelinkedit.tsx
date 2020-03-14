import "./imagelinkedit.less";

/* ImageLinkEditor() */
export default class ImageLinkEditor extends React.PureComponent
{
  render()
  {
    return <div className="image-link-editor">
      <ImageLinkEditRow/>
      <ImageLinkEditRow/>
      <ImageLinkEditRow/>
    </div>;
  }
}

/* ImageLinkEditRow() */
class ImageLinkEditRow extends React.PureComponent
{
  render()
  {
    return <div className="image-link-edit-row">
      <div className="link-zone split-side">
        <a href="https://nhentai.net/g/297846/" target="_blank">https://nhentai.net/g/297846/</a>
      </div>
      <div className="arrow-point">-></div>
      <div className="split-side edit-contain">
        <div className="edit-zone" contentEditable={true}></div>
        <div className="bracket-border left"></div>
        <div className="bracket-border right"></div>
      </div>
    </div>;
  }
}