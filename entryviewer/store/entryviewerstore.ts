export interface EntryViewerStore
{
    entries:HistoryEntryDict
    imageEditMode:boolean
    dispatch:(action:StoreAction)=>void
}

var store:EntryViewerStore;

// --- ACTIONS ---
interface ReplaceEntriesAction
{
    type:"replaceEntries"
    entries:HistoryEntryDict
}

interface ChangeImageModeAction
{
    type:"changeImageMode"
    mode:boolean
}

type StoreAction=ReplaceEntriesAction|ChangeImageModeAction;

// --- ACCESS FUNCTIONS ---
// update the store by syncing with local storage
export function updateEntriesFromStorage():void
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries=storage.entries || {};

        store.dispatch({
            type:"replaceEntries",
            entries
        });
    });
}

// update an entry in storage with the provided entry. the id should
// already be inside the entry.
export function updateEntry(entry:HistoryEntry):void
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries=storage.entries || {};

        entries[entry.id]=entry;

        chrome.storage.local.set({entries});

        store.dispatch({
            type:"replaceEntries",
            entries
        });
    });
}

export function setImageEditMode(newmode:boolean):void
{
    store.dispatch({
        type:"changeImageMode",
        mode:newmode
    });
}

// --- STORE REDUCERS ---
function entriesReduce(entries:HistoryEntryDict,act:StoreAction):HistoryEntryDict
{
    if (act.type=="replaceEntries")
    {
        return act.entries;
    }

    return entries;
}

function imageEditModeReduce(currentMode:boolean,act:StoreAction):boolean
{
    if (act.type=="changeImageMode")
    {
        return act.mode;
    }

    return currentMode;
}

// --- STORE DEFINITION ---
store=Redux.createStore((state:EntryViewerStore,act:StoreAction)=>{
    return {
        entries:entriesReduce(state.entries,act),
        imageEditMode:imageEditModeReduce(state.imageEditMode,act)
    };
},{
    entries:{},
    imageEditMode:false
} as EntryViewerStore);

export default store;