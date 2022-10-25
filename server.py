from flask import Flask
from flask import render_template, request, jsonify, Response, redirect

app = Flask(__name__)

toWhom = ""
occasion = ""

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/basic/<key>")
def toWhoAndOccasion(key):
    key = key
    return render_template("basic.html", whom=key)
