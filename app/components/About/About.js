import _ from 'lodash'
import React, { Component } from 'react'

// components
import Button from 'components/Button/Button'
import GeneratorModal from 'components/GeneratorModal/GeneratorModal'
import Title from 'components/Title/Title';
import Text from 'components/Text/Text';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Icon from 'components/Icon/Icon'
import Tooltip from 'components/Tooltip/Tooltip';

// constants
import aboutConstants from './about-constants';

// helpers
import helpers from 'helpers/helpers'

//  services
import AnalyticsService from 'services/Analytics';

// assets
import logo from 'assets/images/logo.png';
import me from 'assets/images/profile2.jpg';

const AboutText = ({ children }) => (
    <Text theme="black" align="right">
        {children}
    </Text>
)

const AboutLine = ({ children }) => (
    <AboutText>
        <li>
            {children}
        </li>
    </AboutText>
)

export default class About extends Component {

    componentDidMount() {
        AnalyticsService.sendEvent(`enter about page - ${helpers.isMobile() ? 'Mobile': 'Desktop'}`);

    }


    render() {

        return (
            <GeneratorModal onClose={() => this.props.history.goBack()} className="box-about">

                <GeneratorModal.CloseButton  onClick={() => this.props.history.goBack()}  />

                <Title className="margin-bottom-medium">
                    אודות המחולל
                </Title>

                <Grid>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Row>
                                <img className="img-responsive benya-image center-block" src={me} />
                            </Row>
                            <div className="socials-container clearfix margin-top-medium">
                                {_.map(aboutConstants.socials, social => (
                                    <Icon
                                        key={social.className}
                                        className={social.className}
                                        onClick={() => window.open(social.url)}
                                        name={social.icon}
                                        size="xl"
                                    />
                                ))}
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>

                            <AboutText theme="black" align="right">
                                מחולל הממים ״מימ קינג״ נבנה לפני כשנה וחצי על-ידי כדי לאפשר לכולם לייצר ממים אסתטיים, ישראליים ובעיקר דאנק.
                                <br/>
                                כיום המחולל הינו הכלי הראשי בישראל ליצירת ממים.

                            </AboutText>
                            <Title size="h3" align="right">
                                נתונים יבשים:
                            </Title>

                            <ul>
                                <AboutLine>
                                    לאפליקציית אנדרואיד של המחולל יש כ - 16,500 הורדות בגוגל פליי
                                </AboutLine>
                                <AboutLine>
                                    לאפליקציית האייפון של המחולל שנוצרה בחודש אוקטובר יש כ- 1,200 הורדות מהאפ סטור.
                                </AboutLine>
                                <AboutLine>
                                    בכל יום נוצרים במחולל מעל ל- 2,500 ממים
                                </AboutLine>
                            </ul>

                            <Title size="h3" align="right">
                                קצת עלי:
                            </Title>

                            <AboutText theme="black" align="right">
                                שמי ניר בן-יאיר ואני מתכנת פרונטאנד בחברת <a target="_blank"  href="https://www.gloat.com">Gloat.com</a>.
                                <br/>
                                אני גר בתל-אביב ומנהל כמה עמודי פייסבוק מוכרים:
                            </AboutText>
                            <ul>
                                <AboutLine>
                                    <a target="_blank"  href="https://www.facebook.com/neighborhoodSoccerplayer/">כדורגלנים שכונתיים וסבירים</a>
                                </AboutLine>
                                <AboutLine>
                                    <a target="_blank"  href="https://www.facebook.com/telavivmemes/">Tel-Aviv Memes</a>
                                </AboutLine>
                                <AboutLine>
                                    <a target="_blank"  href="https://www.facebook.com/thekingofallmemes/">מלך הממים</a>
                                </AboutLine>
                            </ul>

                            <AboutText theme="black" align="right">
                                בנוסף, אני מנהל את קבוצת הממים המצליחה <a target="_blank" href="https://www.facebook.com/groups/1859370051052121/"> ממים של כדורגל</a>.
                            </AboutText>

                            <AboutText theme="black" align="right">
                                אני בז לממים רגילים וחושב שכולם צריכים להכין רק דאנק מימז.
                            </AboutText>

                        </Col>
                    </Row>

                </Grid>



            </GeneratorModal>
        )
    }

}