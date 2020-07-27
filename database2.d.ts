interface HistoryEntry2
{
    name:string
    group:string
    link:string
    type:EntryType
    image:string

    tags:string[]
    dates:DateString[]
}

//where key is link url
type EntriesDict2=Record<string,HistoryEntry2>;