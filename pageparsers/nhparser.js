(()=>{
    return {
        title:document.querySelector("#info h1").textContent,
        group:document.querySelectorAll("#tags .tags")[3].firstElementChild.textContent.match(/(.*) \(/)[1]
    };
})();