import { useEffect, useState } from 'react';
// Font ====================
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
// TIPPY ===================
import Tippy from '@tippyjs/react/headless';
// import 'tippy.js/dist/tippy.css'; // optional
// =========================
import Button from '~/component/Button';
// =========================
import images from '~/assets/images';
// =========================
import { Wrapper as PopperWrapper } from '~/component/Popper';
import AccountItem from '~/component/AccountsItem';
import Menu from '~/component/Popper/Menu';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';

// ==========================================================================
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: './feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    // Tạo biến để set ẩn hiên Tippy
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok" />
                </div>

                {/* Search */}
                <Tippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search__result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search__title')}>Accounts</h4>

                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input
                            placeholder="Search accounts and videos"
                            spellCheck={false}
                            className={cx('search__input')}
                        />

                        {/* btn clear */}
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>

                        {/* loading */}
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        {/* btn search */}
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>

                {/* Actions */}
                <div className={cx('actions')}>
                    <Button>Upload</Button>
                    <Button primary>Log In</Button>

                    <Menu items={MENU_ITEMS}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default Header;
