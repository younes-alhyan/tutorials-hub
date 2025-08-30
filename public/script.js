const backBtn = document.getElementById("backBtn");
let backBtnHref = "./index.html";

backBtn.addEventListener("click", () => {
  window.location.href = backBtnHref; // main page
});

async function renderMarkdown(file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error("Tutorial not found");
    const md = await res.text();

    // Convert markdown to HTML
    const html = marked.parse(md);
    const content = document.getElementById("content");
    content.innerHTML = html;

    // Re-run syntax highlighting after injecting content
    hljs.highlightAll();
  } catch (err) {
    const content = document.getElementById("content");
    content.innerHTML = `<p style="color:red;">❌ Failed to load tutorial: ${err.message}</p>`;
  }
}

function getTutorial() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("tutorial");
}

function updateTitle(tutorial) {
  const head = document.head;
  const titleElement = document.head.querySelector("title");
  if (tutorial) {
    const title = tutorial.charAt(0).toUpperCase() + tutorial.slice(1);
    titleElement.textContent = title;
    const faviconLink = document.createElement("link");
    faviconLink.innerHTML += `<link rel="icon" type="image/png" href="./icons/${tutorial}.svg">`;
    head.appendChild(faviconLink);
    return;
  }
  titleElement.textContent = "📚 Tutorials Hub";
  const favicon = document.querySelector('link[rel~="icon"]');
  if (favicon) {
    favicon.remove();
  }
}

function addCopyButton(code) {
  const copyContainer = document.createElement("div");
  copyContainer.className = "copy-container";
  copyContainer.innerHTML = `
    <span class="copy-text">copy</span>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path d="M12.668 10.667C12.668 9.95614 12.668 9.46258 12.6367 9.0791C12.6137 8.79732 12.5758 8.60761 12.5244 8.46387L12.4688 8.33399C12.3148 8.03193 12.0803 7.77885 11.793 7.60254L11.666 7.53125C11.508 7.45087 11.2963 7.39395 10.9209 7.36328C10.5374 7.33197 10.0439 7.33203 9.33301 7.33203H6.5C5.78896 7.33203 5.29563 7.33195 4.91211 7.36328C4.63016 7.38632 4.44065 7.42413 4.29688 7.47559L4.16699 7.53125C3.86488 7.68518 3.61186 7.9196 3.43555 8.20703L3.36524 8.33399C3.28478 8.49198 3.22795 8.70352 3.19727 9.0791C3.16595 9.46259 3.16504 9.95611 3.16504 10.667V13.5C3.16504 14.211 3.16593 14.7044 3.19727 15.0879C3.22797 15.4636 3.28473 15.675 3.36524 15.833L3.43555 15.959C3.61186 16.2466 3.86474 16.4807 4.16699 16.6348L4.29688 16.6914C4.44063 16.7428 4.63025 16.7797 4.91211 16.8027C5.29563 16.8341 5.78896 16.835 6.5 16.835H9.33301C10.0439 16.835 10.5374 16.8341 10.9209 16.8027C11.2965 16.772 11.508 16.7152 11.666 16.6348L11.793 16.5645C12.0804 16.3881 12.3148 16.1351 12.4688 15.833L12.5244 15.7031C12.5759 15.5594 12.6137 15.3698 12.6367 15.0879C12.6681 14.7044 12.668 14.211 12.668 13.5V10.667ZM13.998 12.665C14.4528 12.6634 14.8011 12.6602 15.0879 12.6367C15.4635 12.606 15.675 12.5492 15.833 12.4688L15.959 12.3975C16.2466 12.2211 16.4808 11.9682 16.6348 11.666L16.6914 11.5361C16.7428 11.3924 16.7797 11.2026 16.8027 10.9209C16.8341 10.5374 16.835 10.0439 16.835 9.33301V6.5C16.835 5.78896 16.8341 5.29563 16.8027 4.91211C16.7797 4.63025 16.7428 4.44063 16.6914 4.29688L16.6348 4.16699C16.4807 3.86474 16.2466 3.61186 15.959 3.43555L15.833 3.36524C15.675 3.28473 15.4636 3.22797 15.0879 3.19727C14.7044 3.16593 14.211 3.16504 13.5 3.16504H10.667C9.9561 3.16504 9.46259 3.16595 9.0791 3.19727C8.79739 3.22028 8.6076 3.2572 8.46387 3.30859L8.33399 3.36524C8.03176 3.51923 7.77886 3.75343 7.60254 4.04102L7.53125 4.16699C7.4508 4.32498 7.39397 4.53655 7.36328 4.91211C7.33985 5.19893 7.33562 5.54719 7.33399 6.00195H9.33301C10.022 6.00195 10.5791 6.00131 11.0293 6.03809C11.4873 6.07551 11.8937 6.15471 12.2705 6.34668L12.4883 6.46875C12.984 6.7728 13.3878 7.20854 13.6533 7.72949L13.7197 7.87207C13.8642 8.20859 13.9292 8.56974 13.9619 8.9707C13.9987 9.42092 13.998 9.97799 13.998 10.667V12.665ZM18.165 9.33301C18.165 10.022 18.1657 10.5791 18.1289 11.0293C18.0961 11.4302 18.0311 11.7914 17.8867 12.1279L17.8203 12.2705C17.5549 12.7914 17.1509 13.2272 16.6553 13.5313L16.4365 13.6533C16.0599 13.8452 15.6541 13.9245 15.1963 13.9619C14.8593 13.9895 14.4624 13.9935 13.9951 13.9951C13.9935 14.4624 13.9895 14.8593 13.9619 15.1963C13.9292 15.597 13.864 15.9576 13.7197 16.2939L13.6533 16.4365C13.3878 16.9576 12.9841 17.3941 12.4883 17.6982L12.2705 17.8203C11.8937 18.0123 11.4873 18.0915 11.0293 18.1289C10.5791 18.1657 10.022 18.165 9.33301 18.165H6.5C5.81091 18.165 5.25395 18.1657 4.80371 18.1289C4.40306 18.0962 4.04235 18.031 3.70606 17.8867L3.56348 17.8203C3.04244 17.5548 2.60585 17.151 2.30176 16.6553L2.17969 16.4365C1.98788 16.0599 1.90851 15.6541 1.87109 15.1963C1.83431 14.746 1.83496 14.1891 1.83496 13.5V10.667C1.83496 9.978 1.83432 9.42091 1.87109 8.9707C1.90851 8.5127 1.98772 8.10625 2.17969 7.72949L2.30176 7.51172C2.60586 7.0159 3.04236 6.6122 3.56348 6.34668L3.70606 6.28027C4.04237 6.136 4.40303 6.07083 4.80371 6.03809C5.14051 6.01057 5.53708 6.00551 6.00391 6.00391C6.00551 5.53708 6.01057 5.14051 6.03809 4.80371C6.0755 4.34588 6.15483 3.94012 6.34668 3.56348L6.46875 3.34473C6.77282 2.84912 7.20856 2.44514 7.72949 2.17969L7.87207 2.11328C8.20855 1.96886 8.56979 1.90385 8.9707 1.87109C9.42091 1.83432 9.978 1.83496 10.667 1.83496H13.5C14.1891 1.83496 14.746 1.83431 15.1963 1.87109C15.6541 1.90851 16.0599 1.98788 16.4365 2.17969L16.6553 2.30176C17.151 2.60585 17.5548 3.04244 17.8203 3.56348L17.8867 3.70606C18.031 4.04235 18.0962 4.40306 18.1289 4.80371C18.1657 5.25395 18.165 5.81091 18.165 6.5V9.33301Z"></path></svg>
  `;

  copyContainer.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.innerText); // copy code text
      copyContainer.querySelector(".copy-text").textContent = "copied!";
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  });
  copyContainer.addEventListener("mouseleave", () => {
    copyContainer.querySelector(".copy-text").textContent = "copy";
  });
  code.parentNode.appendChild(copyContainer);
}

function toAnchor(str) {
  // 1. URL-encode any emoji or special characters
  let encoded = encodeURIComponent(str);

  // 2. Lowercase the string
  encoded = encoded.toLowerCase();

  // 3. Replace spaces and multiple hyphens with single hyphen
  encoded = encoded.replace(/%20| /g, "-");

  // 4. Replace other unwanted characters (&, /, etc.) with hyphen
  encoded = encoded.replace(/[^a-z0-9\-!%]/g, "");

  // 5. Collapse multiple hyphens into one
  encoded = encoded.replace("%26", "");

  return encoded;
}

async function init() {
  const tutorial = getTutorial();
  const path = tutorial ? `./tutorials/${tutorial}.md` : "README.md";
  await renderMarkdown(path);
  updateTitle(tutorial);
  if (!tutorial) {
    backBtnHref = "https://github.com/younes-alhyan/tutorials-hub";
    backBtn.textContent = "🌐 View on GitHub";
    return;
  }

  // Safely replace icon
  const img = document.querySelector(".markdown-body img");
  if (img) img.src = `./icons/${tutorial}.svg`;

  // Headers & TOC links
  const list = document.querySelector("ol");
  if (!list) return;
  const items = list.querySelectorAll("li");
  const headers = document.querySelectorAll("h2");

  // Give each header an ID slug
  headers.forEach((h) => {
    const slug = toAnchor(h.textContent);
    h.id = slug;
  });

  // Smooth scroll for TOC links
  items.forEach((li) => {
    const a = li.querySelector("a");
    if (!a) return;
    const slug = a.getAttribute("href").slice(1).toLowerCase();
    console.log(slug);

    a.addEventListener("click", (e) => {
      e.preventDefault();
      const el = document.getElementById(slug);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${slug}`);
    });
  });

  // Scroll to hash on load
  const hash = decodeURIComponent(window.location.hash).slice(1);
  const el = document.getElementById(hash);
  if (el) el.scrollIntoView({ behavior: "smooth" });

  // Add Copy Buttons
  const codes = document.querySelectorAll("code");
  for (const code of codes) {
    if (code.className) {
      addCopyButton(code);
    }
  }

  // Highlight active TOC item while scrolling
  window.addEventListener("scroll", () => {
    let current = "";
    headers.forEach((h) => {
      const rect = h.getBoundingClientRect();
      if (rect.top <= 100) current = h.id;
    });
    items.forEach((li) => {
      const a = li.querySelector("a");
      if (!a) return;
      li.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  });
}
hljs.registerLanguage("bash", function (hljs) {
  return {
    name: "Bash-Args",
    contains: [
      hljs.HASH_COMMENT_MODE, // comments
      {
        className: "built_in", // first command
        begin: /^[a-zA-Z0-9_\-\.]+/,
        end: /\s/,
      },
      {
        className: "title", // second word if it doesn't start with -
        begin: /(?<=^[a-zA-Z0-9_\-\.]+\s)(?!-)[a-zA-Z0-9_\-\.]+/,
        end: /\s/,
      },
      {
        className: "params", // arguments (-x or --xxx)
        begin: /-[a-zA-Z]\b|--[a-zA-Z0-9_\-]+\b/,
      },
      hljs.QUOTE_STRING_MODE, // strings
      hljs.NUMBER_MODE, // numbers
    ],
  };
});

init();
