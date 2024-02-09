

fetchData("https://picsum.photos/v2/list", "GET").then(result=>{
    result.forEach(element => {
    console.log(element.url)
    });
    // console.log(result); // Array of 10 image objects with src, author and other properties
})




