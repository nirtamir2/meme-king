
// menu icons

import mainIcon from 'assets/images/logo.png';
import myMemesIcon from 'assets/images/mymemes-icon.png';
import newMemesIcon from 'assets/images/new-icon.png';
import popularIcon from 'assets/images/popular-icon.png';
import dankIcon from 'assets/images/dank-icon.jpg';
import popIcon from 'assets/images/pop-icon.jpg';
import israeliIcon from 'assets/images/israeli-icon.jpg';
import animalsIcon from 'assets/images/animals-icon.jpg';
import eretzIcon from 'assets/images/eretz_nehederet-icon.jpg';
import jewsIcon from 'assets/images/jews-icon.jpg';
import mashupsIcon from 'assets/images/mashups-icon.jpg';
import asiguriIcon from 'assets/images/asi_guri-icon.jpg';
import classicIcon from 'assets/images/classic-icon.jpg';
import parlamentIcon from 'assets/images/parlament-icon.jpg';
import realityIcon from 'assets/images/reality-icon.jpg';
import standupIcon from 'assets/images/standup-icon.jpg';
import tvAbroadIcon from 'assets/images/tv_abroad-icon.jpg';
import commercialsIcon from 'assets/images/commercials-icon.jpg';
import generalIcon from 'assets/images/general-icon.jpg';
import goalstarIcon from 'assets/images/goalstar-icon.jpg';
import israeliTvIcon from 'assets/images/israeli_tv-icon.jpg';
import mediaIcon from 'assets/images/media-icon.jpg';
import crownIcon from 'assets/images/crown-icon.jpg';

const menu = {

    home: {
        title: 'מלך הממים',
        icon: mainIcon,
        linkText: 'ראשי',
        path: '/',
        visible: true
    },

    "all-time-popular": {
        title: 'הפופולאריים בכל הזמנים',
        icon: crownIcon,
        path: '/memes/all-time-popular',
        visible: true
    },

    "popular": {
        title: 'הפופולאריים השבוע',
        icon: popularIcon,
        path: '/memes/popular',
        visible: true
    },

    "my-memes": {
        title: 'הממים האחרונים שלי',
        icon: myMemesIcon,
        path: '/memes/my-memes',
        visible: true
    },

    "new-memes": {
        title: 'ממים חדשים',
        icon: newMemesIcon,
        path: '/memes/new-memes',
        visible: true
    },

    dank: {
        title: "דאנק מימז",
        icon: dankIcon,
        path: `/memes/dank`,
        visible: true
    },

    israeli: {
        title: "ממים ישראליים",
        icon: israeliIcon,
        path: `/memes/israeli`,
        visible: true
    },

    pop: {
        title: "תרבות הפופ",
        icon: popIcon,
        path: `/memes/pop`,
        visible: true
    },

    parlament: {
        title: "הפרלמנט",
        icon: parlamentIcon,
        path: `/memes/parlament`,
        visible: true
    },

    classic: {
        title: "ממים קלאסיים",
        icon: classicIcon,
        path: `/memes/classic`,
        visible: true
    },

    general: {
        title: "כללי",
        icon: generalIcon,
        path: `/memes/general`,
        visible: true
    },

    eretz_nehederet: {
        title: "ארץ נהדרת",
        icon: eretzIcon,
        path: `/memes/eretz_nehederet`,
        visible: true
    },

    tv_abroad: {
        title: "תכניות טלויזיה",
        icon: tvAbroadIcon,
        path: `/memes/tv_abroad`,
        visible: true
    },

    mashups: {
        title: "מאשאפים",
        icon: mashupsIcon,
        path: `/memes/mashups`,
        visible: true
    },

    standup: {
        title: "סטנדאפ",
        icon: standupIcon,
        path: `/memes/standup`,
        visible: true
    },

    goalstar: {
        title: "גולסטאר",
        icon: goalstarIcon,
        path: `/memes/goalstar`,
        visible: true
    },

    israeli_tv: {
        title: "סדרות ישראליות",
        icon: israeliTvIcon,
        path: `/memes/israeli_tv`,
        visible: true
    },

    animals: {
        title: "חיות",
        icon: animalsIcon,
        path: `/memes/animals`,
        visible: true
    }
    ,
    reality: {
        title: "ריאליטי",
        icon: realityIcon,
        path: `/memes/reality`,
        visible: true
    },

    commercials: {
        title: "פרסומות",
        icon: commercialsIcon,
        path: `/memes/commercials`,
        visible: true
    },

    asi_guri: {
        title: "אסי וגורי",
        icon: asiguriIcon,
        path: `/memes/asi_guri`,
        visible: true
    },

    media: {
        title: "מדיה",
        icon: mediaIcon,
        path: `/memes/media`,
        visible: true
    },

    jews: {
        title: "היהודים באים",
        icon: jewsIcon,
        path: `/memes/jews`,
        visible: true
    }

};

export default menu;