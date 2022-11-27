import os
from unittest import result
from flask import Flask
from flask import render_template, request, jsonify, Response, redirect
import openai

openai.api_key = "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"
#openai.api_key = os.environ["OPENAI_API_KEY"]


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
    elif length == 3:
        paragraph = "last"
    else:
        paragraph = "final"


    if length == 1:
        return render_template("generate_paragraph.html", toWhom=toWhom, occasion=occasion, paragraph=paragraph, whom=whom)
    elif length == 2:
        return render_template("generate_second.html", toWhom=toWhom, occasion=occasion, paragraph=paragraph, whom=whom)
    elif length == 3:
        return render_template("generate_third.html", toWhom=toWhom, occasion=occasion, paragraph=paragraph, whom=whom)
    else:
        return render_template("generate_final.html", toWhom=toWhom, occasion=occasion, paragraph=paragraph, whom=whom)


@app.route("/generate", methods=["GET", "POST"])
def gpt3_generate():
    global paragraphs
    global whom
    param = request.get_json()
    # print(param)
    who = ""
    if whom == "Him":
        who = "his"
    else:
        who = "her"
    res = ""
    #function to call GPT-3 to generate first paragraph
    def generateBeginning(who, receiver, occasion, additional, content, length):
        prompt = ""
        if additional != "": 
            if additional == "metaphor":
                prompt = f"Compose one paragraph of lover letter containing {length} sentences for {receiver} to celebrate {who} {occasion} with {additional} to {content}"
            else:
                prompt = f"Compose one paragraph of lover letter containing {length} sentences using {additional}: {content} for {receiver} to celebrate {who} {occasion}." 
        else:
            prompt = f"Compose one paragraph of lover letter containing {length} sentences for {receiver} to celebrate {who} {occasion}"
        completion = openai.Completion.create(engine='text-davinci-002', max_tokens=1000, prompt=prompt)
        result = completion.choices[0].text.strip()
        return result

    #function to call GPT-3 to generate second paragraph
    def generateSecond(receiver, attribute, additional, content, length):
        prompt = ""
        if additional != "": 
            if additional == "metaphor":
                prompt = f"Compose one paragraph of lover letter containing {length} sentences for {receiver} to compliment {receiver}'s {attribute} with {additional} to {content}"
            else:
                prompt = f"Compose one paragraph of lover letter containing {length} sentences using {additional}: {content} for {receiver} to compliment {receiver}'s {attribute}." 
        else:
            prompt = f"Compose one paragraph of lover lettercontaining {length} sentences for {receiver} to compliment {receiver}'s {attribute}."
        completion = openai.Completion.create(engine='text-davinci-002', max_tokens=1000, prompt=prompt)
        result = completion.choices[0].text.strip()
        return result

    #function to call GPT-3 to generate third paragraph
    def generateEnding(receiver, purpose, additional, content, length):
        prompt = ""
        if additional != "": 
            if additional == "metaphor":
                prompt = f"Compose one paragraph of lover letter containing {length} sentences with {additional} to {content} for {receiver} to confess my love to {receiver} and {purpose}."
            else:
                prompt = f"Compose one paragraph of lover letter containing {length} sentences using {additional}: {content} for {receiver} to confess my love to {receiver} and {purpose}." 
        else:
            prompt = f"Compose one paragraph of lover letter containing {length} sentences for {receiver} to confess my love to {receiver} and {purpose}."
        completion = openai.Completion.create(engine='text-davinci-002', max_tokens=1000, prompt=prompt)
        result = completion.choices[0].text.strip()
        return result

    #function to call GPT-3 to generate final letter
    def completeLetter(beginning, second, ending, receiver, sender):
        prompt = f"Elaborate a love letter using beginning paragraph '{beginning}', second paragraph: '{second}', and last paragraph: '{ending}' with receiver's name '{receiver}' and sender's name '{sender}'."
        completion = openai.Completion.create(engine='text-davinci-002', max_tokens=3800, prompt=prompt)
        result = completion.choices[0].text.strip()
        return result

    if len(paragraphs) == 0:
        res = generateBeginning(who, param["receiver"], param["occasion"], param["addition"], param["content"], param["length"])
    elif len(paragraphs) == 1:
        res = generateSecond(param["receiver"], param["attr"], param["addition"], param["content"], param["length"])
    elif len(paragraphs) == 2:
        res = generateEnding(param["receiver"], param["purpose"], param["addition"], param["content"], param["length"])
    else:
        res = completeLetter(paragraphs[0], paragraphs[1], paragraphs[2], param["receiver"], param["sender"])
    paragraphs.append(res)
    return jsonify(0)

@app.route("/regenerate", methods=["GET", "POST"])
def gpt3_regenerate():
    global paragraphs
    param = request.get_json()
    print(param)
    def elaborateParagraph(paragraph, requirements):
        prompt = f"Elaborate on {paragraph} to be {requirements}"
        completion = openai.Completion.create(engine='text-davinci-002', max_tokens=1000, prompt=prompt)
        result = completion.choices[0].text.strip()
        return result

    res = elaborateParagraph(paragraphs[-1], param["idea"])

    paragraphs.pop()
    paragraphs.append(res)
    return jsonify(0)

@app.route("/generated_result")
def generated_result():
    global toWhom
    global occasion
    global paragraphs
    return render_template("generated_result.html", result=paragraphs[-1], toWhom=toWhom, occasion=occasion, paragraphs=paragraphs)

@app.route("/final_result")
def final():
    global paragraphs   
    global toWhom
    global occasion
    global whom
    paragraph = paragraphs[-1]
    paragraphs.clear()
    toWhom = ""
    whom = ""
    occasion = ""

    return render_template("result.html", paragraph = paragraph)
