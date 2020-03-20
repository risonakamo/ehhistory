export interface EntryViewerStore
{
    entries:HistoryEntryDict //all the loaded entries

    imageEditMode:boolean //whether image edit mode is enabled
    currentImageEditEntries:HistoryEntryDict //dict of entries about to be edited by image editor

    dispatch:(action:StoreAction)=>void
}

var store:EntryViewerStore;

// --- ACTIONS ---
// completely replace the history entries with the given one
interface ReplaceEntriesAction
{
    type:"replaceEntries"
    entries:HistoryEntryDict
}

// switch the image mode to the given mode
interface ChangeImageModeAction
{
    type:"changeImageMode"
    mode:boolean
}

// add the given entry to the current edited entries, or remove it
// if it is already there
interface ToggleAddEditEntry
{
    type:"toggleAddEditEntry"
    entry:HistoryEntry
}

type StoreAction=ReplaceEntriesAction|ChangeImageModeAction|ToggleAddEditEntry;

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

// given an array of history entries, update them in the main history entry
// dict and in the storage
export function updateEntries(updateEntries:HistoryEntry[]):void
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries:HistoryEntryDict=storage.entries || {};

        entries=updateEntries.reduce((r:HistoryEntryDict,x:HistoryEntry)=>{
            r[x.id]=x;
            return r;
        },entries);

        chrome.storage.local.set({entries});

        store.dispatch({
            type:"replaceEntries",
            entries
        });
    });
}

// switch the image edit mode to given mode
export function setImageEditMode(newmode:boolean):void
{
    store.dispatch({
        type:"changeImageMode",
        mode:newmode
    });
}

// add the given history entry for image editing, or remove it if it is already
// there.
export function toggleAddImageEditEntry(entry:HistoryEntry):void
{
    store.dispatch({
        type:"toggleAddEditEntry",
        entry
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

function imageEditEntriesReduce(editEntries:HistoryEntryDict,act:StoreAction):HistoryEntryDict
{
    if (act.type=="changeImageMode")
    {
        if (!act.mode)
        {
            return {};
        }
    }

    if (act.type=="toggleAddEditEntry")
    {
        var theentry=act.entry;
        var entryId=theentry.id;
        var neweditEntries={...editEntries};

        if (!neweditEntries[entryId])
        {
            neweditEntries[entryId]=theentry;
        }

        else
        {
            delete neweditEntries[entryId];
        }

        return neweditEntries;
    }

    return editEntries;
}

// --- STORE DEFINITION ---
store=Redux.createStore((state:EntryViewerStore,act:StoreAction)=>{
    return {
        entries:entriesReduce(state.entries,act),
        imageEditMode:imageEditModeReduce(state.imageEditMode,act),
        currentImageEditEntries:imageEditEntriesReduce(state.currentImageEditEntries,act)
    };
},{
    entries:{},
    imageEditMode:false,
    currentImageEditEntries:{}
} as EntryViewerStore);

export default store;