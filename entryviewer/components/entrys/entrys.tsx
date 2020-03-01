import "./entrys.less";

/* Entrys() */
export default class Entrys extends React.Component
{
  render()
  {
    return <div className="entrys">
      <Entry/>
      <Entry/>
    </div>;
  }
}

/* Entry() */
class Entry extends React.Component
{
  render()
  {
    return <div className="entry-row">
      <div className="image-contain">
        <div className="image-box no-image"></div>
      </div>
      <div className="content-contain">
        <div className="content-inner">
          <h1>A title that is not very long</h1>
          <p className="groupname">groupname (1)</p>
          <p className="tags"><span className="type1test">TYPENAME</span> TAG1 TAG2 TAG3</p>
          <p className="date">2020/03/01</p>
        </div>
      </div>
    </div>;
  }
}