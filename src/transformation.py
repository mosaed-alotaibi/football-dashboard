import json

# Read the JSON file
with open('/Users/mosae/Projects/AI_Leage_Hackathon/data/eyad_data/feature_engineered/hilal_feature_engineered.json', 'r') as f:
    data = json.load(f)

# Write to JSONL
with open('./data/hilal_output.jsonl', 'w') as f:
    # If your JSON is an array of objects
    if isinstance(data, list):
        for item in data:
            f.write(json.dumps(item) + '\n')
    # If your JSON is a single object with key-value pairs
    elif isinstance(data, dict):
        # Simply write each entry as a separate line
        f.write(json.dumps(data) + '\n')