//
import Tippy from '@tippyjs/react/headless';
//
import { Wrapper as PopperWrapper } from '~/component/Popper';
import MenuItems from './MenuItems';
//
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

// ==============================================
function Menu({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItems key={index} data={item} />);
    };

    return (
        <Tippy
            interactive
            delay={[0, 700]}
            // visible
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu_list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu_popper')}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
