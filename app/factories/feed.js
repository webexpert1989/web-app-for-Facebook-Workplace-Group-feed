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
					let commentsArr = [];

					if(data[i].comments && data[i].comments.data && data[i].comments.data.length) {
						for(let c_i in data[i].comments.data) {
							commentsArr.push(Object.assign(data[i].comments.data[c_i], {
								date: (new Date(data[i].comments.data[c_i].created_time * 1000)).format_date("D.M.Y H:i")
							}));
						}
					}

					parsedData[i] = {
						type    : data[i].type || null,
						user    : {
							id  : data[i].from.id || 0,
							name: data[i].from.name || null
						},
						title   : data[i].name? data[i].name.regulate(160): null,
						story   : data[i].story? data[i].story.regulate(160): null,
						body    : data[i].message? data[i].message.regulate(360): null,
						date    : (new Date(data[i].created_time * 1000)).format_date("D.M.Y H:i"),
						likes   : data[i].likes && data[i].likes.data? data[i].likes.data: [],
						comments: commentsArr,
						link    : data[i].actions && data[i].actions[0].link? data[i].actions[0].link: null,
					};

					switch(data[i].type) {
						case "photo": {
							let photos = [];

							if(data[i].attachments && data[i].attachments.data) {
								let attach = data[i].attachments.data;

								for(const p_i in attach) {
									switch(attach[p_i].type) {
										case "album": {
											if(attach[p_i].subattachments && attach[p_i].subattachments.data) {
												let subattach = attach[p_i].subattachments.data;
		
												for(const p_j in subattach) {
													if(subattach[p_j].media && subattach[p_j].media.image) {
														photos.push(subattach[p_j].media.image.src);
													}
												}
											}
											break;
										}
										default: {
											if(attach[p_i].media && attach[p_i].media.image) {
												photos.push(attach[p_i].media.image.src);
											}
											break;
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
										type : info.type || null,
										title: info.title? info.title.regulate(120) : null,
										desc : info.description? info.description.regulate(210): null,
										thumb: info.media && info.media.image && info.media.image.src? info.media.image.src: null,
										url  : data[i].link || null
									}
								});
							}

							break;
						}

						default: {
							let attach_data = data[i].attachments && data[i].attachments.data? data[i].attachments.data: null,
								attach = [];

							if(attach_data) {
								for(let a_i in attach_data) {
									if(attach_data[a_i].type == "file_upload") {
										attach.push({
											icon : attach_data[a_i].media && attach_data[a_i].media.image? attach_data[a_i].media.image.src: null,
											title: attach_data[a_i].title || null,
											url  : attach_data[a_i].url || null
										});
									}
								}
								
								Object.assign(parsedData[i], {
									attachments: attach
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
