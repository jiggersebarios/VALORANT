
// Prevent auto-scrolling to the section if the page is refreshed
if (performance.navigation.type !== 1) {
    document.getElementById("agents").scrollIntoView({behavior: "auto"});
}
