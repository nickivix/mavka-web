import React from 'react';
import s from './NavMenu.module.css';
import g from './../../Style.module.css';

class NavMenu extends React.Component {
 
    render() {
        return (
            <div className={g.background}>
                <div className={[s.page, g.page_].join(' ')}>
                   <div className={s.NavMenu}>
                        
                   </div>
                </div>
            </div>
        );
    }
}

export default NavMenu;