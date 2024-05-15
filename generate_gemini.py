import os
from pathlib import Path
import shutil
import stat

import yaml


GEMINI_TEMPLATE = '''#!/usr/bin/env python3

head=\'\'\'{head}\'\'\'

instructions = \'\'\'{instructions}\'\'\'

from recipe_site_generator.gemtext_recipe import print_recipe
print_recipe(head, instructions, image_url_path={image}, additional_image_url_paths={additional_images})
'''


def split_yaml_md(text: str) -> tuple[str, str]:
    idx1 = idx2 = None
    idx = 0
    for line in text.split('\n'):
        if line == '---':
            if idx1 is None:
                idx1 = idx
            else:
                idx2 = idx
                break
        idx += len(line) + 1

    yaml = ''
    if idx2 is not None:
        yaml = text[idx1+4:idx2]
    md = text[idx2+4:]

    return yaml, md


def write_gemini_page(input_md_path: Path, target_gemini_path, image_path):
    with open(input_md_path, 'r', encoding='utf-8') as md_file:
        head, instructions = split_yaml_md(md_file.read())

    recipe: dict = yaml.safe_load(head)

    with open(target_gemini_path, 'w', encoding='utf-8') as gemini_file:
        gemini_file.write(GEMINI_TEMPLATE.format(
            head=head,
            instructions=instructions,
            image=f"'{image_path}'" if image_path else None,
            additional_images=recipe.get('additional_images')
        ))
    
    st = os.stat(target_gemini_path)
    os.chmod(target_gemini_path, st.st_mode | stat.S_IEXEC)


if __name__ == '__main__':
    root = Path(__file__).parent
    collection_name = 'bakery'

    target_dir = root/f'gemini/{collection_name}'

    for folder in (
        root/'rezepte/backwaren',
        root/'rezepte/suessgebaeck',
        root/'rezepte/last-page'
    ):
        recipe_dir = target_dir/folder.name
        recipe_dir.mkdir(exist_ok=True, parents=True)
        for recipe_path in folder.iterdir():
            write_gemini_page(
                recipe_path,
                recipe_dir/recipe_path.stem,
                f'/{collection_name}/images/{recipe_path.stem}.jpg'
            )

    shutil.rmtree(str(target_dir / 'images'))
    shutil.copytree(str(root / 'images'), str(target_dir / 'images'))
