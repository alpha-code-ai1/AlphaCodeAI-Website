from pathlib import Path
from PIL import Image
source = Path("C:/Users/Aryan/.codex/generated_images/01a0a670-18fa-7671-b9d5-d4fc648c8436")
target = Path(__file__).resolve().parent.parent / "public" / "visuals"
assets = [["automation","exec-ff2163ef-74cd-4e35-b007-f167f2b12726.png"],["whatsapp","exec-038d92b7-a3e2-4d97-a97d-4fc2a9c8e7b7.png"],["mvp","exec-5061eb18-92cb-43ae-8d80-5e8647f2bd5c.png"],["documents","exec-abfcda73-651a-4bc8-9d76-13c55f29ce1e.png"],["property","exec-2e875ab1-b3db-40ec-a824-7a45226aeadd.png"]]
for name, filename in assets:
    with Image.open(source / filename) as original:
        for width, suffix in [(1200, ""), (640, "-640")]:
            prepared = original.convert("RGB")
            prepared.thumbnail((width, width), Image.Resampling.LANCZOS)
            destination = target / f"campaign-{name}-v2{suffix}.webp"
            prepared.save(destination, "WEBP", quality=83, method=6)
            print(destination.name, destination.stat().st_size)
