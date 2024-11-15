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
    
    age = request.json['age']
    income = request.json['income']
    health = request.json['health']
    prompt = f"""Based on the given age: {age}, the person's annual income in INR: {income} and their medical history: {health}, Provide suitable type of insurance for the person. The Insurance is a patient-focused 5-level insurance framework tailored to the diverse healthcare needs of India’s population. Each level should address specific demographic and income groups, offering benefits that cater to their unique health conditions, medical histories, and financial capacities. The framework must emphasize affordability, comprehensive coverage, and accessibility while reflecting trends in healthcare access, financial security, and wellness. It should be culturally sensitive, equitable, and compliant with Indian regulations.

The Basic Care Plan targets economically weaker sections and rural populations, providing essential healthcare coverage. This plan focuses on affordability, offering hospitalization for critical illnesses, basic outpatient consultations, and accidental coverage. Perks include government subsidies, cashless treatments at government hospitals, and coverage for generic medicines. Additional support like a 24/7 health helpline ensures immediate access to care.

The Family Essentials Plan caters to middle-class families, offering comprehensive health coverage for family members. It includes maternity care, pediatric consultations, and chronic disease management for conditions such as diabetes and hypertension. Perks include family floater benefits covering up to four members, annual preventive health check-ups, and child vaccination coverage. Cashless claim facilities at reputed hospitals enhance its value for families.

The Professional Plus Plan is designed for salaried professionals, entrepreneurs, and small business owners seeking comprehensive health and financial security. This plan includes health and life insurance with added protection for dependents, as well as critical illness coverage. Perks include tax benefits under Section 80D, access to wellness programs, and optional coverage for vision, dental, and mental health. It also includes outpatient surgeries and daycare procedure coverage, catering to fast-paced professional lifestyles.

The Premium Shield Plan is suited for upper-middle-class individuals and frequent travelers who require advanced healthcare options. It offers international medical emergency coverage, advanced diagnostics, and alternative treatments like Ayurveda and Homeopathy. Perks include cashless hospitalization at premium facilities, higher claim limits for critical illnesses, and travel health insurance for both domestic and international trips.

The Elite Comprehensive Plan is designed for high-net-worth individuals (HNIs) and affluent families, offering global health coverage and luxury wellness services. This plan provides unlimited claim coverage with no upper cap, concierge medical services, and comprehensive maternity and newborn care. Additional perks include elective cosmetic surgery coverage, dedicated healthcare managers, and access to wellness retreats and spas. This tier ensures unmatched convenience and exclusivity.

Each insurance level should align with the patient’s age, annual income, current health status, and past diagnosis, offering a personalized recommendation. The plans must prioritize accessibility, equity, and regulatory compliance to support India’s diverse population in achieving their healthcare needs effectively.

Provide a concise, single-line recommendation based on the patient’s profile and the defined framework."""
    response = model.generate_content(prompt)
    specialty = response.candidates[0].content.parts[0].text
    return jsonify({'Insurance Type': specialty})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)