import React from 'react';
import s from './Footer.module.css';
import Services from '../../Services'
import Heart from '../Templates/Icon/Heart'

class Footer extends React.Component {
    state = {
        names: []
    }

    constructor(props) {
        super(props)
        this.get_all_names();
    }

    async get_all_names() {
        // Get data
        let data = await Services.getTeamInfo()
        let names = []

        for (let x of data) {
            if (!x['Name'].includes('Нейтан'))
                names.push(x['Name']);
        }

        this.setState({
            names: names
        })
    }

    write_all_names() {
        let names = this.state.names;
        //console.log(names)
        let n = 6
        let lists = []
        let tempGroup = []

        for (let i = 0; i < names.length; i++) {
            if (i % n == 0) {
                lists.push(tempGroup)
                tempGroup = []
            }
            tempGroup.push(names[i])
        }
        lists.push(tempGroup)
        lists.shift() // delte empty first slot

        //console.log("HERE")
        //console.log(lists)

        // CAN'T RETURN ALL OF THEM:

        return lists.map(function (group) {
            return (
                <div className={s.names}>
                    <div className={s.names_object}>
                        <div className={s.name}>{group[3]}</div>
                        <div className={s.name}>{group[0]}</div>
                    </div>
                    <div className={s.names_object}>
                        <div className={s.name}>{group[4]}</div>
                        <div className={s.name}>{group[1]}</div>
                    </div>
                    <div className={s.names_object}>
                        <div className={s.name}>{group[5]}</div>
                        <div className={s.name}>{group[2]}</div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className={s.footer}>
                <div className={s.info}>
                    <div className={s.info_mavka}>
                        <div className={s.logo}><strong>мавка</strong></div>
                        <div className={s.description}>Інноваційна неприбуткова освітня онлайн платформа з контентом, що дійсно підходить учням 21го сторіччя. Створюється з любов'ю <Heart /><br></br><br></br>

                            ©ГО «Мавка», 2020. При використанні матеріалів сайту, зворотнє посилання обов'язкове. Використані тестові завдання належать Українському центру оцінювання якості освіти.</div>
                    </div>

                        <div className={s.info_mavka}>
                            <div className={s.title}><strong>Посилання</strong></div>
                            <div className={s.links}><a href="http://mavka.org" target="_blank">Про мавку</a></div>
                            <div className={s.links}><a href="https://testportal.gov.ua" target="_blank">УЦОЯО</a></div>
                            <div className={s.links}><a href="https://t.me/mavkazno" target="_blank">Телеграм</a></div>
                            <div className={s.links}><a href="https://www.instagram.com/mavka.zno/" target="_blank">Інстаграм</a></div>
                        </div>


                        <div className={s.info_mavka}>
                            <div className={s.title}><strong>Зв'язок</strong></div>
                            <div className={s.links}><a href="/typeform/c4zd7QPG">Повідомити про проблему</a></div>
                            <div className={s.links}><a href="/typeform/RiJmVdHA">Опитування для вчителів</a></div>
                            <div className={s.links}><a href="/typeform/aGYIhiFY">Опитування для учнів</a></div>
                            <div className={s.links}><a href="mailto:hello@mavka.org" target="_blank">Електронна адреса</a></div>
                            <div className={s.links}><a href="http://join.mavka.org" target="_blank">Приєднатися до команди!</a></div>

                        </div>

                </div>
                <div className={s.names_frame}>
                    <div className={s.title}><strong>Люди за мавкою</strong></div>
                    {this.write_all_names()}
                </div>
            </div>
        )
    }
}

export default Footer;
