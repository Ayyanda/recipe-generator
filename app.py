from flask import Flask, request,jsonify
from flask_cors import CORS 
from AI_handler import get_recipes

app = flask(__name__)
