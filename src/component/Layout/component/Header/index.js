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
    faArrowRightFromBracket,
    // faEarthAsia,
    // faCircleQuestion,
    // faCloudUpload,
} from '@fortawesome/free-solid-svg-icons';
// TIPPY ===================
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
//
import HeadlessTippy from '@tippyjs/react/headless';
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
        icon: <img className={cx('login-btn')} src={images.lang} alt="language" />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'VietNam',
                },
            ],
        },
    },
    {
        icon: <img className={cx('login-btn')} src={images.feedback} alt="feedback" />,
        title: 'Feedback and help',
        to: './feedback',
    },
    {
        icon: <img className={cx('login-btn')} src={images.keyboard} alt="keyboard" />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    // Tạo biến để set ẩn hiên HeadlessTippy
    const [searchResult, setSearchResult] = useState([]);

    const current = true; // Biến dùng để thể hiện trạng thái đăng nhập

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]); //API
        }, 0);
    }, []);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    // List item of avatar
    const userMenu = [
        {
            icon: <img className={cx('login-btn')} src={images.discover} alt="feedback" />,
            title: 'Discover',
            // to: './feedback',
        },
        {
            icon: <img className={cx('login-btn')} src={images.live} alt="feedback" />,
            title: 'Live',
            // to: './feedback',
        },
        {
            icon: <img className={cx('login-btn')} src={images.follow} alt="feedback" />,
            title: 'Follow',
            // to: './feedback',
        },
        {
            icon: <img className={cx('login-btn')} src={images.friends} alt="feedback" />,
            title: 'Friends',
            // to: './feedback',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon className={cx('login-btn')} icon={faArrowRightFromBracket} />,
            title: 'Log out',
            // to: './feedback',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok" />
                </div>

                {/* Search */}
                <HeadlessTippy
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
                </HeadlessTippy>

                {/* Actions */}
                <div className={cx('actions')}>
                    {current ? (
                        <>
                            <Tippy delay={[0, 100]} content="Upload Video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <img className={cx('login-btn')} src={images.upload} alt="upload" />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <img className={cx('login-btn')} src={images.mess} alt="mess" />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="New" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <img className={cx('login-btn')} src={images.new} alt="new" />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button>Upload</Button>
                            <Button primary>Log In</Button>
                        </>
                    )}

                    <Menu items={current ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {current ? (
                            <img
                                className={cx('user-avatar')}
                                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/87449ee8c5f2797bba6ec28a1c73edbf~tplv-tiktokx-cropcenter:100:100.webp?dr=14579&nonce=47999&refresh_token=a4aa3138135b413ca7046b86d9c2ae14&x-expires=1739973600&x-signature=QR0c%2FqOqWNnunOo7Ehi8cAYIz4E%3D&idc=my&ps=13740610&shcp=5be10d83&shp=a5d48078&t=4d5b0474"
                                alt="user"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default Header;
