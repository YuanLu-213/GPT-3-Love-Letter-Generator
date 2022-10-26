from flask import Flask
from flask import render_template, request, jsonify, Response, redirect
import openai

openai.api_key = "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"

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


@app.route("/generate_paragraph/<receiver>/<event>")
def generate_paragraph(receiver, event):
    global toWhom
    global occasion
    toWhom = receiver
    occasion = event
    return render_template("generate_paragraph.html", toWhom=toWhom, occasion=occasion)

@app.route("/generate", methods=["GET", "POST"])
def gpt3_generate():
    return jsonify(0)

@app.route("/generated_result")
def generated_result():
    global toWhom
    global occasion
    return render_template("generated_result.html")
