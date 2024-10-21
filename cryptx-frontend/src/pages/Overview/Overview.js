import Dashboard from '../../components/Dashboard/Dashboard';
import Sidenav from '../../components/Sidenav/Sidenav';
import './Overview.css';

const Overview = () => {
    return (
        <div className="overview-wrapper full-height">
            <div className="hide">
                <Sidenav />
            </div>
            <Dashboard />
        </div>
    )
}

export default Overview