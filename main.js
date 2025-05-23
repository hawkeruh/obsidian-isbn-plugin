/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ISBNPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var ISBNPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.addCommand({
      id: "grab-isbn-information",
      name: "Grab ISBN Information",
      editorCallback: async (editor) => {
        const content = editor.getValue();
        const regex = /isbn:(\d{10,13})/i;
        const match = content.match(regex);
        if (match) {
          const isbn = match[1];
          const bookInfo = await this.fetchBookInfo(isbn);
          if (bookInfo) {
            const imagePath = await this.downloadCoverImage(isbn);
            const formattedText = `${imagePath ? `![[${imagePath}|150]]
` : ""}
## ${bookInfo.title}  
**Author:** ${bookInfo.author}  
**Published in:** ${bookInfo.publish_date}  
**Publisher:** ${bookInfo.publisher}  
**Pages:** ${bookInfo.pages}  
**ISBN:** ${isbn}  
`;
            editor.setValue(content.replace(match[0], formattedText));
          }
        }
      }
    });
  }
  async fetchBookInfo(isbn) {
    var _a, _b, _c, _d, _e;
    try {
      const bookRes = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
      if (!bookRes.ok) {
        console.error(`Book not found for ISBN ${isbn}`);
        return null;
      }
      const book = await bookRes.json();
      let authorName = "Unknown";
      if (book.authors && book.authors.length > 0) {
        const authorRes = await fetch(`https://openlibrary.org${book.authors[0].key}.json`);
        if (authorRes.ok) {
          const author = await authorRes.json();
          authorName = author.name;
        }
      }
      return {
        title: (_a = book.title) != null ? _a : "Unknown",
        author: authorName,
        publish_date: (_b = book.publish_date) != null ? _b : "Unknown",
        publisher: (_d = (_c = book.publishers) == null ? void 0 : _c[0]) != null ? _d : "Unknown",
        pages: (_e = book.number_of_pages) != null ? _e : 0
      };
    } catch (e) {
      console.error("Error:", e);
      return null;
    }
  }
  async downloadCoverImage(isbn) {
    try {
      const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      const res = await fetch(url);
      if (!res.ok) {
        console.error("Cover not found.");
        return null;
      }
      const arrayBuffer = await res.arrayBuffer();
      const filePath = (0, import_obsidian.normalizePath)(`capa-${isbn}.jpg`);
      await this.app.vault.createBinary(filePath, arrayBuffer);
      return filePath;
    } catch (e) {
      console.error("Error downloading cover:", e);
      return null;
    }
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQXBwLCBQbHVnaW4sIFRGaWxlLCBub3JtYWxpemVQYXRoIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJU0JOUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJncmFiLWlzYm4taW5mb3JtYXRpb25cIixcclxuXHRcdFx0bmFtZTogXCJHcmFiIElTQk4gSW5mb3JtYXRpb25cIixcclxuXHRcdFx0ZWRpdG9yQ2FsbGJhY2s6IGFzeW5jIChlZGl0b3IpID0+IHtcclxuXHRcdFx0XHRjb25zdCBjb250ZW50ID0gZWRpdG9yLmdldFZhbHVlKCk7XHJcblx0XHRcdFx0Y29uc3QgcmVnZXggPSAvaXNibjooXFxkezEwLDEzfSkvaTtcclxuXHRcdFx0XHRjb25zdCBtYXRjaCA9IGNvbnRlbnQubWF0Y2gocmVnZXgpO1xyXG5cclxuXHRcdFx0XHRpZiAobWF0Y2gpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGlzYm4gPSBtYXRjaFsxXTtcclxuXHRcdFx0XHRcdGNvbnN0IGJvb2tJbmZvID0gYXdhaXQgdGhpcy5mZXRjaEJvb2tJbmZvKGlzYm4pO1xyXG5cclxuXHRcdFx0XHRcdGlmIChib29rSW5mbykge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBpbWFnZVBhdGggPSBhd2FpdCB0aGlzLmRvd25sb2FkQ292ZXJJbWFnZShpc2JuKTtcclxuXHJcblx0XHRcdFx0XHRcdGNvbnN0IGZvcm1hdHRlZFRleHQgPSBcclxuYCR7aW1hZ2VQYXRoID8gYCFbWyR7aW1hZ2VQYXRofXwxNTBdXVxcbmAgOiBcIlwifVxyXG4jIyAke2Jvb2tJbmZvLnRpdGxlfSAgXHJcbioqQXV0aG9yOioqICR7Ym9va0luZm8uYXV0aG9yfSAgXHJcbioqUHVibGlzaGVkIGluOioqICR7Ym9va0luZm8ucHVibGlzaF9kYXRlfSAgXHJcbioqUHVibGlzaGVyOioqICR7Ym9va0luZm8ucHVibGlzaGVyfSAgXHJcbioqUGFnZXM6KiogJHtib29rSW5mby5wYWdlc30gIFxyXG4qKklTQk46KiogJHtpc2JufSAgXHJcbmA7XHJcblxyXG5cdFx0XHRcdFx0XHRlZGl0b3Iuc2V0VmFsdWUoY29udGVudC5yZXBsYWNlKG1hdGNoWzBdLCBmb3JtYXR0ZWRUZXh0KSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBmZXRjaEJvb2tJbmZvKGlzYm46IHN0cmluZyk6IFByb21pc2U8e1xyXG5cdFx0dGl0bGU6IHN0cmluZztcclxuXHRcdGF1dGhvcjogc3RyaW5nO1xyXG5cdFx0cHVibGlzaF9kYXRlOiBzdHJpbmc7XHJcblx0XHRwdWJsaXNoZXI6IHN0cmluZztcclxuXHRcdHBhZ2VzOiBudW1iZXI7XHJcblx0fSB8IG51bGw+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IGJvb2tSZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9vcGVubGlicmFyeS5vcmcvaXNibi8ke2lzYm59Lmpzb25gKTtcclxuXHRcdFx0aWYgKCFib29rUmVzLm9rKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihgQm9vayBub3QgZm91bmQgZm9yIElTQk4gJHtpc2JufWApO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGJvb2sgPSBhd2FpdCBib29rUmVzLmpzb24oKTtcclxuXHJcblx0XHRcdGxldCBhdXRob3JOYW1lID0gXCJVbmtub3duXCI7XHJcblx0XHRcdGlmIChib29rLmF1dGhvcnMgJiYgYm9vay5hdXRob3JzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRjb25zdCBhdXRob3JSZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9vcGVubGlicmFyeS5vcmcke2Jvb2suYXV0aG9yc1swXS5rZXl9Lmpzb25gKTtcclxuXHRcdFx0XHRpZiAoYXV0aG9yUmVzLm9rKSB7XHJcblx0XHRcdFx0XHRjb25zdCBhdXRob3IgPSBhd2FpdCBhdXRob3JSZXMuanNvbigpO1xyXG5cdFx0XHRcdFx0YXV0aG9yTmFtZSA9IGF1dGhvci5uYW1lO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0aXRsZTogYm9vay50aXRsZSA/PyBcIlVua25vd25cIixcclxuXHRcdFx0XHRhdXRob3I6IGF1dGhvck5hbWUsXHJcblx0XHRcdFx0cHVibGlzaF9kYXRlOiBib29rLnB1Ymxpc2hfZGF0ZSA/PyBcIlVua25vd25cIixcclxuXHRcdFx0XHRwdWJsaXNoZXI6IGJvb2sucHVibGlzaGVycz8uWzBdID8/IFwiVW5rbm93blwiLFxyXG5cdFx0XHRcdHBhZ2VzOiBib29rLm51bWJlcl9vZl9wYWdlcyA/PyAwLFxyXG5cdFx0XHR9O1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGUpO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIGRvd25sb2FkQ292ZXJJbWFnZShpc2JuOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHVybCA9IGBodHRwczovL2NvdmVycy5vcGVubGlicmFyeS5vcmcvYi9pc2JuLyR7aXNibn0tTC5qcGdgO1xyXG5cdFx0XHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG5cdFx0XHRpZiAoIXJlcy5vaykge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDb3ZlciBub3QgZm91bmQuXCIpO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgcmVzLmFycmF5QnVmZmVyKCk7XHJcblx0XHRcdGNvbnN0IGZpbGVQYXRoID0gbm9ybWFsaXplUGF0aChgY2FwYS0ke2lzYm59LmpwZ2ApO1xyXG5cdFx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGVCaW5hcnkoZmlsZVBhdGgsIGFycmF5QnVmZmVyKTtcclxuXHRcdFx0cmV0dXJuIGZpbGVQYXRoO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3IgZG93bmxvYWRpbmcgY292ZXI6XCIsIGUpO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUFrRDtBQUVsRCxJQUFxQixhQUFyQixjQUF3Qyx1QkFBTztBQUFBLEVBQzlDLE1BQU0sU0FBUztBQUNkLFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sZ0JBQWdCLE9BQU8sV0FBVztBQUNqQyxjQUFNLFVBQVUsT0FBTyxTQUFTO0FBQ2hDLGNBQU0sUUFBUTtBQUNkLGNBQU0sUUFBUSxRQUFRLE1BQU0sS0FBSztBQUVqQyxZQUFJLE9BQU87QUFDVixnQkFBTSxPQUFPLE1BQU0sQ0FBQztBQUNwQixnQkFBTSxXQUFXLE1BQU0sS0FBSyxjQUFjLElBQUk7QUFFOUMsY0FBSSxVQUFVO0FBQ2Isa0JBQU0sWUFBWSxNQUFNLEtBQUssbUJBQW1CLElBQUk7QUFFcEQsa0JBQU0sZ0JBQ1osR0FBRyxZQUFZLE1BQU0sU0FBUztBQUFBLElBQWEsRUFBRTtBQUFBLEtBQ3hDLFNBQVMsS0FBSztBQUFBLGNBQ0wsU0FBUyxNQUFNO0FBQUEsb0JBQ1QsU0FBUyxZQUFZO0FBQUEsaUJBQ3hCLFNBQVMsU0FBUztBQUFBLGFBQ3RCLFNBQVMsS0FBSztBQUFBLFlBQ2YsSUFBSTtBQUFBO0FBR1YsbUJBQU8sU0FBUyxRQUFRLFFBQVEsTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQUEsVUFDekQ7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLElBQ0QsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQU0sY0FBYyxNQU1WO0FBMUNYO0FBMkNFLFFBQUk7QUFDSCxZQUFNLFVBQVUsTUFBTSxNQUFNLGdDQUFnQyxJQUFJLE9BQU87QUFDdkUsVUFBSSxDQUFDLFFBQVEsSUFBSTtBQUNoQixnQkFBUSxNQUFNLDJCQUEyQixJQUFJLEVBQUU7QUFDL0MsZUFBTztBQUFBLE1BQ1I7QUFDQSxZQUFNLE9BQU8sTUFBTSxRQUFRLEtBQUs7QUFFaEMsVUFBSSxhQUFhO0FBQ2pCLFVBQUksS0FBSyxXQUFXLEtBQUssUUFBUSxTQUFTLEdBQUc7QUFDNUMsY0FBTSxZQUFZLE1BQU0sTUFBTSwwQkFBMEIsS0FBSyxRQUFRLENBQUMsRUFBRSxHQUFHLE9BQU87QUFDbEYsWUFBSSxVQUFVLElBQUk7QUFDakIsZ0JBQU0sU0FBUyxNQUFNLFVBQVUsS0FBSztBQUNwQyx1QkFBYSxPQUFPO0FBQUEsUUFDckI7QUFBQSxNQUNEO0FBRUEsYUFBTztBQUFBLFFBQ04sUUFBTyxVQUFLLFVBQUwsWUFBYztBQUFBLFFBQ3JCLFFBQVE7QUFBQSxRQUNSLGVBQWMsVUFBSyxpQkFBTCxZQUFxQjtBQUFBLFFBQ25DLFlBQVcsZ0JBQUssZUFBTCxtQkFBa0IsT0FBbEIsWUFBd0I7QUFBQSxRQUNuQyxRQUFPLFVBQUssb0JBQUwsWUFBd0I7QUFBQSxNQUNoQztBQUFBLElBQ0QsU0FBUyxHQUFHO0FBQ1gsY0FBUSxNQUFNLFVBQVUsQ0FBQztBQUN6QixhQUFPO0FBQUEsSUFDUjtBQUFBLEVBQ0Q7QUFBQSxFQUVBLE1BQU0sbUJBQW1CLE1BQXNDO0FBQzlELFFBQUk7QUFDSCxZQUFNLE1BQU0seUNBQXlDLElBQUk7QUFDekQsWUFBTSxNQUFNLE1BQU0sTUFBTSxHQUFHO0FBQzNCLFVBQUksQ0FBQyxJQUFJLElBQUk7QUFDWixnQkFBUSxNQUFNLGtCQUFrQjtBQUNoQyxlQUFPO0FBQUEsTUFDUjtBQUNBLFlBQU0sY0FBYyxNQUFNLElBQUksWUFBWTtBQUMxQyxZQUFNLGVBQVcsK0JBQWMsUUFBUSxJQUFJLE1BQU07QUFDakQsWUFBTSxLQUFLLElBQUksTUFBTSxhQUFhLFVBQVUsV0FBVztBQUN2RCxhQUFPO0FBQUEsSUFDUixTQUFTLEdBQUc7QUFDWCxjQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDM0MsYUFBTztBQUFBLElBQ1I7QUFBQSxFQUNEO0FBQ0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
