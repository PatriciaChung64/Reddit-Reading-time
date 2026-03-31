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
    heading.insertAdjacentElement("beforeend", badge);
}

renderReadingTime(document.querySelector("shreddit-post-text-body"));

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // If a new article was added.
    for (const node of mutation.addedNodes) {
      if (node instanceof Element && node.tagName === "shreddit-post-text-body") {
        // Render the reading time for this particular article.
        renderReadingTime(node);
      }
    }
  }
});

observer.observe(document.querySelector('shreddit-app'), {
  childList: true
});