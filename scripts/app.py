from flask import Flask, request, jsonify
import google.generativeai as genai
import os 

app = Flask(__name__)

# Set your API key
os.environ['GOOGLE_API_KEY'] = "AIzaSyDslnjyZp2iLiVt3xvfoGGg6jyylg-fMV8"
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

model = genai.GenerativeModel('gemini-pro')

@app.before_request
def cors_before_request():
    if request.method == 'OPTIONS':
        return jsonify({"result": "success"}), 200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }

@app.after_request
def cors_after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

@app.route('/recommend', methods=['POST', 'OPTIONS'])
def recommend_doctor():
    if request.method == 'OPTIONS':
        return jsonify({"result": "success"}), 200

    symptoms = request.json['symptoms']
    age = request.json['age']
    doctors = request.json['doctors']
    prompt = f"Given the symptoms: {symptoms}, for the given patient's age of {age}, suggest the best applicable type of doctor I should see among {doctors}. Please provide a single, concise answer."
    response = model.generate_content(prompt)
    specialty = response.candidates[0].content.parts[0].text
    return jsonify({'specialty': specialty})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)