from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    category = Column(String)  # machine-learning, web-development, etc.
    tags = Column(String)      # Comma-separated or JSON string
    image_url = Column(String)
    live_link = Column(String)
    code_link = Column(String)
    order = Column(Integer, default=0)

class Credential(Base):
    __tablename__ = "credentials"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    subtitle = Column(String)
    description = Column(Text)
    category = Column(String)  # work, academic
    image_url = Column(String)
    verify_link = Column(String)
    order = Column(Integer, default=0)

class ContactMessage(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    message = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
