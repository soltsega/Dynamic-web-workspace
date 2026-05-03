from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

# Base schemas
class ProjectBase(BaseModel):
    title: str
    description: str
    category: str
    tags: str
    image_url: Optional[str] = None
    live_link: Optional[str] = None
    code_link: Optional[str] = None
    order: int = 0

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    class Config:
        from_attributes = True

class CredentialBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    description: str
    category: str
    image_url: Optional[str] = None
    verify_link: Optional[str] = None
    order: int = 0

class CredentialCreate(CredentialBase):
    pass

class Credential(CredentialBase):
    id: int
    class Config:
        from_attributes = True

class ContactMessageBase(BaseModel):
    name: str
    email: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: int
    timestamp: datetime
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
