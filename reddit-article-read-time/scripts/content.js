function renderReadingTime(post) {
    if (!post) return;

    const text = post.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const wordCount = [...text].length;
    // matchAll returns an iterator, convert to array to get word count
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    // Use the same styling as the publish information in an article's header
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;
    badge.style.fontSize = "14px";
    badge.style.fontWeight = "normal";

    heading = document.querySelector("shreddit-post");
    heading = heading.querySelector("h1");

    //reddit automatically cleans the url of query vars after the page loads -> trggiering the URL observer again
    //This causes injection twice, this checks that p hasn't already been injected
    if (!heading.querySelector("p")) {
        heading.insertAdjacentElement("beforeend", badge);
    }
}

renderReadingTime(document.querySelector("shreddit-post-text-body"));

function startObserving() {
    const post = document.querySelector("shreddit-post-text-body");
    renderReadingTime(post);
}

//Observe URL change
let lastUrl = location.href;
const navObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        console.log(`[RedditObserver] Navigation detected → ${lastUrl}`);

        // Give Reddit a moment to render the new post
        setTimeout(startObserving, 1000);
    }
});

navObserver.observe(document.body, { childList: true, subtree: true });