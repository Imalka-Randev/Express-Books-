import re

with open('src/scripts/seed.ts', 'r') as f:
    content = f.read()

# Replace formatsAvailable arrays
content = re.sub(r"formatsAvailable:\s*\[.*?\]", "formatsAvailable: ['E-Book']", content)

# Replace deliveryInfo
content = re.sub(r"deliveryInfo:\s*'.*?'", "deliveryInfo: 'Instant digital access.'", content)

# Fix images
content = content.replace("https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=800&auto=format&fit=crop&q=60", "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80")
content = content.replace("https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&auto=format&fit=crop&q=60", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80")

with open('src/scripts/seed.ts', 'w') as f:
    f.write(content)

print("Seed file updated!")
