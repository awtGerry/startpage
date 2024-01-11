/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"osILN9ZMHwMCfFRW","label":"lyra","bookmarks":[{"id":"U3eHGLY9IVxwPhnD","label":"the hub","url":"https://github.com/awtGerry"},{"id":"sc7TKLR1IJdyVoyB","label":"twitter","url":"https://twitter.com/home"},{"id":"UMREBjHf2EjXEtqi","label":"reddit","url":"https://www.reddit.com/"}]},{"id":"1rkrnJFbvU2P79uW","label":"beermeup","bookmarks":[{"id":"WozCMcsfubB2RCI3","label":"youtube","url":"https://www.youtube.com/"},{"id":"oWSKoxFjKo3vCK5q","label":"chess","url":"https://www.chess.com/"},{"id":"n87pRW3js3LBT555","label":"blackjack","url":"https://wizardofodds.com/play/blackjack-v2/"},{"id":"rd2Wm5ZccFVptzrL","label":"twitch","url":"https://www.twitch.tv/"}]},{"id":"yHxsHT8ZzrjTRLPe","label":"!docs","bookmarks":[{"id":"1Ta6HZcdHIMJzbbD","label":"aur","url":"https://aur.archlinux.org/packages"},{"id":"r4LxV4GtuefyvRPl","label":"nixpkgs","url":"https://search.nixos.org/packages"},{"id":"l0OnKTmR4q7TGy7O","label":"crates","url":"https://crates.io/"},{"id":"PO3J0YmZg0Kun0eZ","label":"rs-docs","url":"https://docs.rs/"}]},{"id":"3C4XU3JGOzEsOWot","label":"devy","bookmarks":[{"id":"7srO1NgheOAMkW7w","label":"esvigis","url":"https://www.svgrepo.com/"},{"id":"8hu3pPezBt1MsfWu","label":"icons","url":"https://fontawesome.com/icons"},{"id":"aP6jXKzufAgsxfzy","label":"img to svg","url":"https://picsvg.com/"},{"id":"NzolOfyhb4zaKe9v","label":"components","url":"https://tailwindui.com/components"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
