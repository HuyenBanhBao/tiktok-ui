// Font ====================
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faArrowRightFromBracket,
    // faEarthAsia,
    // faCircleQuestion,
    // faCloudUpload,
} from '@fortawesome/free-solid-svg-icons';
// TIPPY ===================
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

// import 'tippy.js/dist/tippy.css'; // optional
// =========================
import Button from '~/component/Button';
// =========================
import images from '~/assets/images';
// =========================
import Search from '../Search';
//
import Menu from '~/component/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/component/Icons';
import Image from '~/component/Image';

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

    const current = true; // Biến dùng để thể hiện trạng thái đăng nhập

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
                <Search />

                {/* Actions */}
                <div className={cx('actions')}>
                    {current ? (
                        <>
                            <Tippy delay={[0, 100]} content="Upload Video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="New" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
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
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/87449ee8c5f2797bba6ec28a1c73edbf~tplv-tiktokx-cropcenter:100:100.webp?dr=14579&nonce=47999&refresh_token=a4aa3138135b413ca7046b86d9c2ae14&x-expires=1739973600&x-signature=QR0c%2FqOqWNnunOo7Ehi8cAYIz4E%3D&idc=my&ps=13740610&shcp=5be10d83&shp=a5d48078&t=4d5b0474"
                                alt="user"
                                // fallback="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
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
