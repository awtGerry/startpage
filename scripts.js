/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
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
  return engineUrls[engine] + value
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

const bookmarks = [{"id":"swuv5ffNjWkgmJ5B","label":"favs","bookmarks":[{"id":"oLRSHi3iYyF6Vi0n","label":"twitter","url":"https://twitter.com/home"},{"id":"3w0QSHaGbm8Hgjh7","label":"github","url":"https://github.com/"},{"id":"2q1ujpeKqVAqxPCQ","label":"chess","url":"https://www.chess.com/"},{"id":"V430iUBEVmSNEnPT","label":"walls","url":"https://wallhaven.cc/"}]},{"id":"0X27Y7d8sttMgxYM","label":"porn","bookmarks":[{"id":"8jagVs5jc4Yx3QZN","label":"bets","url":"https://www.playdoit.mx/#page=prelive"},{"id":"oZs3hkI5qVnIFEA2","label":"laliga","url":"https://www.laliga.com/laliga-santander/calendario"},{"id":"gfKWarayobHnlyiq","label":"premier","url":"https://www.premierleague.com/matchweek/7831/blog"},{"id":"54m2HR8S873qXssA","label":"liga mx","url":"https://ligamx.net/"}]},{"id":"KaK33GZOCKwiGQ0M","label":"src","bookmarks":[{"id":"pO8BkHfPUfShzF7W","label":"icons","url":"https://feathericons.com/"},{"id":"1jfDcxTuSuFuJXwu","label":"fonts","url":"nerdfonts.com"},{"id":"WW8ntcrWRLIIp1xL","label":"codepen","url":"https://codepen.io/"}]},{"id":"YSCnt0cUkUZ0VU4u","label":"tools","bookmarks":[{"id":"m9o2phAAJZrrZXND","label":"pixlrx","url":"pixlr.com"},{"id":"Z3YmI3aOVpyC5vc2","label":"image enlarger","url":"https://bigjpg.com/"},{"id":"LCSsB1jRxR1UJlK3","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"},{"id":"yjKcSC63PL01nMrK","label":"haikei","url":"https://app.haikei.app/"}]},{"id":"OL7QSInaBWYIzEwt","label":"social","bookmarks":[{"id":"luo73z8bUDmgRxZG","label":"youtube","url":"https://www.youtube.com/"},{"id":"2XqERBHkVQvWe3Hy","label":"reddit","url":"https://www.reddit.com/"},{"id":"1RzWGeDDL9fxagoK","label":"wp","url":"https://web.whatsapp.com/"}]}]

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
