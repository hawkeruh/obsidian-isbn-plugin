# Grab Info with ISBN

**ID**: `grab-isbn-information`\
**Version**: `1.0.0`\
**Author**: hawke\
**Minimum Obsidian Version**: `0.15.0`

## Description

Grab book information using just the ISBN!

Type `isbn:XXXXXXXXXX` or `isbn:XXXXXXXXXXXXX` (10 or 13-digit ISBN) into your note, and the plugin will fetch and insert detailed book information using the [Open Library API](https://openlibrary.org/developers/api).

Includes:

- Book Title
- Author
- Publication Date
- Publisher
- Number of Pages
- ISBN
- **Cover image (downloaded and saved to your Obsidian vault)**

---
## Install

Put the file on the vaults plugins directory. vaultname\.obsidian\plugins

```
git clone https://github.com/hawkeruh/obsidian-isbn-plugin
cd obsidian-isbn-plugin

npm install 
npm run build
npm start
```

## How to Use

1. Open a note and type something like:

   ```
   isbn:9780451524935
   ```

2. Press `Ctrl + P` and run the command:\
   **Grab ISBN Information**

3. Voilà! The plugin will replace the ISBN line with formatted book information and a cover image.

---

## Output Example

```markdown
![[capa-9780451524935.jpg|150]]
## 1984  
**Author:** George Orwell  
**Published in:** 1950  
**Publisher:** Signet Classic  
**Pages:** 328  
**ISBN:** 9780451524935  
```

> The cover image will be saved automatically to the folder you configured for attachments in your Obsidian vault.

