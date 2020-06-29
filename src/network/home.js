import {request} from "./request.js";

export function getHomeMultidata(){
	return request({
		url:'/home/multidata'
	})
}

export function getHomeGods(type,page) {
	return request({
		url:'api/m3/home/data',
		params: {
			type,
			page
		}
	})
}