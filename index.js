const h = document.querySelector("#hours");
const m = document.querySelector("#mins");
const s = document.querySelector("#secs");

const format = x => {
    return ("0" + Math.floor(x)).slice(-2);
};

function AdjustingInterval(workFunc, interval, errorFunc) {
    var that = this;
    var expected, timeout;
    this.interval = interval;

    this.start = function() {
        expected = Date.now() + this.interval;
        timeout = setTimeout(step, this.interval);
    };

    this.stop = function() {
        clearTimeout(timeout);
    };

    function step() {
        var drift = Date.now() - expected;
        if (drift > that.interval) {
            // You could have some default stuff here too...
            if (errorFunc) errorFunc();
        }
        workFunc();
        expected += that.interval;
        timeout = setTimeout(step, Math.max(0, that.interval - drift));
    }
}

const updateTime = () => {
    const twelve = new Date();
    twelve.setHours(24);
    twelve.setMinutes(0);
    twelve.setSeconds(0);

    const rn = new Date();
    var diff = twelve.getTime() - rn.getTime(); //number of milliseconds

    const hours = diff / (3600 * 1000);
    diff %= 3600 * 1000;
    const min = diff / (1000 * 60);
    diff %= 1000 * 60;
    const sec = diff / 1000;
    h.innerHTML = format(hours);
    m.innerHTML = format(min);
    s.innerHTML = format(sec);
};

updateTime();

const ticker = new AdjustingInterval(updateTime, 1000, () => {});
ticker.start();
