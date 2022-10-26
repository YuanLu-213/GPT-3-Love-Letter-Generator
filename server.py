from unittest import result
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
    global paragraphs
    param = request.get_json()
    print(param)
    def generateBeginning(receiver, occasion, additional, content, length):
        prompt = ""
        if additional != "": 
            if additional == "metaphor":
                prompt = f"Compose a paragraph containing {length} sentences for {receiver} to celebrate {occasion} with {additional} to {content}"
            else:
                prompt = f"Compose a paragraph containing {length} sentences using {additional}: {content} for {receiver} to celebrate {occasion}." 
        else:
            prompt = f"Compose a paragraph containing {length} sentences for {receiver} to celebrate {occasion}"
        completion = openai.Completion.create(engine='text-davinci-002', max_tokens=256, prompt=prompt)
        result = completion.choices[0].text.strip()
        return result

    res = generateBeginning(param["receiver"], param["occasion"], param["addition"], param["content"], param["length"])
    paragraphs.append(res)
    return jsonify(0)

@app.route("/generated_result")
def generated_result():
    global toWhom
    global occasion
    global paragraphs
    print(paragraphs[-1])
    return render_template("generated_result.html", result=paragraphs[-1])
