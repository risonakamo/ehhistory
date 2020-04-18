// return a sorted Id array for given HistoryEntryDict and desired SortState
export function sortEntries(entries:HistoryEntryDict,sortState:SortState):HistoryEntry[]
{
    if (sortState.sortMode=="date")
    {
        return historyEntryDictToArray(entries,!sortState.descend);
    }
}

// converts a history entry dict to date sorted array of HistoryEntries
export function historyEntryDictToArray(entries:HistoryEntryDict,reverse:boolean=false):HistoryEntry[]
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

  if (reverse)
  {
    return _.reverse(entriesArray);
  }

  return entriesArray;
}