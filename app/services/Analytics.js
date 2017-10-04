
 class Analytics{

    sendEvent = (eventName, eventData)=>{
        const date = new Date();
        ga('send', {
            hitType: 'event',
            eventCategory: eventName,
            eventAction: `${eventData ? eventData + ',' : '' } ${date.getHours()}:${date.getMinutes()}` ,
            eventLabel: eventName
        });

        console.log('<< GA >>', eventName , eventData || '')
    }

 };



export default new Analytics();