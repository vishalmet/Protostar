import re

def extract_language_tag(text):
    # Use regex to find the language tag pattern like '@tt-<language>'
    match = re.search(r'@tt-(\w+)', text)
    if match:
        return match.group(1)
    else:
        return None

# Example string
example_str = "@tt-hindi im from chennai"

# Extract the language tag
language = extract_language_tag(example_str)
print(f"Extracted language: {language}")
