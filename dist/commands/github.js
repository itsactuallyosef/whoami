"use strict";
// import { Command } from "./abstract.js";
// import { Embed } from "../components/embed.js";
// import { returnJsonObject } from "../utility.js";
// import { myterminal } from "../main.js";
// export class Github extends Command {
// 	constructor() {
// 		super("github", "   Shows my github page on statistics.");
// 	}
// 	async execute(args: any[]) {
// 		const user = "theyosefegy";
// 		const data = await returnJsonObject(`https://api.github.com/users/${user}`);
// 		const now = new Date();
// 		const githubEmbed = new Embed({
// 			title: "GitHub Profile | " + data.name,
// 			description: data.bio || "This Profile Has No Bio.",
// 			link: `https://github.com/${user}`,
// 			footer: now.toLocaleString(),
// 			imageURL: data.avatar_url,
// 		});
// 		githubEmbed.createField("Username", data.login);
// 		githubEmbed.createField("Created At", data.created_at);
// 		githubEmbed.createField("Public Repos", data.public_repos);
// 		githubEmbed.createField("Followers", data.followers);
// 		githubEmbed.createField("Following", data.following);
// 		githubEmbed.renderIn(myterminal);
// 	}
// }
