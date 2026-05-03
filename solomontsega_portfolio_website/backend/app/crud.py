from sqlalchemy.orm import Session
from . import models, schemas, auth

# Projects
def get_projects(db: Session, category: str = None):
    query = db.query(models.Project)
    if category and category != 'all':
        query = query.filter(models.Project.category == category)
    return query.order_by(models.Project.order.asc()).all()

def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def update_project(db: Session, project_id: int, project: schemas.ProjectCreate):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project:
        for key, value in project.model_dump().items():
            setattr(db_project, key, value)
        db.commit()
        db.refresh(db_project)
    return db_project

def delete_project(db: Session, project_id: int):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if db_project:
        db.delete(db_project)
        db.commit()
    return db_project

# Credentials
def get_credentials(db: Session, category: str = None):
    query = db.query(models.Credential)
    if category:
        query = query.filter(models.Credential.category == category)
    return query.order_by(models.Credential.order.asc()).all()

def create_credential(db: Session, credential: schemas.CredentialCreate):
    db_cred = models.Credential(**credential.model_dump())
    db.add(db_cred)
    db.commit()
    db.refresh(db_cred)
    return db_cred

def update_credential(db: Session, cred_id: int, credential: schemas.CredentialCreate):
    db_cred = db.query(models.Credential).filter(models.Credential.id == cred_id).first()
    if db_cred:
        for key, value in credential.model_dump().items():
            setattr(db_cred, key, value)
        db.commit()
        db.refresh(db_cred)
    return db_cred

def delete_credential(db: Session, cred_id: int):
    db_cred = db.query(models.Credential).filter(models.Credential.id == cred_id).first()
    if db_cred:
        db.delete(db_cred)
        db.commit()
    return db_cred

# Messages
def create_message(db: Session, message: schemas.ContactMessageCreate):
    db_msg = models.ContactMessage(**message.model_dump())
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg

def get_messages(db: Session):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.timestamp.desc()).all()

# User
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
