# rezept

This repository contains recipes that came to me through various channels (relatives, friends, colleagues, books, internet search…).
I have tested each recipe myself and only added it to my collection when I really liked it.

There's a folder **rezepte/** (which is German for »recipes«) that contains the manually written markdown recipe files.

The **gemini/** and **html/** folders contain conversions of these files that can be viewed in a gemini browser or web browser. They were generated with my [recipe_site_generator](https://github.com/my-tien/recipe_site_generator))

What is gemini? The [gemini protocol](https://geminiprotocol.net/)col is an alternative to the HTTP protocol with a focus on simplicity. To host gemini sites, you can for example use the [SpaceCafe server](https://github.com/Eroica/SpaceCafe). The gemini protocol is used by gemini browsers such as [lagrange](https://github.com/skyjake/lagrange) for Linux/Mac or [Gemicom](https://github.com/Eroica/Gemicom) for Android phones.


## Deployment for HTML server

The HTML folder can be served as is and all HTML files can be viewed stand-alone and offline. Just make sure not to change the folder structure to not break the links in the index.html and the relative references to the images.


## Deployment for SpaceCafe server

- Setup your SpaceCafe server
- Install [recipe_site_generator](https://github.com/my-tien/recipe_site_generator) on the server
- copy-paste the gemini folder into your SpaceCafe directory
- In your `spacecafe.conf` make sure to add the folder to the `directories` list:
    ```
    directories = [
        ...
        { path = "url/path/to/your/gemtext-recipe-folder/", allow-cgi = true }
    ]
    environment = {
        "RECIPE_FILESYSTEM_ROOT": "/filesystem-path/to/your/gemtext-recipe-folder"
    }
    ```

## Regenerating the recipe files

If you changed the recipes in the **rezepte** folder or add your own ones, you can regenerate all HTML/gemini files yourself:

1. Install [recipe_site_generator](https://github.com/my-tien/recipe_site_generator)
2. Run either of the two scripts depending on whether you want to create gemtext files or HTML files:

    - for gemtext recipes:

        ```
        python -m recipe_site_generator.generate ../rezept/rezepte/ ../rezept/images/ --out ../rezept/gemini/bakery --overwrite
        ```

    - for HTML recipes:

        ```
        python -m recipe_site_generator.generate ../rezept/rezepte/ ../rezept/images/ --out ../rezept/html/bakery --overwrite --html
        ```