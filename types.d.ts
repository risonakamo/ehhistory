declare const React:any;
declare const ReactDOM:any;
declare const chrome:any;

declare namespace JSX
{
    interface IntrinsicElements
    {
        [key:string]:any
    }
}

type DateString=string;
type ReactRef=any;

// a single history database entry
interface HistoryEntry
{
    name:string
    group:string
    type:string

    link:string

    date:DateString
}

// the local storage
interface LocalStorage
{
    entries:HistoryEntry[]
}