import os
from contextlib import asynccontextmanager
from datetime import timedelta
from typing import List

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from . import models, schemas, crud, auth, database
from .database import engine, get_db
from .seed import seed_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables and seed data on startup
    models.Base.metadata.create_all(bind=engine)
    seed_db()
    yield


app = FastAPI(title="Solomon Tsega Portfolio API", lifespan=lifespan)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication
@app.post("/api/auth/login", response_model=schemas.Token)
def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Projects
@app.get("/api/projects", response_model=List[schemas.Project])
def read_projects(category: str = None, db: Session = Depends(get_db)):
    return crud.get_projects(db, category=category)

@app.post("/api/projects", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    return crud.create_project(db, project=project)

@app.put("/api/projects/{project_id}", response_model=schemas.Project)
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    db_project = crud.update_project(db, project_id=project_id, project=project)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    if not crud.delete_project(db, project_id=project_id):
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"}

# Credentials
@app.get("/api/credentials", response_model=List[schemas.Credential])
def read_credentials(category: str = None, db: Session = Depends(get_db)):
    return crud.get_credentials(db, category=category)

@app.post("/api/credentials", response_model=schemas.Credential)
def create_credential(credential: schemas.CredentialCreate, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    return crud.create_credential(db, credential=credential)

@app.put("/api/credentials/{cred_id}", response_model=schemas.Credential)
def update_credential(cred_id: int, credential: schemas.CredentialCreate, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    db_cred = crud.update_credential(db, cred_id=cred_id, credential=credential)
    if not db_cred:
        raise HTTPException(status_code=404, detail="Credential not found")
    return db_cred

@app.delete("/api/credentials/{cred_id}")
def delete_credential(cred_id: int, db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    if not crud.delete_credential(db, cred_id=cred_id):
        raise HTTPException(status_code=404, detail="Credential not found")
    return {"message": "Credential deleted"}

# Contact Messages
@app.post("/api/messages", response_model=schemas.ContactMessage)
def send_message(message: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    return crud.create_message(db, message=message)

@app.get("/api/messages", response_model=List[schemas.ContactMessage])
def read_messages(db: Session = Depends(get_db), current_user: str = Depends(auth.get_current_user)):
    return crud.get_messages(db)

# Status Check
@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
