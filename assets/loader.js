async function load() {
    let response = await fetch("https://toetmats.nl/api/leaderboard")
    let data = await response.json()
    console.log(data)

    function findUser(id) {
        return data.Users[id]
    }

    for (let i = 0; i < data.TopChat.length; i++) {
        let user = findUser(data.TopChat[i])
        document.getElementById("chatters").innerHTML += `
        <p class="flex items-center text-gray-400 mb-2 w-full">
                        <img src="` + user.Avatar + `" class="w-10 h-10 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0" />
                        ` + user.Name + `
                        <span class="ml-4"><b>` + user.Messages + `</b></span>
                    </p>`
    }

    for (let i = 0; i < data.TopStreaks.length; i++) {
        let user = findUser(data.TopStreaks[i])
        document.getElementById("streaks").innerHTML += `
        <p class="flex items-center text-gray-400 mb-2 w-full">
                        <img src="` + user.Avatar + `" class="w-10 h-10 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0" />
                        ` + user.Name + `
                        <span class="ml-4"><b>` + user.Streak + `</b></span>
                    </p>`
    }

    for (let i = 0; i < data.TopWatchTime.length; i++) {
        let user = findUser(data.TopWatchTime[i])
        document.getElementById("watchtime").innerHTML += `
        <p class="flex items-center text-gray-400 mb-2 w-full">
                        <img src="` + user.Avatar + `" class="w-10 h-10 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0" />
                        ` + user.Name + `
                        <span class="ml-4"><b>` + secondsToString(user.WatchTimeSeconds * 1000) + `</b></span>
                    </p>`
    }

    for (let i = 0; i < data.Latest.length; i++) {
        let user = findUser(data.Latest[i])
        document.getElementById("newest").innerHTML += `
        <p class="flex items-center text-gray-400 mb-2 w-full">
                        <img src="` + user.Avatar + `" class="w-10 h-10 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0" />
                        ` + user.Name + `
                    </p>`
    }

}

load()



function secondsToString (milliseconds) {
    // TIP: to find current time in milliseconds, use:
    // var  current_time_milliseconds = new Date().getTime();

    function numberEnding (number) {
        return (number > 1) ? 's' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years);
    }
    //TODO: Months! Maybe weeks?
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds);
    }
    return 'less than a second'; //'just now' //or other string you like;
}