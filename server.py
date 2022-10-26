from flask import Flask
from flask import render_template, request, jsonify, Response, redirect
import openai

openai.api_key = "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"

app = Flask(__name__)

toWhom = ""
whom = ""
occasion = ""
paragraphs = []

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/basic/<key>")
def toWhoAndOccasion(key):
    global whom
    key = key
    whom = key
    return render_template("basic.html", whom=key)


@app.route("/generate_paragraph/<receiver>/<event>")
def generate_paragraph(receiver, event):
    global toWhom
    global occasion
    global paragraphs
    global whom
    toWhom = receiver
    occasion = event
    length = len(paragraphs) + 1
    paragraph = ""
    if(length == 1):
        paragraph = "first"
    elif length == 2:
        paragraph = "second"
    else:
        paragraph = "last"

    return render_template("generate_paragraph.html", toWhom=toWhom, occasion=occasion, paragraph=paragraph, whom=whom)

@app.route("/generate", methods=["GET", "POST"])
def gpt3_generate():
    param = request.get_json()
    print(param)
    return jsonify(0)

@app.route("/generated_result")
def generated_result():
    global toWhom
    global occasion
    return render_template("generated_result.html")
