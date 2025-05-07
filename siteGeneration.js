import { log } from "console";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Config
const WP_URL = "http://responsible-it.local/wp-json/wp/v2/pages";

// For __dirname in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Fetch pages from WordPress
const response = await fetch(WP_URL);
const pages = await response.json();

// Filter out homepage (based on slug or ID, adjust if needed)
const filteredPages = pages.filter(
  (page) => page.slug !== "home-page" && page.slug !== "index"
);

// Generate the navigation with all pages (including the homepage)
const navLinks = pages.filter(page => page.slug !== "home" && page.slug !== "home-page").map(page => {
    return `<li><a href="/${page.slug}/">${page.title.rendered}</a></li>`;
  }).join("\n");
  

console.log(`Generating ${filteredPages.length} pages...\n`);

for (const page of pages) {
    console.log(page.slug);
    
  // Check if the page is the homepage (usually the page with the 'slug' == 'home' or some other special property)
  const isHomePage = page.slug === "home" || page.slug === "home-page" || page.slug === "index";
    
  // If it's the homepage, write it to the root as index.html
  const filePath = isHomePage
    ? path.join(__dirname, "index.html") // Root index.html for homepage
    : path.join(__dirname, page.slug, "index.html"); // Other pages in respective folders

  // Create the page directory (if necessary)
  if (!isHomePage) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
  }

  const html = `
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Lectoraat Responsible IT" />

    <title>${page.title.rendered} - Lectoraat Responsible IT</title>

    <script>
      document.documentElement.classList.add("js");
    </script>

    <link rel="stylesheet" href="../styles/tokens--fonts.css" />
    <link rel="stylesheet" href="../styles/tokens--colors.css" />
    <link rel="stylesheet" href="../styles/general.css" />
    <link rel="stylesheet" href="../styles/general--controls.css" />
    <link rel="stylesheet" href="../styles/general--text.css" />
    <link rel="stylesheet" href="../styles/landmark--header.css" />
    <link rel="stylesheet" href="../styles/landmark--header__accessibility.css" />
    <link rel="stylesheet" href="../styles/landmark--triangles.css" />
    <link rel="stylesheet" href="../styles/landmark--main.css" />

    <link rel="icon" type="image/x-icon" href="../images/favicon.ico" />
    <script type="module" src="scripts/fetch.js"></script>
  </head>
  <body>
    <header class="header--body">
      <div class="header--body__block">
        <a href="index.html" class="link--logo" aria-label="naar de homepage">
          <svg
            class="logo--hva-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 246.207 29.653"
          >
            <use xlink:href="../images/logo-nl.svg#logo"></use>
          </svg>
        </a>

        <a href="#main" class="visually-hidden link--skip">direct naar hoofdinhoud</a>

        <button class="button--disclosure button--menu" hidden>Menu</button>

        <nav class="nav--main">
          <ul>
            <li><a href="/">Responsible IT</a></li>
            ${navLinks} <!-- Dynamic list of pages -->
          </ul>
        </nav>

        <details class="details--accessibility">
          <summary>Toeganke&shy;lijkheid</summary>

          <div class="details--accessibility__block">
            <form>
              <fieldset>
                <legend>Lettergrootte</legend>

                <button
                  type="button"
                  name="setting--fontsize--min"
                  class="setting--fontsize--button setting--fontsize--button--min"
                  value="min"
                  hidden
                >
                  <span aria-hidden="true"> A<span>A</span> </span>
                  Kleiner
                </button>

                <select name="setting--fontsize" class="setting--fontsize">
                  <option value="-.2">-20%</option>
                  <option value="-.1">-10%</option>
                  <hr />
                  <option value="0" selected>standaard</option>
                  <hr />
                  <option value=".1">+10%</option>
                  <option value=".2">+20%</option>
                  <option value=".3">+30%</option>
                  <option value=".4">+40%</option>
                  <option value=".5">+50%</option>
                </select>

                <button
                  type="button"
                  name="setting--fontsize--plus"
                  class="setting--fontsize--button setting--fontsize--button--plus"
                  value="plus"
                  hidden
                >
                  <span aria-hidden="true"> <span>A</span>A </span>
                  Groter
                </button>
              </fieldset>

              <fieldset>
                <legend>Alle of minder animaties</legend>

                <label aria-label="volg het systeem qua animaties">
                  <input
                    type="radio"
                    name="setting--motion"
                    value="system"
                    checked
                  />
                  Auto
                </label>

                <label aria-label="minder animaties">
                  <input type="radio" name="setting--motion" value="reduce" />
                  Rustig&nbsp;aan
                </label>

                <label aria-label="alle animaties">
                  <input
                    type="radio"
                    name="setting--motion"
                    value="no-preference"
                  />
                  Animaties
                </label>
              </fieldset>

              <fieldset>
                <legend>Lichte of donkere kleuren</legend>

                <label aria-label="kleurenthema van het systeem">
                  <input
                    type="radio"
                    name="setting--color-theme"
                    value="system"
                    checked
                  />
                  Auto
                </label>

                <label aria-label="donker kleurenthema">
                  <input
                    type="radio"
                    name="setting--color-theme"
                    value="dark"
                  />
                  Donker
                </label>

                <label aria-label="licht kleurenthema">
                  <input
                    type="radio"
                    name="setting--color-theme"
                    value="light"
                  />
                  Licht
                </label>
              </fieldset>

              <fieldset>
                <legend>Contrast</legend>

                <label>
                  <input type="checkbox" name="setting--contrast" />
                  Meer contrast
                </label>
              </fieldset>

              <fieldset>
                <legend>Afbeeldingen</legend>

                <label>
                  <input type="checkbox" name="setting--no-images" />
                  Afbeeldingen verbergen
                </label>
              </fieldset>

              <button type="submit">Toepassen</button>
            </form>
          </div>
        </details>
      </div>
    </header>

    <div class="triangles"></div>

    <main>
      ${page.content.rendered}
    </main>

    <script src="../scripts/general--helpers.js"></script>
    <script defer src="../scripts/landmark--header.js"></script>
    <script defer src="../scripts/landmark--header__accessibility.js"></script>
    <script defer src="../scripts/landmark--triangles.js"></script>
  </body>
</html>
  `.trim();

  // Write the generated HTML to the corresponding page directory
  await fs.writeFile(filePath, html, "utf8");
  console.log(`✓ /${page.slug}/`);
}

// Optional: inject WP data into existing index.html if needed
// You can extend this section as needed to add featured pages or metadata
