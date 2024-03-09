python

from flask import Flask, request, jsonify

app = Flask(__name__)

# Dummy database to store availability data
availability_data = {}

@app.route('/api/availability', methods=['POST'])
def update_availability():
 req_data = request.get_json()
 restaurant_id = req_data['restaurant_id']
 date = req_data['date']
 time_slots = req_data['time_slots']
 
 # Update availability data in the database
 availability_data[restaurant_id] = {'date': date, 'time_slots': time_slots}
 
 return jsonify({'message': 'Availability updated successfully'})

if __name__ == '__main__':
 app.run(debug=True)
