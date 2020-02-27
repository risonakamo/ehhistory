// attempt to run the correct page parser on the current tab. returns a PageParseResult
// in a promise
export default function runPageParser():Promise<PageParseResultWithType>
{
    return new Promise((resolve)=>{
        chrome.tabs.query({active:true,currentWindow:true},(tabs:Tab[])=>{
            var taburl:string;
            if (!tabs.length || !tabs[0].url)
            {
                taburl="";
            }

            else
            {
                taburl=tabs[0].url;
            }

            var tabtype:EntryType=getUrlType(taburl);

            var targetPageParser:string;
            switch (tabtype)
            {
                case "NHENTAI":
                targetPageParser="pageparsers/nhparser.js";
                break;

                case "OTHER":
                resolve({
                    name:"",
                    group:"",
                    type:"OTHER"
                });
                return;
            }

            chrome.tabs.executeScript({file:targetPageParser},(res:PageParseResult[])=>{
                (res[0] as PageParseResultWithType).type=tabtype;
                resolve(res[0] as PageParseResultWithType);
            });
        });
    });
}

// give a url to return a type
function getUrlType(url:string):EntryType
{
    if (url.search(/nhentai\.net\/g/)>=0)
    {
        return "NHENTAI";
    }

    return "OTHER";
}