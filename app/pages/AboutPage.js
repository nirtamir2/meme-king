import React from 'react';
import FontAwesome from 'react-fontawesome';


const socialLinks = {
    facebook : {
        iconName : 'facebook',
        link : 'https://www.facebook.com/nir.benyair'
    },
    linkedin : {
        iconName : 'linkedin',
        linke : 'https://www.linkedin.com/in/nir-ben-yair-124a59108/',
    },
    github : {
        iconName: 'github',
        link : 'https://github.com/NirBenya'
    },
    email : {
        iconName : 'envelope',
        link : 'mailto:nirbenya@gmail.com'
    }
};

export default ()=>{


    const getSocialLinks = ()=>{
       return Object.keys(socialLinks).map(social => {
           const current = socialLinks[social];
           return (
               <a href={current.link} >
                   <FontAwesome size="2x" name={current.iconName} />
               </a>
           )
       })
    }

    return(
        <div className="about-page">
          <div className="container">
              <img className="logo" src={`${process.env.PUBLIC_URL}/images/logo.png`}/>
              <h1> על המחולל</h1>
              <p>
המחולל נבנה על ידי, ניר בן-יאיר, כדי לתת אפשרות נוחה להכנת ממים באנגלית ובעברית, ממאגר גדול ובפורמטים שונים.
              </p>
              <p>

                  למחולל יש גם אפליקציה לאנדוראיד אותה ניתן
                  <a href="https://play.google.com/store/apps/details?id=com.guru.filesys.webbrowser" target="_blank">
להוריד מכאן
                  </a>
                  .
              </p>
              <p>
                  ביום יום אני עובד כמפתח FrontEnd בסטארט אפ המגניב Workey
                  שם אני בונה ממשקים ואפליקציות בתחומים שונים.

              </p>
              <p>
                  ליצירת קשר, דיווח על באגים, שליחת ממים חדשים ובקשות אחרות, ניתן לפנות אלי באחת מהפלטפורמות הבאות:
              </p>


              <div className="social-links-wrapper">
                  {getSocialLinks()}
              </div>

              <p>
                  תרגישו חופשי :)
              </p>

          </div>

        </div>
    )

};