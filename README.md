# BrainyBots

An AI-Powered Mentorship & Education Platform that generates dynamic learning roadmaps, assesses programming knowledge, and provides highly-realistic job simulations. 

## Structure
- **Frontend**: A sleek, interactive UI built with React + Vite. (`frontend/`)
- **Backend**: A robust REST API built in Python with FastAPI, integrating AI generation. (`backend/`)

## Running Locally

**Backend Setup**
```bash
cd backend
python -m venv venv
# Activate the virtual environment:
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
