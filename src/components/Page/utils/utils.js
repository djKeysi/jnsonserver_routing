export const TitleLength = (title) => {
	return title.length === 10 ? title : title.slice(0, 10) + '...';
};
