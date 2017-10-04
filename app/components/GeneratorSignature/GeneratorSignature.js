import React from 'react';
import classNames from 'classnames';

export default ({ className }) => (
    <div className={classNames("box-generator-signature text-center" , className)}>
        <h4>
            The generator was built by <a href="mailto:nirbenya@gmail.com"> Nir Ben-Yair </a>
        </h4>
        <p className="text-center">
            הפונט אשר בשימוש הינו הפונט ׳אימפקטה׳, שנתרם ע״י הטיפוגרף עודד עזר.
            <a href="http://www.hebrewtypography.com/"> לאתר הפונטים הישראלי</a>
        </p>
    </div>
)