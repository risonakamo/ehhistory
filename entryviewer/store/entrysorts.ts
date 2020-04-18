// return a sorted Id array for given HistoryEntryDict and desired SortState
export function sortEntries(entries:HistoryEntryDict,sortState:SortState):number[]
{
    console.log("sorting",sortState);
    console.log("sort entries",entries);

    if (sortState.sortMode=="date")
    {
        return historyEntryDictToArray(entries).map((x:HistoryEntry)=>{
            return x.id;
        });
    }
}

// converts a history entry dict to date sorted array of HistoryEntries
export function historyEntryDictToArray(entries:HistoryEntryDict):HistoryEntry[]
{
  var entriesArray=Object.values(entries);

  entriesArray.sort((a:HistoryEntry,b:HistoryEntry)=>{
    var adate=Date.parse(a.date);
    var bdate=Date.parse(b.date);

    if (adate>bdate)
    {
      return -1;
    }

    else if (adate<bdate)
    {
      return 1;
    }

    return 0;
  });

  return entriesArray;
}