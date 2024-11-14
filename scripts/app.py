from flask import Flask, request, jsonify
import google.generativeai as genai
import os 
import gunicorn

app = Flask(__name__)

# Set your API key
os.environ['GOOGLE_API_KEY'] = "AIzaSyDslnjyZp2iLiVt3xvfoGGg6jyylg-fMV8"
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

model = genai.GenerativeModel('gemini-pro')

@app.route('/recommend', methods=['POST'])
def recommend_doctor():
    symptoms = request.json['symptoms']
    age = request.json['age']
    doctors = request.json['doctors']
    prompt = f"Given the symptoms: {symptoms}, age: {age}, suggest the best applicable type of doctor I should see among {doctors}. Please provide a single, concise answer."
    response = model.generate_content(prompt)
    specialty = response.candidates[0].content.parts[0].text
    return jsonify({'specialty': specialty})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)