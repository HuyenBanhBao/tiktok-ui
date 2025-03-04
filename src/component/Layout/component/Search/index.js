import { useEffect, useState, useRef } from 'react';
//
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
//
import * as searchServices from '~/apiServices/searchServices';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import AccountItem from '~/component/AccountsItem';
//
import { DeleteIcon, SearchIcon } from '~/component/Icons';
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//
import HeadlessTippy from '@tippyjs/react/headless';
//
import { useDebounce } from '~/hooks';
//
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);
//
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    // DÙNG DEBOUNCE ĐỂ DELAY SEARCH TRONG INPUT
    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        // setLoading(true);

        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
        // request
        //     .get('users/search', {
        //         params: {
        //             q: debounced,
        //             type: 'less',
        //         },
        //     })
        //     // log (res) de xem lai
        //     .then((res) => {
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
        // Toi uu code
        // Muốn gọn gàng hơn nữa thì tách ra làm hàm rieng

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);
            setSearchResult(result);

            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    //
    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search__result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search__title')}>Accounts</h4>

                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    className={cx('search__input')}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />

                {/* btn clear */}
                {!!searchValue && !loading && (
                    <button
                        className={cx('clear')}
                        onClick={() => {
                            setSearchValue('');
                            inputRef.current.focus();
                        }}
                    >
                        <DeleteIcon />
                    </button>
                )}

                {/* loading */}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                {/* btn search */}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
