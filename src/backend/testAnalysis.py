# Imports the Google Cloud client library
from google.cloud import language_v1

# Instantiates a client
client = language_v1.LanguageServiceClient()

# The text to analyze
text = "I really liked the food here. There are lots of options available for a lot of different diets. They accept Pitt off campus dining dollars which is great for Pitt students. Service is fast and the staff are nice."
document = language_v1.types.Document(
    content=text, type_=language_v1.types.Document.Type.PLAIN_TEXT
)

# Detects the sentiment of the text
sentiment = client.analyze_sentiment(
    request={"document": document}
).document_sentiment

print(f"Text: {text}")

"""score of the sentiment ranges between -1.0 (negative) and 1.0 (positive) and 
corresponds to the overall emotional leaning of the text.

magnitude indicates the overall strength of emotion (both positive and negative) 
within the given text, between 0.0 and +inf. Unlike score, 
magnitude is not normalized for documentSentiment; each expression of emotion 
within the text (both positive and negative) contributes to the text's magnitude 
(so longer text blocks may have greater magnitudes)."""

print(f"Sentiment: {sentiment.score}, Magnitude: {sentiment.magnitude}")