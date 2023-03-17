/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "ecosia"
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

const bookmarks = [{"id":"So33UOEMgxre6Zho","label":"SOCIAL","bookmarks":[{"id":"JMhoGmw2WM7CVwnV","label":"whats","url":"https://web.whatsapp.com/"},{"id":"2z48HxhKVaeScW19","label":"twitter","url":"https://twitter.com/home"},{"id":"ccuXthgUyu1CLJvk","label":"youtube","url":"https://www.youtube.com/"}]},{"id":"peQDgR8TDTPoXupG","label":"SPORTS","bookmarks":[{"id":"Q1GYZjt84XjOZk2A","label":"playdoit","url":"https://www.playdoit.mx"},{"id":"V8NCjO8BZI3vatoA","label":"vipbox","url":"https://www.vipbox.lc/"},{"id":"RMxLh5XgARnAQQDg","label":"viperplay","url":"https://viperplay.online/"},{"id":"eEui8xUNrwYV6oyy","label":"pirlo","url":"pirlotv.fr"}]},{"id":"PfLjrq2Evb4oAbkg","label":"ENTERTAINMENT","bookmarks":[{"id":"2Rbs3DRCHcuSdyW6","label":"HBO max","url":"https://play.hbomax.com/profile/select"},{"id":"0i0ncN2W8rrDncWX","label":"Star +","url":"https://www.starplus.com/select-profile"},{"id":"tPAQY6h5Jb5IPHdd","label":"Prime Video","url":"https://www.primevideo.com/storefront/ref=atv_me_RentBuy_c_9zZ8D2_1_0?language=es_ES"},{"id":"mnmGP21kPjaP728O","label":"Disney +","url":"https://www.disneyplus.com/select-profile"}]},{"id":"v3GPwcLySymIiVQP","label":"DEV","bookmarks":[{"id":"zNbIkAHK5uCg1lwV","label":"github","url":"https://github.com/awtGerry"},{"id":"mtTF6Ktr5ARre6PP","label":"codepen","url":"https://codepen.io/trending"},{"id":"N38iRWy8YEODtrNL","label":"frontendmasters","url":"https://frontendmasters.com/dashboard/"}]},{"id":"sgz8ADX8rgTInyif","label":"OTHER","bookmarks":[{"id":"u7TPClIyEQl5yH4T","label":"Amazon","url":"https://www.amazon.com.mx/"},{"id":"R1CMBkFG2EcAWWHw","label":"Gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"8ONw24y9zoQVPDOr","label":"twitch.tv","url":"https://www.twitch.tv/"},{"id":"7NjvUCf0UtKRj91K","label":"chess.com","url":"https://www.chess.com/"}]}]

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
