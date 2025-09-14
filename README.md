Weather App

A simple weather application that displays weather information with a clean interface.
The app uses index.html as the entry point, descriptions.json for weather condition mappings, and static assets for styling and interactivity.

Project Structure
.
├── index.html           # Main HTML file (entry point)
├── descriptions.json    # JSON file with weather descriptions
├── static/
│   ├── weather.js       # JavaScript logic for fetching & displaying weather
│   └── style.css        # CSS styling

Features

Fetches and displays weather information.

Uses JSON mappings for weather condition descriptions.

Responsive UI with CSS styling.

How to Run

Clone this repository:

git clone https://github.com/your-username/weather-app.git
cd weather-app


Open index.html in a browser.
(If using APIs that require fetch, you may need to run a local server, e.g. with Python:)

python -m http.server 8000


Then open http://localhost:8000
 in your browser.

Files

index.html – Main page structure.

descriptions.json – Weather descriptions / mappings.

static/weather.js – Handles weather data logic and DOM updates.

static/style.css – Styling for the app.

Future Improvements

Add search by city.

Display extended forecast.

Improve mobile responsiveness.

License

This project is open-source under the MIT License.