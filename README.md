# rezept

This repository contains recipes that came to me through various channels (relatives, friends, colleagues, internet search…).
I have tested each recipe myself and only added it to my collection when I really liked it.

From the markdown files it is currently possible to generate gemini files which are cgi scripts that can be served from a [spacebeans server](https://www.usebox.net/jjm/spacebeans/), a server for the [gemini protocol]((https://geminiprotocol.net/)).

At some point it should also be possible to generate HTML files.

## Deployment

- This repository was tested with Python 3.10 and 3.11.
- Setup your spacebeans server
- Install [recipe_site_generator](https://github.com/my-tien/recipe-site-generator) on the server
- copy-paste the gemini/bakery folder into your spacebeans directory

## Regenerating gemini files:
If you modify or add recipes, you can regenerate the gemini files like this:

`python generate_gemini.py`
