import requests

def get_disaster_forecast(lat: float, lon: float):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation"
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        
        # Risk assessment logic based on weather thresholds
        max_wind = max(data["hourly"]["wind_speed_10m"][:24])
        total_precip = sum(data["hourly"]["precipitation"][:24])
        
        risk_level = "Low"
        alert = "Normal weather conditions expected."
        
        if max_wind > 50 or total_precip > 50:
            risk_level = "High"
            alert = "Warning: Extreme weather conditions forecasted!"
        elif max_wind > 30 or total_precip > 20:
            risk_level = "Medium"
            alert = "Caution: Moderate rain or high winds expected."

        return {
            "latitude": lat,
            "longitude": lon,
            "risk_level": risk_level,
            "alert_message": alert,
            "max_wind_speed_kmh": max_wind,
            "total_precipitation_mm": total_precip
        }
    except Exception as e:
        return {"error": str(e), "risk_level": "Unknown"}