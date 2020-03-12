type EntryType="NHENTAI"|"OTHER";

// a single history database entry
interface HistoryEntry
{
    id:number
    name:string
    group:string
    type:EntryType

    image?:string //might not exist when in database, but should definitely exist
                  //everywhere outside
    link:string

    date:DateString
}

// the local storage
interface LocalStorage
{
    entries:HistoryEntryDict
    maxId:number
}

interface HistoryEntryDict
{
    [id:number]:HistoryEntry
}

// return data from a page parser script
interface PageParseResult
{
    name:string
    group:string
}

interface PageParseResultWithType extends PageParseResult
{
    type:EntryType
    url:string
}