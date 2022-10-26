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


@app.route("/generate_paragraph")
def generate_paragraph():
    return render_template("generate_paragraph.html")

@app.route("/generated_result")
def generated_result():
    return render_template("generated_result.html")
