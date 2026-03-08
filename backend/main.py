import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

# Setup Gemini API - We need the user to have an environment variable named GEMINI_API_KEY
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "DUMMY_KEY_FOR_TESTING"))
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI(title="Career Craft API")

# Setup CORS for the frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allowing all for hackathon MVP ease
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

class RoadmapRequest(BaseModel):
    user_goal: str
    dream_company: str

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Career Craft API is running"}

@app.post("/api/chat")
def chat_bot(msg: ChatMessage):
    user_text = msg.message
    
    # Prompt engineering to ensure the bot acts specifically as a coding assistant
    system_prompt = """
    You are 'Helping Hands', an expert AI coding assistant belonging to the Career Craft learning platform.
    Your main goal is to help students with coding.
    If the user provides code, review it, find bugs, explain them, and provide the corrected code.
    Always format any code in your response using Markdown code blocks (e.g. ```python ).
    Keep the explanations concise, encouraging, and easy to understand for a student.
    
    User message: 
    """ + user_text

    try:
        # Check if the user is just asking for a dummy hit while testing
        api_key_check = os.environ.get("GEMINI_API_KEY", "DUMMY_KEY_FOR_TESTING")
        if api_key_check is None or api_key_check == "DUMMY_KEY_FOR_TESTING":
            try:
                import urllib.request
                import json
                
                url = "https://text.pollinations.ai/"
                data = json.dumps({
                    "messages": [
                        {"role": "system", "content": "You are 'Helping Hands', an expert AI coding assistant belonging to the Career Craft learning platform. Your main goal is to help students with coding. Always format any code in your response using Markdown code blocks."},
                        {"role": "user", "content": user_text}
                    ],
                    "model": "openai"
                }).encode('utf-8')
                
                req = urllib.request.Request(
                    url, 
                    data=data,
                    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 CareerCraft'}
                )
                with urllib.request.urlopen(req, timeout=40) as response:
                    text_response = response.read().decode('utf-8')
                    return {"reply": text_response}
            except Exception as e:
                return {"reply": f"Hello! My free-tier AI generation is temporarily limited during this demo. ({str(e)})"}
            
        response = model.generate_content(system_prompt)
        return {"reply": response.text}
    except Exception as e:
        return {"reply": f"Sorry, I ran into an error connecting to my AI brain: {str(e)}"}

@app.post("/api/roadmap")
def generate_roadmap(req: RoadmapRequest):
    # If the user is just asking for a dummy hit while testing
    if os.environ.get("GEMINI_API_KEY") is None or os.environ.get("GEMINI_API_KEY") == "DUMMY_KEY_FOR_TESTING":
        goal_lower = req.user_goal.lower()
        
        # Real-looking dynamic roadmaps based on keywords
        if "web" in goal_lower or "react" in goal_lower or "frontend" in goal_lower or "full stack" in goal_lower:
            return {
                "modules": [
                    { "id": 1, "title": "Advanced React & State", "status": "In Progress", "desc": f"Master modern UI architecture for {req.dream_company}.", "pct": 0, "lessons": ["Hooks & Custom Hooks", "Redux Toolkit / Context API", "React Server Components"] },
                    { "id": 2, "title": "Backend API Integrations", "status": "Locked", "desc": "Connect your frontend to robust web servers.", "pct": 0, "lessons": ["RESTful Routing", "GraphQL APIs", "JWT Authentication"] },
                    { "id": 3, "title": f"Cracking the {req.dream_company} Frontend Interview", "status": "Locked", "desc": "Live simulation of system design and DOM manipulation.", "pct": 0, "lessons": ["System Design: News Feed", "Performance: Virtual DOM", "Accessibility (a11y)"] }
                ]
            }
        elif "data" in goal_lower or "machine learning" in goal_lower or "ml" in goal_lower or "ai" in goal_lower:
            return {
                "modules": [
                    { "id": 1, "title": "Data Preprocessing & Math", "status": "In Progress", "desc": "Linear algebra and handling missing data.", "pct": 0, "lessons": ["Numpy & Pandas Mastery", "Handling Nulls/Scaling", "Matrix Operations"] },
                    { "id": 2, "title": "Deep Learning Architecture", "status": "Locked", "desc": "Building neural networks from scratch.", "pct": 0, "lessons": ["Convolutional Neural Networks", "Backpropagation Math", "PyTorch Basics"] },
                    { "id": 3, "title": f"{req.dream_company} ML System Design", "status": "Locked", "desc": "Real world scalable ML systems.", "pct": 0, "lessons": ["Recommendation Engines", "Model Serving & MLOps", "Latency Optimization"] }
                ]
            }
        elif "cloud" in goal_lower or "aws" in goal_lower or "devops" in goal_lower:
             return {
                "modules": [
                    { "id": 1, "title": "Cloud Infrastructure Basics", "status": "In Progress", "desc": "Compute, Storage, and Networking domains.", "pct": 0, "lessons": ["VPC & Subnets", "EC2 & Auto-Scaling", "S3 Storage Classes"] },
                    { "id": 2, "title": "Serverless & Microservices", "status": "Locked", "desc": "Modern scalable application deployment.", "pct": 0, "lessons": ["AWS Lambda & API Gateway", "Docker Containerization", "ECS & Fargate"] },
                    { "id": 3, "title": f"Deploying at {req.dream_company} Scale", "status": "Locked", "desc": "High availability patterns.", "pct": 0, "lessons": ["CI/CD Pipelines", "Blue-Green Deployments", "Disaster Recovery"] }
                ]
            }
        
        # Highly realistic generic fallback
        return {
            "modules": [
                {
                    "id": 1,
                    "title": f"Fundamentals of {req.user_goal}",
                    "status": "In Progress",
                    "desc": f"Core concepts mapped for {req.dream_company}.",
                    "pct": 0,
                    "lessons": [f"Introduction & Environment Setup", f"Core syntax & Workflows in {req.user_goal}", "Debugging and Error Handling"]
                },
                {
                    "id": 2,
                    "title": f"Advanced {req.user_goal}",
                    "status": "Locked",
                    "desc": "Deep dive into production-level code.",
                    "pct": 0,
                    "lessons": ["Memory & Performance Optimization", "Design Patterns", "Security Best Practices"]
                },
                {
                    "id": 3,
                    "title": f"{req.dream_company} Specific System Design",
                    "status": "Locked",
                    "desc": "How exactly the company scales these tools.",
                    "pct": 0,
                    "lessons": ["Microservices Architecture", "Leadership Principles", "Whiteboarding & Mock Interview"]
                }
            ]
        }
        
    system_prompt = f"""
    You are an expert career counselor and technical mentor. 
    Generate a JSON learning roadmap for a student wanting to learn '{req.user_goal}' to get a job at '{req.dream_company}'.
    
    The JSON must match exactly this structure:
    {{
      "modules": [
        {{
          "id": 1,
          "title": "Clear Module Title (e.g., Fundamentals of React)",
          "status": "In Progress", // First module is 'In Progress', rest are 'Locked'
          "desc": "Short description of the module",
          "pct": 0, // Always 0 initially
          "lessons": ["Lesson 1 Name", "Lesson 2 Name", "Lesson 3 Name"] // 3-4 specific lesson topics
        }},
        // Generate exactly 3-4 modules in sequence. First is In Progress, rest Locked. pct always 0.
      ]
    }}
    
    Do NOT include any markdown formatting or tags (like ```json), just the raw JSON object string.
    """
    
    try:
        response = model.generate_content(system_prompt)
        import json
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        return json.loads(text.strip())
    except Exception as e:
        print(f"Error generating roadmap: {e}")
        # Failure fallback
        return {
            "modules": [
                {
                    "id": 1,
                    "title": f"Fallback: Learn {req.user_goal}",
                    "status": "In Progress",
                    "desc": "We had an issue generating your customized AI roadmap. Here is a generic one.",
                    "pct": 0,
                    "lessons": ["Topic 1", "Topic 2", "Topic 3"]
                }
            ]
        }

@app.post("/api/generate_test")
def generate_test(req: RoadmapRequest):
    test_json_template = {
        "tests": [
            {
                "name": f"{req.user_goal} Core Concepts",
                "desc": f"Test focused on fundamental {req.user_goal} concepts.",
                "time": 30,
                "questions": [
                    { "id": 1, "question": f"Which pattern is essential for scalable {req.user_goal} applications?", "options": ["MVC/Microservices", "Global Variables", "Synchronous blocking", "Monolithic loops"], "answer": "MVC/Microservices" },
                    { "id": 2, "question": f"What is the most performance-efficient way to handle state in {req.user_goal}?", "options": ["Direct DOM manipulation", "Local state with context", "Global window object", "Database queries per keystroke"], "answer": "Local state with context" },
                    { "id": 3, "question": f"How would you deploy a {req.user_goal} project for {req.dream_company} production?", "options": ["FTP Upload", "Emailing the zip", "CI/CD Pipelines", "Copy paste on server"], "answer": "CI/CD Pipelines" }
                ]
            },
            {
                "name": f"{req.dream_company} Architecture Fundamentals",
                "desc": f"Evaluates system design standard methodologies at {req.dream_company}.",
                "time": 45,
                "questions": [
                     { "id": 1, "question": f"What is the best practice for Continuous Integration according to {req.dream_company}?", "options": ["Automated testing in pipelines", "Testing in production", "No tests", "Manual QA only"], "answer": "Automated testing in pipelines" },
                     { "id": 2, "question": f"How should you structure your data for optimal read performance?", "options": ["Normalized", "Denormalized/Cached", "Flat File", "In-memory only"], "answer": "Denormalized/Cached" },
                     { "id": 3, "question": f"Which caching mechanism is most commonly used in {req.dream_company} scale systems?", "options": ["LocalStorage", "Redis/Memcached", "SessionStorage", "Cookies"], "answer": "Redis/Memcached" }
                ]
            }
        ]
    }
    
    if os.environ.get("GEMINI_API_KEY") is None or os.environ.get("GEMINI_API_KEY") == "DUMMY_KEY_FOR_TESTING":
        try:
            import urllib.request
            import json
            
            prompt = f"Generate a JSON containing 2 specific adaptive tests (with 3 multiple-choice questions each) to evaluate a candidate wanting to learn '{req.user_goal}' for '{req.dream_company}'. Format identically to: {json.dumps(test_json_template)}. ONLY OUTPUT RAW JSON."
            
            url = "https://text.pollinations.ai/"
            data = json.dumps({
                "messages": [
                    {"role": "system", "content": "You are a senior technical interviewer. Return only raw JSON without any markdown formatting block or code block syntax. Never wrap in ```json."},
                    {"role": "user", "content": prompt}
                ],
                "model": "openai",
                "jsonMode": True
            }).encode('utf-8')
            
            req_obj = urllib.request.Request(
                url, 
                data=data,
                headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 CareerCraft'}
            )
            with urllib.request.urlopen(req_obj, timeout=60) as response:
                text_response = response.read().decode('utf-8')
                
                # Cleanup if pollinations accidentally adds wrappers
                text_response = text_response.strip()
                if text_response.startswith("```json"):
                    text_response = text_response[7:]
                if text_response.endswith("```"):
                    text_response = text_response[:-3]
                    
                return json.loads(text_response)
        except Exception as e:
            return test_json_template
            
    try:
        import json
        system_prompt = f"You are a technical interviewer. Generate a JSON containing 2 specific adaptive tests (with 3 multiple-choice questions each) to evaluate a candidate wanting to learn '{req.user_goal}' for '{req.dream_company}'. The JSON format must literally exactly match: {json.dumps(test_json_template)}. DO NOT INCLUDE MARKDOWN TICKS."
        response = model.generate_content(system_prompt)
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        return json.loads(text.strip())
    except Exception as e:
        return test_json_template

@app.post("/api/generate_internship")
def generate_internship(req: RoadmapRequest):
    internship_json_template = {
        "tasks": [
            {
                "id": 1,
                "title": f"{req.dream_company} Architecture Challenge",
                "xp": "+500 XP",
                "type": f"{req.user_goal} Engineering Simulation",
                "desc": f"Implement a highly debounced, multi-regional feature that gracefully handles degraded network connections according to {req.dream_company} standards.",
                "est_time": "Est. 2 Hours",
                "color": "blue"
            },
            {
                "id": 2,
                "title": "High-Concurrency Sync",
                "xp": "+850 XP",
                "type": "Backend Systems Simulation",
                "desc": f"Resolve distributed locking issues when millions of users attempt to access highly demanded {req.dream_company} services.",
                "est_time": "Est. 4 Hours",
                "color": "green"
            }
        ]
    }
    
    if os.environ.get("GEMINI_API_KEY") is None or os.environ.get("GEMINI_API_KEY") == "DUMMY_KEY_FOR_TESTING":
        try:
            import urllib.request
            import json
            
            prompt = f"Generate a JSON containing 2 specific job simulation tasks to evaluate a candidate wanting to learn '{req.user_goal}' for '{req.dream_company}'. Format identically to: {json.dumps(internship_json_template)}. ONLY OUTPUT RAW JSON. Set color to either 'blue', 'green', 'purple', or 'orange'."
            
            url = "https://text.pollinations.ai/"
            data = json.dumps({
                "messages": [
                    {"role": "system", "content": "You are a senior tech lead. Return only raw JSON without any markdown formatting block or code block syntax. Never wrap in ```json."},
                    {"role": "user", "content": prompt}
                ],
                "model": "openai",
                "jsonMode": True
            }).encode('utf-8')
            
            req_obj = urllib.request.Request(
                url, 
                data=data,
                headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 CareerCraft'}
            )
            with urllib.request.urlopen(req_obj, timeout=60) as response:
                text_response = response.read().decode('utf-8')
                
                # Cleanup if pollinations accidentally adds wrappers
                text_response = text_response.strip()
                if text_response.startswith("```json"):
                    text_response = text_response[7:]
                if text_response.endswith("```"):
                    text_response = text_response[:-3]
                    
                return json.loads(text_response)
        except Exception as e:
            return internship_json_template
            
    try:
        import json
        system_prompt = f"You are a tech lead. Generate a JSON containing 2 specific job simulation tasks to evaluate a candidate wanting to learn '{req.user_goal}' for '{req.dream_company}'. The JSON format must literally exactly match: {json.dumps(internship_json_template)}. DO NOT INCLUDE MARKDOWN TICKS."
        response = model.generate_content(system_prompt)
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        return json.loads(text.strip())
    except Exception as e:
        return internship_json_template
