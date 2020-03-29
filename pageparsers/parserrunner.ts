interface TargetParser
{
    parser:string
    type:EntryType
}

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

            var {type:tabtype,parser:targetPageParser}=getTargetParser(taburl);

            if (tabtype=="OTHER")
            {
                resolve({
                    name:"",
                    group:"",
                    type:"OTHER",
                    url:taburl
                });
                return;
            }

            chrome.tabs.executeScript({file:targetPageParser},(res:PageParseResult[])=>{
                resolve({
                    name:res[0].name,
                    group:res[0].group,
                    type:tabtype,
                    url:taburl
                });
            });
        });
    });
}

// given a string, return a page parser script url and the type
function getTargetParser(url:string):TargetParser
{
    var type:EntryType=getUrlType(url);
    var parser:string;

    switch (type)
    {
        case "NHENTAI":
        parser="pageparsers/nhparser.js";
        break;

        case "IMGUR":
        parser="pageparsers/imgurparser.js";
        break;

        default:
        parser="";
    }

    return {
        type,
        parser
    };
}

// give a url to return a type
function getUrlType(url:string):EntryType
{
    if (url.search(/nhentai\.net\/g/)>=0)
    {
        return "NHENTAI";
    }

    else if (url.search(/imgur.com\/a\//)>=0)
    {
        return "IMGUR";
    }

    return "OTHER";
}