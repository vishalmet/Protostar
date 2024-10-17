from freeGPT import Client
from PIL import Image
from io import BytesIO

while True:
    prompt = input("👦: ")
    try:
        resp = Client.create_generation("prodia", prompt)
        Image.open(BytesIO(resp)).show()
        print(f"🤖: Image shown.")
    except Exception as e:
        print(f"🤖: {e}")

