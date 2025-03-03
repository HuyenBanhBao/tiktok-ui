// Layout
import { HeaderOnly } from '~/component/Layout';

// Pages
import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: Search, layout: null },
    { path: '/following', component: Following },
    { path: '/:nickname', component: Profile }, // chú ý
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

// Private Router
const privateRoutes = [];

export { publicRoutes, privateRoutes };
