function needsDotHTML() {
    const onSite = window.location.origin.startsWith('https://utils.is-a.dev')
    const on127 = window.location.origin.startsWith('http://127.0.0.1')

    return !(onSite || on127)
}

function populateNavbar() {
    var links;

    console.log(window.location.origin)
    if (needsDotHTML()) {
        links = {
            "Home": "/index.html",
            "About": "/about/index.html",
            "Tools": "/tools/index.html",
            "Saved": "/saved/index.html",
            "Settings": "/settings/index.html",
        }
    } else {
        links = {
            "Home": "/",
            "About": "/about",
            "Tools": "/tools",
            "Saved": "/saved",
            "Settings": "/settings",
        }
    }

    let content = ""

    const keys = Object.keys(links);
    for (const key of keys) {
        const value = links[key];
        content = content.concat('<a href="', value, '">', key, '</a>\n')
    }

    var settings = localStorage.getItem('settings')
    if (settings == undefined || settings == NaN || settings == null) {
        localStorage.setItem('settings', '1,#23CE6B') // 1 = dark mode, 0 = light mode
        settings = localStorage.getItem('settings')
    }
    var mode = settings.split(',')[0]

    const styleSheet = document.createElement('link')
    styleSheet.rel = "stylesheet"
    styleSheet.href = mode == "1" ? '/themes/dark.css' : '/themes/light.css'
    styleSheet.id = "theme-style"

    const bottom = document.createElement('div')
    bottom.className = "navbar-bottom";

    const switcher = document.createElement('div');
    switcher.className = "navbar-b-button"
    switcher.id = "darkSwitch"

    const icon = document.createElement('img');
    icon.src = getIcon(icon)
    icon.className = "navbar-b-button-img"

    const feedback = document.createElement('div');
    feedback.className = 'navbar-b-button'
    feedback.id = 'feedback-button'

    const icon2 = document.createElement('img')
    icon2.src = mode == "1" ? '/imgs/feedback-dark.svg' : '/imgs/feedback-light.svg'
    icon2.id = "feedback-button-img"
    icon2.className = "navbar-b-button-img"

    switcher.addEventListener('click', function (e) {
        switchMode(icon);
    })

    document.getElementById("sidenav").innerHTML = content;
    document.body.appendChild(styleSheet)

    document.getElementById('sidenav').appendChild(bottom);

    bottom.appendChild(feedback)
    feedback.appendChild(icon2)

    bottom.appendChild(switcher)
    switcher.appendChild(icon);

    var jsFileFeedback = document.createElement('script')
    jsFileFeedback.src = '/feedback.js'
    document.head.appendChild(jsFileFeedback)
}

function switchMode(pic) {
    var settings = localStorage.getItem('settings')
    if (settings == undefined || settings == NaN || settings == null) {
        localStorage.setItem('settings', '1,default') // 1 = dark mode, 0 = light mode
        settings = localStorage.getItem('settings')
    }
    var mode = settings.split(',')[0]
    var colour = settings.split(',')[1]

    localStorage.setItem('settings', mode == "1" ? 0 + "," + colour : 1 + "," + colour)
    pic.src = mode == "1" ? '/imgs/light.svg' : '/imgs/dark.svg'

    const feedbackIcon = document.getElementById("feedback-button-img")
    feedbackIcon.src = mode == "1" ? '/imgs/feedback-light.svg' : '/imgs/feedback-dark.svg'

    document.getElementById('theme-style').setAttribute('href', mode == "1" ? '/themes/light.css' : '/themes/dark.css')

    if (colour === "default") {
        if (mode === "0") {
            document.documentElement.style.setProperty("--primary", "#23CE6B");
            document.documentElement.style.setProperty("--secondary", "#062d24");
            document.documentElement.style.setProperty("--accent", "#85ff66");
        } else {
            document.documentElement.style.setProperty("--primary", "#23CE6B");
            document.documentElement.style.setProperty("--secondary", "#a5f0c4");
            document.documentElement.style.setProperty("--accent", "#72db58");
        }
    }
}

function getIcon(pic) {
    var settings = localStorage.getItem('settings')
    if (settings == undefined || settings == NaN || settings == null) {
        localStorage.setItem('settings', '1,#23CE6B') // 1 = dark mode, 0 = light mode
        settings = localStorage.getItem('settings')
    }
    var mode = settings.split(',')[0]
    var colour = settings.split(',')[1]

    return mode == "1" ? '/imgs/dark.svg' : '/imgs/light.svg'
}
