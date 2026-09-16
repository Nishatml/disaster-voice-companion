from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.weather import get_disaster_forecast

app = FastAPI(title="Disaster Voice Companion API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Active", "system": "Voice-First Disaster Companion"}

@app.get("/api/forecast")
def forecast(lat: float = 23.8103, lon: float = 90.4125):
    return get_disaster_forecast(lat, lon)