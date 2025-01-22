import Header from '~/component/Layout/component/Header';

function HeaderOnly({ children }) {
    return (
        <div>
            <div className="header-main">
                <Header />
            </div>
            <div className="container">
                <div className="row">
                    <div className="content">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderOnly;
