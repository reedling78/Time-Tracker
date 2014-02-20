chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting == "hello"){
        sendResponse({ farewell: "goodbye" });
    }
});



(function(){
    var lsData;

    if(localStorage.hasOwnProperty(todaysDateString())) {
        lsData = JSON.parse(localStorage.getItem(todaysDateString()));
    }

    for (var i = lsData.length - 1; i >= 0; i--) {
        if(lsData[i].isActive){
            startTimer(lsData[i]);
        }
    } 

    function startTimer(model){
        var s = model.s || 0,
            m = model.m || 0,
            h = model.h || 0;

        var timer = setInterval(function(){
            myTimer();
        }, 1000);

        function myTimer() {
            s++;

            if(s == 60){
                s = 0;
                m++;
            }

            if(m == 60){
                m = 0;
                h++;
            }

            model.s = s;
            model.m = m;
            model.h = h;

            chrome.browserAction.setBadgeText({text:s.toString()});
        }
    }

    function todaysDateString(){
        var d = new Date();
        return d.toLocaleDateString();
    }

})();

