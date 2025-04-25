import { App, Plugin, PluginSettingTab, Setting, TFile, normalizePath } from "obsidian";


interface ISBNPluginSettings {
	template: string;
}

const DEFAULT_SETTINGS: ISBNPluginSettings = { // default template
	template: `\${cover}
## \${title}  
**Author:** \${author}  
**Published in:** \${publish_date}  
**Publisher:** \${publisher}  
**Pages:** \${pages}  
**ISBN:** \${isbn}  
`,
};


export default class ISBNPlugin extends Plugin {
	settings: ISBNPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new ISBNSettingTab(this.app, this));

		this.addCommand({
			id: "grab-isbn-information",
			name: "Grab ISBN Information",
			editorCallback: async (editor) => {
				const content = editor.getValue();
				const regex = /isbn:(\d{10,13})/gi;
				const matches = [...content.matchAll(regex)];

				let newContent = content;

				for (const match of matches) {
					const fullMatch = match[0]; // e.g. isbn:9781234567890
					const isbn = match[1];

					const bookInfo = await this.fetchBookInfo(isbn);
					const imagePath = await this.downloadCoverImage(isbn);

					if (bookInfo) {
						const values = {
							title: bookInfo.title,
							author: bookInfo.author,
							publish_date: bookInfo.publish_date,
							publisher: bookInfo.publisher,
							pages: bookInfo.pages.toString(),
							isbn,
							cover: imagePath ? `![[${imagePath}|150]]` : "",
						};

						const formattedText = this.applyTemplate(this.settings.template, values);
						newContent = newContent.replace(fullMatch, formattedText);
					}
				}

				editor.setValue(newContent);
			},
		});
	}

	applyTemplate(template: string, values: Record<string, string>): string {
		return template.replace(/\$\{(.*?)\}/g, (_, key) => values[key] ?? "");
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
			if (!bookRes.ok) return null;

			const book = await bookRes.json();

			let authorName = "Unknown";
			if (book.authors?.length > 0) {
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
			console.error("Error fetching book info:", e);
			return null;
		}
	}

	async downloadCoverImage(isbn: string): Promise<string | null> {
		try {
			const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
			const res = await fetch(url);
			if (!res.ok) return null;

			const arrayBuffer = await res.arrayBuffer();
			const filePath = normalizePath(`capa-${isbn}.jpg`);
			await this.app.vault.createBinary(filePath, arrayBuffer);
			return filePath;
		} catch (e) {
			console.error("Error downloading cover:", e);
			return null;
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ISBNSettingTab extends PluginSettingTab { // settings tab
	plugin: ISBNPlugin;

	constructor(app: App, plugin: ISBNPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "ISBN Plugin Settings" });

		new Setting(containerEl)
			.setName("Template")
			.setDesc("Use variables like ${title}, ${author}, ${isbn}, ${cover}, etc.")
			.addTextArea(text =>
				text
					.setPlaceholder("Template to format the output")
					.setValue(this.plugin.settings.template)
					.onChange(async (value) => {
						this.plugin.settings.template = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
