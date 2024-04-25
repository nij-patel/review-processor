import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from google.cloud import language_v2
from dotenv import load_dotenv
import os

client = language_v2.LanguageServiceClient()
app = Flask(__name__)
CORS(app)
api_key = os.environ.get("PLACES_API_KEY")

emojis = {
    "neutral": "😕",
    "positive": "😀",
    "negative": "😠",
}

@app.route("/")
def hello_world():
    return "Hello from Flask!"

@app.route('/test')
def test_fn():
    return api_key

def get_sentiment(s: str):
    c = language_v2.LanguageServiceClient()
    doc_type = language_v2.Document.Type.PLAIN_TEXT
    language_code = "en"

    document = {
        "content": s,
        "type_": doc_type,
        "language_code": language_code,
    }

    encoding_type = language_v2.EncodingType.UTF8
    res = c.analyze_sentiment(
        request={"document": document, "encoding_type": encoding_type}
    )
    return res.document_sentiment.score

def get_place_id(n: str):
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query='{n}'&key={api_key}"
    res = requests.get(url)
    json = res.json()
    if len(json['results']) == 0:
        return ""
    return json['results'][0]['place_id']


    


@app.route('/reviews')
def get_reviews():
    place_search = request.args.get('place_search')
    place_id = get_place_id(place_search)
    url = f"https://maps.googleapis.com/maps/api/place/details/json?placeid={place_id}&key={api_key}"

    headers = {
        "accept": "application/json",
    }

    res = requests.get(url, headers=headers)
    json = res.json()
    data = json["result"]["reviews"]
    avg_sentiment = 0.0
    avg_rating = 0.0
    reviews = []

    for _, review in enumerate(data):
        avg_rating += review['rating']
        r = review['text']
        avg_sentiment += get_sentiment(r)
        reviews.append(r)

    avg_rating /= 5
    emoji = emojis["neutral"] if avg_sentiment == 0.0 else (emojis["positive"] if avg_sentiment > 0 else emojis["negative"])

    return jsonify({
        "emoji": emoji,
        "avg_sentiment": avg_sentiment,
        "avg_rating": avg_rating,
        "place": json['result']['name'],
        "reviews": reviews,
    })

if __name__ == "__main__":
    load_dotenv()
    api_key = os.getenv("PLACES_API_KEY")
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
    # app.run(host='0.0.0.0', port=105)
