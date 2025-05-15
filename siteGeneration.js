import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// example: http://your-link/wp-json/wp/v2/pages
const WP_URL = "https://AIAIAI.art/wp-json/wp/v2/pages";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let pages;
try {
  // Fetch pages from WordPress
  const response = await fetch(WP_URL);
  pages = await response.json();

  // Generate the navigation with all pages (including the homepage)
  const navLinks = pages
    .filter((page) => page.slug !== "home" && page.slug !== "home-page")
    .map((page) => {
      return `<li><a href="/${page.slug}/">${page.title.rendered}</a></li>`;
    })
    .join("\n");
  try {
    for (const page of pages) {
      // Check if the page is the homepage (usually the page with the 'slug' == 'home' or some other special property)
      const isHomePage =
        page.slug === "home" ||
        page.slug === "home-page" ||
        page.slug === "index";

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

    ${
      isHomePage
        ? `
          <link rel="stylesheet" href="styles/tokens--fonts.css" />
          <link rel="stylesheet" href="styles/tokens--colors.css" />
          <link rel="stylesheet" href="styles/general.css" />
          <link rel="stylesheet" href="styles/general--controls.css" />
          <link rel="stylesheet" href="styles/general--text.css" />
          <link rel="stylesheet" href="styles/landmark--header.css" />
          <link rel="stylesheet" href="styles/landmark--header__accessibility.css" />
          <link rel="stylesheet" href="styles/landmark--triangles.css" />
          <link rel="stylesheet" href="styles/landmark--main.css" />
        `
        : `
          <link rel="stylesheet" href="../styles/tokens--fonts.css" />
          <link rel="stylesheet" href="../styles/tokens--colors.css" />
          <link rel="stylesheet" href="../styles/general.css" />
          <link rel="stylesheet" href="../styles/general--controls.css" />
          <link rel="stylesheet" href="../styles/general--text.css" />
          <link rel="stylesheet" href="../styles/landmark--header.css" />
          <link rel="stylesheet" href="../styles/landmark--header__accessibility.css" />
          <link rel="stylesheet" href="../styles/landmark--triangles.css" />
          <link rel="stylesheet" href="../styles/landmark--main.css" />
        `
    }

    <link rel="icon" type="image/x-icon" href="${
      isHomePage ? "" : "../"
    }images/favicon.ico" />
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
            <use xlink:href="${
              isHomePage ? "" : "../"
            }images/logo-nl.svg#logo"></use>
          </svg>
        </a>

        <a href="#main" class="visually-hidden link--skip">direct naar hoofdinhoud</a>

        <button class="button--disclosure button--menu" hidden>Menu</button>

        <nav class="nav--main notranslate">
          <ul>
            <li><a href="/">Responsible IT</a></li>
            ${navLinks}
          </ul>
        </nav>
        <!-- Hier worden de translation vlaggetjes geplaatst -->
        <div class="gtranslate_wrapper flags"></div>
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
                  <span class="notranslate" aria-hidden="true"> A<span>A</span> </span>
                  Kleiner
                </button>

                <select name="setting--fontsize" class="setting--fontsize notranslate">
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
                  <span class="notranslate" aria-hidden="true"> <span>A</span>A </span>
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
        <section class="section--content">
            ${page.content.rendered}
        </section>
    </main>

    <script src="${
      isHomePage ? "" : "../"
    }scripts/general--helpers.js"></script>
    <script defer src="${
      isHomePage ? "" : "../"
    }scripts/landmark--header.js"></script>
    <script defer src="${
      isHomePage ? "" : "../"
    }scripts/landmark--header__accessibility.js"></script>
    <script defer src="${
      isHomePage ? "" : "../"
    }scripts/landmark--triangles.js"></script>
    <script>window.gtranslateSettings = {"default_language":"nl","languages":["nl","en"],"wrapper_selector":".gtranslate_wrapper"}</script>
    <script src="https://cdn.gtranslate.net/widgets/latest/fc.js" defer></script>
  </body>
</html>
  `.trim();

      // Write the generated HTML to the corresponding page directory
      await fs.writeFile(filePath, html, "utf8");
      if(!page.title.rendered.toLowerCase().includes("home") && !page.title.rendered.toLowerCase().includes("index")){
      console.log(`generated: /${page.title.rendered}/`);
      }
    }
  } catch (error) {
    console.log(`Ran into error whilst generating: ${error}`);
  }
} catch (error) {
  console.log(error);
  console.log("Check if you filled in the right 'WP_URL' on line 6");
}
// Optional: inject WP data into existing index.html if needed
// You can extend this section as needed to add featured pages or metadata
