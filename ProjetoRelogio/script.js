const hoursHand = document.querySelector('[data__hours]');
const minutesHand = document.querySelector('[data__minutes]');
const secondsHand = document.querySelector('[data__seconds]');

const setRotation = (element, rotationPercentage) => {
    element.style.setProperty("--rotation", rotationPercentage * 360);
};

const setClock = () => {
    const currentDate = new Date();

    const secondsPercentage = currentDate.getSeconds() / 60;
    const minutesPercentage = (secondsPercentage + currentDate.getMinutes()) / 60;
    const hoursPercentage = (minutesPercentage + currentDate.getHours()) / 12;

    setRotation(secondsHand, secondsPercentage);
    setRotation(minutesHand, minutesPercentage);
    setRotation(hoursHand, hoursPercentage);
};

setClock();

setInterval(setClock, 1000);