import { App, Plugin, TFile, normalizePath } from "obsidian";

export default class ISBNPlugin extends Plugin {
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

						const formattedText = 
`${imagePath ? `![[${imagePath}|150]]\n` : ""}
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
			},
		});
	}

	async fetchBookInfo(isbn: string): Promise<{
		title: string;
		author: string;
		publish_date: string;
		publisher: string;
		pages: number;
	} | null> {
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
				title: book.title ?? "Unknown",
				author: authorName,
				publish_date: book.publish_date ?? "Unknown",
				publisher: book.publishers?.[0] ?? "Unknown",
				pages: book.number_of_pages ?? 0,
			};
		} catch (e) {
			console.error("Error:", e);
			return null;
		}
	}

	async downloadCoverImage(isbn: string): Promise<string | null> {
		try {
			const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
			const res = await fetch(url);
			if (!res.ok) {
				console.error("Cover not found.");
				return null;
			}
			const arrayBuffer = await res.arrayBuffer();
			const filePath = normalizePath(`capa-${isbn}.jpg`);
			await this.app.vault.createBinary(filePath, arrayBuffer);
			return filePath;
		} catch (e) {
			console.error("Error downloading cover:", e);
			return null;
		}
	}
}
