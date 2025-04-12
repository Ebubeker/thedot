import base64

# Your base64 image string (truncated here for brevity)
img_data = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUS..."  # Replace with your full string

# Decode and save the image
with open("strawberries.jpg", "wb") as f:
    f.write(base64.b64decode(img_data))
