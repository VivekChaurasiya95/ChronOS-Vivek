from flask import Flask, render_template, request, jsonify
import requests
from model.predictor import predict_crop

app = Flask(__name__)

# =========================
# Replace with your API Key
# =========================
API_KEY = "xyz"


# =========================
# HOME ROUTE
# =========================
@app.route("/")
def home():
    return render_template("index.html")


# =========================
# CURRENT WEATHER + AI CROP
# =========================
@app.route("/get-weather", methods=["POST"])
def get_weather():

    data = request.json
    lat = data.get("lat")
    lng = data.get("lng")

    # -------- Current Weather --------
    weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&appid={API_KEY}&units=metric"
    weather_response = requests.get(weather_url)

    if weather_response.status_code != 200:
        return jsonify({"error": "Unable to fetch weather"}), 400

    weather_data = weather_response.json()

    temperature = weather_data["main"]["temp"]
    humidity = weather_data["main"]["humidity"]
    wind = weather_data["wind"]["speed"]
    description = weather_data["weather"][0]["description"]
    city = weather_data.get("name", "Unknown Location")

    # -------- Forecast (to get rainfall average) --------
    forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lng}&appid={API_KEY}&units=metric"
    forecast_response = requests.get(forecast_url)

    rainfall_avg = 0

    if forecast_response.status_code == 200:
        forecast_data = forecast_response.json()

        rain_values = []
        for item in forecast_data["list"][:8]:
            rain_values.append(item.get("pop", 0) * 100)

        if rain_values:
            rainfall_avg = sum(rain_values) / len(rain_values)

    # -------- AI Prediction --------
    prediction = predict_crop(temperature, humidity, rainfall_avg)


    # Risk logic (simple)
    risk = "Low"
    if wind > 10:
        risk = "High"
    elif temperature > 35:
        risk = "Medium"

    return jsonify({
    "temperature": temperature,
    "humidity": humidity,
    "description": description,
    "wind_speed": wind,
    "city": city,
    "rainfall_avg": round(rainfall_avg, 2),
    "recommended_crops": [prediction["crop"]],
    "confidence": prediction["confidence"],
    "advice": "AI-based crop recommendation generated.",
    "risk": risk
})



# =========================
# FORECAST ROUTE (For Charts)
# =========================
@app.route("/get-forecast", methods=["POST"])
def get_forecast():

    data = request.json
    lat = data.get("lat")
    lng = data.get("lng")

    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lng}&appid={API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Unable to fetch forecast"}), 400

    forecast_data = response.json()

    temps = []
    labels = []
    rain = []

    for item in forecast_data["list"][:8]:
        temps.append(item["main"]["temp"])
        labels.append(item["dt_txt"].split(" ")[1][:5])
        rain.append(int(item.get("pop", 0) * 100))

    return jsonify({
        "temps": temps,
        "labels": labels,
        "rain": rain
    })


# =========================
# RUN APP
# =========================
if __name__ == "__main__":
    app.run(debug=True)
