// add an entry, if the entry already exists, only update the dates array.
export function addEntry2(entry:HistoryEntry):void
{
    chrome.storage.local.get("entries2",(x:LocalStorage)=>{
        var entries2:EntriesDict2=x.entries2 || {};

        // if entry already in database, add the date of the new entry
        // to that entry's list of dates.
        if (entries2[entry.link])
        {
            entries2[entry.link].dates=_.union(entries2[entry.link].dates,entry.dates);
        }

        else
        {
            entries2[entry.link]=entry;
        }

        chrome.storage.local.set({entries2});
    });
}

// get entries
export async function getEntries2():Promise<EntriesDict2>
{
    return new Promise((resolve)=>{
        chrome.storage.local.get("entries2",(x:LocalStorage)=>{
            resolve(x.entries2 || {});
        });
    });
}

// overwrite entrys in the database, do nothing if it doesnt exist.
// return the entries after the update
export async function updateEntrys2(newEntries:HistoryEntry[]):Promise<EntriesDict2>
{
    return new Promise(async (resolve)=>{
        var entries:EntriesDict2=await getEntries2();

        for (var x=0,l=newEntries.length;x<l;x++)
        {
            var entry=newEntries[x];

            if (!entries[entry.link])
            {
                console.log("tried to update non-existing entry",entry);
                continue;
            }

            entries[entry.link]=entry;
        }

        chrome.storage.local.set({entries2:entries});

        resolve(entries);
    });
}

// remove an entry, returns the entries after the removal
export async function removeEntry2(entry:HistoryEntry):Promise<EntriesDict2>
{
    return new Promise(async (resolve)=>{
        var entries:EntriesDict2=await getEntries2();
        delete entries[entry.link];
        chrome.storage.local.set({entries2:entries});
        resolve(entries);
    });
}

// upload all entries from old entries table into new table. no guarantees on which information is taken,
// entries with the same link will be merged.
export function convertOldEntries():void
{
    chrome.storage.local.get(["entries","entries2"],(storage:LocalStorage)=>{
        var entries:HistoryEntryDict=storage.entries || {};
        var entries2:EntriesDict2=storage.entries2 || {};

        for (var x in entries)
        {
            var entry:HistoryEntry=entries[x];
            var entry2:HistoryEntry|undefined=entries2[entry.link];

            if (!entry.date)
            {
                continue;
            }

            if (entry2)
            {
                entry2.dates=_.union(entry2.dates,[entry.date]);
            }

            else
            {
                entries2[entry.link]={
                    ...entry,
                    dates:[entry.date],

                    date:"",
                    id:-1
                };
            }
        }

        chrome.storage.local.set({entries2});
    });
}

// remove all entries2
export function clearEntries2():void
{
    chrome.storage.local.remove("entries2");
}