/****************************
 * Factory for App
 * 
 * define callbacks to manage data
 */

(function() {
	"use strict";

	angular.module("FF.factories", []).factory("$feed", function() {
		return {
			
			/**
			 * convert array to use template
			 * 
			 * @param: srcData, json object: its got from facebook api
			 * 
			 * @returns: array: parsed array
			 */
			parseData: function(srcData) {
				let data = srcData.data,
					parsedData = [];

				for(let i in data) {
					parsedData[i] = {
						type    : data[i].type || "",
						user    : {
							id  : data[i].from.id || 0,
							name: data[i].from.name || ""
						},
						title   : (data[i].name || "").regulate(160),
						story   : (data[i].story || "").regulate(160),
						body    : (data[i].message || "").regulate(360),
						date    : (new Date(data[i].created_time * 1000)).format_date("D.M.Y H:i"),
						likes   : data[i].likes? data[i].likes.data.length: 0,
						comments: data[i].comments? data[i].comments.data.length: 0,
						link    : data[i].actions && data[i].actions[0].link? data[i].actions[0].link: "",
					};

					switch(data[i].type) {
						case "photo": {
							let photos = [];

							if(data[i].attachments && data[i].attachments.data) {
								let attach = data[i].attachments.data;

								for(const p_i in attach) {
									if(attach[p_i].subattachments && attach[p_i].subattachments.data) {
										let subattach = attach[p_i].subattachments.data;

										for(const p_j in subattach) {
											if(subattach[p_j].media && subattach[p_j].media.image) {
												photos.push(subattach[p_j].media.image.src);
											}
										}
									}
								}
							}

							Object.assign(parsedData[i], {
								photos: photos
							});

							break;
						}

						case "video": {
							let info = data[i].attachments && data[i].attachments.data.length? data[i].attachments.data[0]: null;

							if(info) {
								Object.assign(parsedData[i], {
									video: {
										title: info.title.regulate(120),
										desc : info.description.regulate(210),
										thumb: info.media && info.media.image && info.media.image.src? info.media.image.src: "",
										url  : data[i].link
									}
								});
							}

							break;
						}
					}
				}

				return parsedData;
			}
		}; 
	});
})();
