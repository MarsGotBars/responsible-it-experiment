///////////////////////
// MENU - OPEN/CLOSE //
///////////////////////

function iniMenu() {
  const header = document.querySelector("body header");

  // menu escape
  function handleKeyDownMenu(e) {
    if (e.key == "Escape") {
      header.classList.remove("is-open");
    }
  }

  document.addEventListener("keydown", handleKeyDownMenu);
}


// INI MENU 
iniMenu();