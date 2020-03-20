declare const ReactDOM:any;
declare const chrome:any;
declare const moment:any;
declare const _:any;

declare const Redux:any;
declare const ReactRedux:any;

declare namespace React
{
    class Component
    {
        constructor(props:any)
        setState:Function
    }

    class PureComponent extends Component
    {

    }

    const createRef:Function
}

declare namespace JSX
{
    interface IntrinsicElements
    {
        [key:string]:any
    }
}

type DateString=string;

// chrome tab
interface Tab
{
    url:string
}

// react's ref
interface ReactRef<T>
{
    current:T
}

interface ReactProps
{
    key?:any
}