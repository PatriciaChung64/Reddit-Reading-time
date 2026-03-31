function renderReadingTime(article) {
    if (!article) return;

    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);
    const wordCount = [...words].length;
    // matchAll returns an iterator, convert to array to get word count
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    // Use the same styling as the publish information in an article's header
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;

    // Support for API reference docs
    const heading = article.querySelector("h1");
    // Support for article docs with date
    //The optional chaining (?.) operator accesses an object's property or calls a function. 
    // If the object accessed or function called using this operator is undefined or null, 
    // the expression short circuits and evaluates to undefined instead of throwing an error.
    const date = article.querySelector("time")?.parentNode;

    (date ?? heading).insertAdjacentElement("afterend", badge);
    //The nullish coalescing (??) operator is a logical operator 
    // that returns its right-hand side operand when its left-hand side 
    // operand is null or undefined, and otherwise returns its left-hand side operand.
}

renderReadingTime(document.querySelector("article"));

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // If a new article was added.
    for (const node of mutation.addedNodes) {
      if (node instanceof Element && node.tagName === 'ARTICLE') {
        // Render the reading time for this particular article.
        renderReadingTime(node);
      }
    }
  }
});

// https://developer.chrome.com/ is a SPA (Single Page Application) so can
// update the address bar and render new content without reloading. Our content
// script won't be reinjected when this happens, so we need to watch for
// changes to the content.
observer.observe(document.querySelector('devsite-content'), {
  childList: true
});