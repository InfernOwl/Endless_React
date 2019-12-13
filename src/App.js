// React import
import React from 'react';

//asset imports
import couch_large from './assets/_final-assets/photo-couch.jpg';

// Main app import
import './App.css';

class App extends React.Component {

    render() {
        return (<div className="App" >
            <div className="Header">
                <Header />
            </div>
            <div className="Promo">
                <Promo />
            </div>
            <div className="HowItWorks">
                <HowItWorks />
            </div>
        </div>
        );
    }
}

class Header extends React.Component {

    render() {
        return (
            <div className="headerDiv">
                <p className="headerText">ENDLESS</p>
            </div>
        );
    }
}

class Promo extends React.Component {

    render() {
        return (
            <div>
                <img src={couch_large} alt="couch_img" />
                <div className="promoText">
                    <h2>New Games & Accessories</h2>
                    <h1>Monthly packages.</h1>
                    <h1>Excitement delivered daily.</h1>

                    <p>What's the best way to shop for the latest video games and peripherals?
                    How about never shopping at all? You'll get new stuff on your doorstep - every month.</p>

                </div>
                <div className="promoButton" >
                    <button>
                        Get Started
                </button>
                </div>
            </div>
        )
    }
}

class HowItWorks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            steps: [],
        }
    };

    // Call API after page has been initially rendered
    componentDidMount() {
        this.getSteps('https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge');
    }

    // Function to call API and format the response into the How It Works section DOM elements
    getSteps(url) {
        var that = this;
        const stepList = [];

        if (url) {
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                //Sort the returned result by stepNumber
                result.sort((a, b) => a.stepNumber - b.stepNumber);

                Object.keys(result).forEach(function (key) {
                    stepList.push(result[key]);
                })

                const stepsDOM = stepList.sort().map((data, count) => {
                    let stepHolder = [];
                    for (let j = 0; j < data.versionContent.length; j++) {
                        if (typeof stepHolder[0] == 'undefined') {
                            data.versionContent[j].stepNumber = data.stepNumber;
                            stepHolder = data.versionContent[j];
                        } else {
                            if (newerDate(data.versionContent[j].effectiveDate, stepHolder[0].effectiveDate) === data.versionContent[j].effectiveDate) {
                                data.versionContent[j].stepNumber = data.stepNumber;
                                stepHolder = data.versionContent[j];
                            }
                        }
                    }

                    return (
                        <li key={stepHolder.stepNumber}>
                            <div>{stepHolder.stepNumber}</div>
                            <h3>{stepHolder.title}</h3>
                            <p>{stepHolder.body}</p>
                        </li>
                    );
                });

                // Set state steps value to the new DOM element array
                that.setState({
                    steps: stepsDOM,
                });
            });

        }

    }

    render() {
        return (
            <div>
                <p>This is where the How-It-Works Section will go</p>
                <h2>How It Works</h2>
                <ul>
                    {this.state.steps}
                </ul>
            </div>
        )
    }
}

// Helper function to take in two dates and compare which is more recent
function newerDate(date1, date2) {

    let d1 = new Date(date1);
    let d2 = new Date(date2);

    if (d1 > d2) {
        return date1;
    } else {
        return date2;
    }
}


export default App;
