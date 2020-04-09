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
        case "SANKAKU":
        parser="sanparser";
        break;

        case "BETASANKAKU":
        parser="betasanparser";
        type="SANKAKU";
        break;

        case "NHENTAI":
        parser="nhparser";
        break;

        case "IMGUR":
        parser="imgurparser";
        break;

        case "HITOMI":
        parser="hitomiparser";
        break;

        case "DLSITE":
        parser="dlparser";
        break;

        default:
        parser="";
    }

    return {
        type,
        parser:`pageparsers/${parser}.js`
    };
}

// give a url to return a type
function getUrlType(url:string):EntryType
{
    if (url.search(/chan\.sankakucomplex\.com\/\?tags/)>=0)
    {
        return "SANKAKU";
    }

    else if (url.search(/beta\.sankakucomplex\.com\/\?tags/)>=0)
    {
        return "BETASANKAKU";
    }

    else if (url.search(/nhentai\.net\/g/)>=0)
    {
        return "NHENTAI";
    }

    else if (url.search(/imgur.com\/a/)>=0)
    {
        return "IMGUR";
    }

    else if (url.search(/hitomi.la\/doujinshi/)>=0)
    {
        return "HITOMI";
    }

    else if (url.search(/dlsite.com\/maniax\/work/)>=0)
    {
        return "DLSITE";
    }

    return "OTHER";
}