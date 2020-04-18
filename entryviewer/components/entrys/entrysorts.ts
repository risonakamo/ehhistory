// return a sorted Id array for given HistoryEntryDict and desired SortState
export function sortEntries(entries:HistoryEntryDict,sortState:SortState,entryOrder:number[]):HistoryEntry[]
{
    if (sortState.sortMode=="date")
    {
        return historyEntryDictToArray(entries,!sortState.descend);
    }

    if (sortState.sortMode=="shuffle")
    {
      return mirrorEntryOrder(entries,entryOrder);
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

// given the entries and an entry order, attempt to return the entries in the given order,
// if the entryorder is missing some entries, these are added to the end in order of appearance
function mirrorEntryOrder(entries:HistoryEntryDict,entryOrder:number[]):HistoryEntry[]
{
  entryOrder=_.union(entryOrder,_.keys(entries));

  return _.filter(_.map(entryOrder,(x:number):HistoryEntry=>{
    return entries[x];
  }));
}