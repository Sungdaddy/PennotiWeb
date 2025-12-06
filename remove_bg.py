from PIL import Image
import os

def remove_black_background(input_path, output_path, threshold=30):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if pixel is black (or close to black)
            if item[0] < threshold and item[1] < threshold and item[2] < threshold:
                newData.append((255, 255, 255, 0)) # Transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

images = [
    "public/white-choco-raspberry.jpg",
    "public/salted-caramel-popcorn.jpg",
    "public/banana-toffee-choco.jpg",
    "public/double-dark-espresso.jpg"
]

for img_path in images:
    if os.path.exists(img_path):
        filename = os.path.basename(img_path)
        name_without_ext = os.path.splitext(filename)[0]
        output_path = f"public/{name_without_ext}.png"
        remove_black_background(img_path, output_path)
    else:
        print(f"File not found: {img_path}")
