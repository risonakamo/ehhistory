export interface EntryViewerStore extends ReduxStore
{
    entries:HistoryEntryDict
}

var store:EntryViewerStore;

// ACTIONS
interface ReplaceEntriesAction
{
    type:"replaceEntries"
    entries:HistoryEntryDict
}

type StoreAction=ReplaceEntriesAction;

// ACCESS FUNCTIONS
// update the store by syncing with local storage
export function updateEntriesFromStorage():void
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries=storage.entries || {};

        store.dispatch({
            type:"replaceEntries",
            entries
        } as ReplaceEntriesAction);
    });
}

// update an entry with the provided index with the new entry
export function updateEntry(entry:HistoryEntry,entryIndex:number):void
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries=storage.entries || {};

        entries[entryIndex]=entry;

        chrome.storage.local.set({entries});

        store.dispatch({
            type:"replaceEntries",
            entries
        } as ReplaceEntriesAction);
    });
}

// REDUCERS
function entriesReduce(entries:HistoryEntryDict,act:StoreAction):HistoryEntryDict
{
    if (act.type=="replaceEntries")
    {
        return act.entries;
    }

    return entries;
}

// STORE DEFINITION
store=Redux.createStore((state:EntryViewerStore,act:StoreAction)=>{
    return {
        entries:entriesReduce(state.entries,act)
    };
},{
    entries:{}
} as EntryViewerStore);

export default store;