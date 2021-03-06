import "./tageditor-bar.less";

/* TagEditorInput(function newTag?, string placeholder?, string className?, bool noSubmit?, bool hidden?) */
export default class TagEditorInput extends React.Component
{
  props:{
    newTag?:(newtag:string)=>void //function called when new tag has been submitted. new tag is given.
    placeholder?:string
    className?:string
    noSubmit?:boolean //when enabled, submitting with enter key will only call the newTag function but
                      //not do anything else (normally it will clear and replace spaces with underscores
                      //before emitting for event callback)
    hidden?:boolean

    ref?:ReactRef<TagEditorInput>
  }
  state:{
    currentValue:string
  }

  theInput:ReactRef<HTMLElement>

  constructor(props:any)
  {
    super(props);
    this.inputHandler=this.inputHandler.bind(this);
    this.keyHandler=this.keyHandler.bind(this);

    this.state={
      currentValue:""
    };

    this.theInput=React.createRef();
  }

  // handle inputs
  inputHandler(e:any):void
  {
    this.setState({currentValue:e.target.value});
  }

  // handle key inputs
  keyHandler(e:any):void
  {
    if (e.key=="Enter")
    {
      if (this.props.noSubmit)
      {
        this.props.newTag(this.state.currentValue.trim());
        return;
      }

      if (this.state.currentValue.trim().length)
      {
        this.props.newTag(spaceToUnderscores(this.state.currentValue.trim()));
      }

      this.setState({currentValue:""});
    }
  }

  // clear the input
  public clearInput():void
  {
    this.setState({currentValue:""});
  }

  // focus on the input box
  public focus():void
  {
    this.theInput.current.focus();
  }

  render()
  {
    var extraClasses=this.props.className || "";

    return <input placeholder={this.props.placeholder} type="text" value={this.state.currentValue}
      className={`tag-editor-input input-inherit ${extraClasses}`} ref={this.theInput}
      onChange={this.inputHandler} onKeyPress={this.keyHandler}
      style={{display:this.props.hidden?"none":""}}/>;
  }
}

// given string, replace all spaces with single underscores
function spaceToUnderscores(input:string):string
{
  return input.replace(/\s+/g,"_");
}