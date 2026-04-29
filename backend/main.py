from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Conyx ERP API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Na produção, usar localhost:5173 e domínios da Intranet
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    token: str
    user: dict

@app.get("/")
def read_root():
    return {"message": "Conyx ERP API em execução"}

@app.post("/api/auth/login", response_model=LoginResponse)
def login(req: LoginRequest):
    # Mocking authentication logic
    if req.password == "senha123":
        return {
            "token": "mock-jwt-token-123456",
            "user": {"name": "Admin", "role": "admin"}
        }
    from fastapi import HTTPException
    raise HTTPException(status_code=401, detail="Credenciais inválidas")

class DashboardStatsResponse(BaseModel):
    clientes_ativos: int
    clientes_novos_mes: int
    em_onboarding: int
    onboarding_atraso: int
    em_atencao: int
    em_offboarding: int
    offboarding_atraso: int
    tarefas_aberto: int
    tarefas_atrasadas: int
    tarefas_novas_semana: int

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/dashboard/stats", response_model=DashboardStatsResponse)
def get_dashboard_stats():
    # Mocking data that would come from the database
    return {
        "clientes_ativos": 412,
        "clientes_novos_mes": 3,
        "em_onboarding": 18,
        "onboarding_atraso": 7,
        "em_atencao": 23,
        "em_offboarding": 5,
        "offboarding_atraso": 2,
        "tarefas_aberto": 147,
        "tarefas_atrasadas": 31,
        "tarefas_novas_semana": 5
    }
