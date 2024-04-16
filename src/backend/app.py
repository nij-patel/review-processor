import json, requests
from flask import Flask, jsonify, request
from google.cloud import language_v1
from dotenv import load_dotenv
import os

client = language_v1.LanguageServiceClient()
app = Flask(__name__)
api_key = ""

@app.route("/")
def hello_world():
    return "Hello from Flask!"

@app.route('/reviews')
def get_reviews():
    place_id = request.args.get('place_id')
    url = f"https://maps.googleapis.com/maps/api/place/details/json?placeid={place_id}&key={api_key}"

    headers = {
        "accept": "application/json",
    }

    res = requests.get(url, headers=headers)
    json = res.json()
    data = json["result"]["reviews"]
    avg_rating = 0
    for i, review in enumerate(data):
        avg_rating = avg_rating + int(review['rating'])
    return f"Average rating was {avg_rating / 5}"

@app.route('/analyze')
def analyze_sentiment():
    # get yelp url as query param
    req_data = request.args.get('yelp_url')

    url = "https://api.yelp.com/v3/businesses/business_id_or_alias/review_highlights?count=3"

    headers = {
        "accept": "application/json",
        "Authorization": "API-KEY"
    }

    yelp_response = requests.get(url, headers=headers)
    
    sentiments = []
    for review in yelp_response["review_highlihts"]:
        highlight = review["sentence"]

        # edit to get rid brackets: "Better than Roam Artisan Burger's and Barney's 
        # [[HIGHLIGHT]]Burgers[[ENDHIGHLIGHT]] my go to when I want a good burger.","

        highlight = highlight.split("[")[0] + highlight.split("")

        # formats review to pass to Google API
        review_doc = language_v1.types.Document(
            content=highlight, type_=language_v1.types.Document.Type.PLAIN_TEXT
        )
        # gets sentiment analysis
        sentiment = client.analyze_sentiment(
            request={"document": review_doc}
        ).document_sentiment
        sentiments.append(sentiment)


if __name__ == "__main__":
    load_dotenv()
    api_key = os.getenv("PLACES_API_KEY")
    app.run(debug=True)
