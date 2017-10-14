import React from 'react';
import FontAwesome from 'react-fontawesome';


const socialLinks = {
    facebook : {
        iconName : 'facebook',
        link : 'https://www.facebook.com/nir.benyair'
    },
    linkedin : {
        iconName : 'linkedin',
        link : 'https://www.linkedin.com/in/nir-ben-yair-124a59108/',
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

          </div>
        </div>
    )

};