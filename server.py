from flask import Flask
from flask import render_template, request, jsonify, Response, redirect

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")