import fitz
from pathlib import Path
src = Path('attached_assets/Himanshu_Sharma_Resume_Ecommerce_Lead_(1)_1786687063868.pdf')
out = Path('.agents/outputs/resume-page-1.png')
doc = fitz.open(src)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2,2), alpha=False)
    path = Path(f'.agents/outputs/resume-page-{i+1}.png')
    pix.save(path)
    print(path)
