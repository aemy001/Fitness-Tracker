import './Dashboard.css';
import MainComponent from '../../Components/card/ourMainComponent';
import Charts from '../../Components/charts/Charts';
import Roundchart from '../../Components/charts/Roundchart';
import Workoutlist from '../../Components/workout/Workoutlist';

function Dashboard() {
    return (
        <div className="App">
            <div className="sb-nav-fixed">
                <div className="container-fluid px-4">
                    <MainComponent />
                    <div className="row">
                        <div className="col-md-4">
                            <div className="div">
                                <Workoutlist /> 
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-6"><Charts /></div>
                                <div className="col-md-6"><Roundchart /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
